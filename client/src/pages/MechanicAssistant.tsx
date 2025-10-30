import { useState } from 'react'

type Msg = { role: 'user' | 'assistant'; content: string }

export default function MechanicAssistant() {
  const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000'
  const [messages, setMessages] = useState<Msg[]>([{
    role: 'assistant',
    content: 'Hi! I am Mech Assistance Bot. Describe the vehicle issue, any noises, warning lights, and recent work. I will help diagnose and suggest fixes.'
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const send = async () => {
    const text = input.trim()
    if (!text) return
    setError(undefined)
    setInput('')
    const next = [...messages, { role: 'user', content: text } as Msg]
    setMessages(next)
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next })
      })
      const data = await res.json().catch(() => undefined)
      if (!res.ok || !data?.ok) throw new Error(data?.message || 'Assistant failed')
      const reply = String(data.message || '')
      setMessages([...next, { role: 'assistant', content: reply }])
    } catch (e: any) {
      setError(e.message || 'Failed to get reply')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-3xl mx-auto glass p-4">
        <h1 className="text-2xl font-semibold mb-3">Mech Assistance Bot</h1>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto mb-3">
          {messages.map((m, i) => (
            <div key={i} className={`p-3 rounded-xl ${m.role === 'user' ? 'bg-blue-50 text-gray-900' : 'bg-gray-50 text-gray-800'}`}>
              <div className="text-xs opacity-60 mb-1">{m.role === 'user' ? 'You' : 'Assistant'}</div>
              <div className="whitespace-pre-wrap leading-relaxed">{formatPlain(m.content)}</div>
            </div>
          ))}
          {loading && <div className="text-sm text-gray-500">Thinking…</div>}
        </div>
        <div className="flex gap-2">
          <input className="input flex-1" placeholder="Describe the issue…" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') send() }} />
          <button className="btn btn-primary" onClick={send} disabled={loading}>Send</button>
        </div>
      </div>
    </div>
  )
}

// Minimal markdown → plain text cleanup for better in-app readability
function formatPlain(text: string): string {
  if (!text) return ''
  // Normalize line endings
  let t = text.replace(/\r/g, '')
  // Strip headings like ### Title → Title
  t = t.replace(/^\s*#{1,6}\s+/gm, '')
  // Convert list markers: - item or * item → • item
  t = t.replace(/^\s*[-*]\s+/gm, '• ')
  // Convert numbered lists: 1. item → 1) item
  t = t.replace(/^\s*(\d+)\.\s+/gm, '$1) ')
  // Bold/italic/code: **text**, *text*, _text_, `code` → plain
  t = t.replace(/\*\*(.*?)\*\*/g, '$1')
  t = t.replace(/\*(.*?)\*/g, '$1')
  t = t.replace(/_(.*?)_/g, '$1')
  t = t.replace(/`([^`]+)`/g, '$1')
  // Collapse extra blank lines
  t = t.replace(/\n{3,}/g, '\n\n')
  return t
}
