import { Router } from 'express'

export const assistantRouter = Router()

// POST /api/assistant/chat
// Body: { messages: [{ role: 'user'|'assistant'|'system', content: string }], model?: string }
assistantRouter.post('/chat', async (req, res) => {
  try {
    const { messages, model } = req.body || {}
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ ok: false, message: 'messages array is required' })
    }

    const apiKey = process.env.OPENROUTER_API_KEY
    const base = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai'
    if (!apiKey) {
      return res.status(503).json({ ok: false, message: 'Assistant not configured' })
    }

    const systemPreamble = {
      role: 'system',
      content:
        'You are Mech Assistance Bot, a friendly mechanic assistant. Provide concise, step-by-step diagnostics, safety notes, and practical fixes for common vehicle issues. Ask clarifying questions when needed. Keep tone helpful and clear. IMPORTANT: Respond in plain text only (no markdown). Use bullets like \u2022 and numbered steps like 1) 2) without any # or * characters.'
    }

    // Build model preference list: request > env > defaults
    const configured = (process.env.OPENROUTER_MODEL || '').trim()
    const fallbacks = (process.env.OPENROUTER_FALLBACK_MODELS || '').split(',').map(s => s.trim()).filter(Boolean)
    const defaultList = [
      'openai/gpt-4o-mini',
      'anthropic/claude-3.5-sonnet',
      'qwen/qwen2.5-7b-instruct',
      'mistralai/mixtral-8x7b-instruct'
    ]
    const models = [model, configured, ...fallbacks, ...defaultList].filter(Boolean) as string[]

    const history = [systemPreamble, ...messages].slice(-40)

    let lastError: { status?: number; detail?: string } | null = null
    for (const m of models) {
      const payload = {
        model: m,
        messages: history,
        temperature: 0.3,
        max_tokens: 600
      }
      const resp = await fetch(`${base}/api/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': process.env.SITE_URL || 'http://localhost:5173',
          'X-Title': 'Breakdown Buddy Assistant'
        },
        body: JSON.stringify(payload)
      })
      if (resp.ok) {
        const data: any = await resp.json()
        const content = data?.choices?.[0]?.message?.content || ''
        return res.json({ ok: true, message: content, model: m })
      }
      const text = await resp.text().catch(() => '')
      console.warn('[assistant.chat] model failed', m, resp.status, text?.slice(0, 200))
      lastError = { status: resp.status, detail: text?.slice(0, 600) }
      // Fast fail on 401/403 (bad key) — no point trying others
      if (resp.status === 401 || resp.status === 403) break
      // On 429/5xx, try next model
      continue
    }

    return res.status(502).json({ ok: false, message: 'Assistant upstream failed', ...lastError })
  } catch (err) {
    console.error('[assistant.chat] internal error', err)
    return res.status(500).json({ ok: false, message: 'Internal server error' })
  }
})
