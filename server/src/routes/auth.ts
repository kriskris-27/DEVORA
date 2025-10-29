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
    const { error } = await supabase.auth.admin.generateLink({ type: 'recovery', email });
    if (error) {
      // various messages: 'User not found', 'No user found' etc
      const msg = String(error.message || '').toLowerCase()
      if (msg.includes('not found') || msg.includes('no user')) {
        return res.status(200).json({ ok: true, exists: false })
      }
      console.error('[auth.exists] generateLink error', error)
      return res.status(500).json({ ok: false, message: 'Lookup failed' })
    }
    return res.status(200).json({ ok: true, exists: true })
  } catch (err) {
    console.error("[auth.exists] internal error", err);
    return res.status(500).json({ ok: false, message: "Internal server error" });
  }
});
