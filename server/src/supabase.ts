import dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  throw new Error("❌ Missing Supabase environment variables!");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  auth: { persistSession: false },
});

export async function logSupabase<T>(label: string, fn: () => Promise<T>) {
  try {
    const result = await fn();
    console.log(`[supabase] ${label} ok`, result);
    return result;
  } catch (err) {
    console.error(`[supabase] ${label} error`, err);
    throw err;
  }
}
