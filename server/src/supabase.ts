import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL as string
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE as string

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  auth: { persistSession: false },
})

export async function logSupabase<T>(label: string, fn: () => Promise<T>) {
  try {
    const result = await fn()
    console.log(`[supabase] ${label} ok`, result)
    return result
  } catch (err) {
    console.error(`[supabase] ${label} error`, err)
    throw err
  }
}


