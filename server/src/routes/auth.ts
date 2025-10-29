import { Router } from "express";
import { supabase } from "../supabase.js";

export const authRouter = Router();

// Check if an auth user exists by email (uses service role)
authRouter.get("/users/:email/exists", async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).json({ ok: false, message: "Email parameter is required" });
  }
   try {
    const base = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE;
    if (!base || !key) {
      console.error('[auth.exists] missing SUPABASE envs');
      return res.status(500).json({ ok: false, message: 'Server misconfigured' });
    }
    const url = `${base}/auth/v1/admin/users?email=${encodeURIComponent(email)}`;
    const resp = await fetch(url, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    });
    if (!resp.ok) {
      if (resp.status === 404) return res.status(200).json({ ok: true, exists: false });
      const text = await resp.text().catch(() => '');
      console.error('[auth.exists] admin users lookup failed', resp.status, text);
      return res.status(500).json({ ok: false, message: 'Lookup failed' });
    }
    let exists = false;
    try {
      const body: any = await resp.json();
      if (Array.isArray(body?.users)) {
        exists = body.users.some((u: any) =>
          typeof u?.email === 'string' && u.email.toLowerCase() === email.toLowerCase()
        );
      } else if (body && typeof body?.email === 'string') {
        exists = body.email.toLowerCase() === email.toLowerCase();
      } else if (body && body?.user && typeof body.user.email === 'string') {
        exists = body.user.email.toLowerCase() === email.toLowerCase();
      }
    } catch {
      exists = false;
    }
    return res.status(200).json({ ok: true, exists });
  } catch (err) {
    console.error("[auth.exists] internal error", err);
    return res.status(500).json({ ok: false, message: "Internal server error" });
  }
});