import { Router, type Request, type Response } from "express";
import { supabase, logSupabase } from "../supabase.js";

type LatLng = { lat: number; lng: number };
type Mechanic = {
  email: string;
  name: string;
  phone: string;
  location: LatLng;
  workingHoursFrom?: string;
  workingHoursTo?: string;
};

function toRad(value: number): number {
  return (value * Math.PI) / 180;
}

function haversineKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const c = 2 * Math.asin(
    Math.sqrt(
      sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon
    )
  );
  return R * c;
}

export const mechanicsRouter = Router();

/**
 * 🧠 Create or Update Mechanic Profile
 */
mechanicsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const {
      email,
      name,
      phone,
      location,
      workingHoursFrom,
      workingHoursTo,
    } = req.body as Partial<Mechanic>;

    // ✅ Validate input
    if (!email || !name || !phone || !location) {
      console.warn("[mechanics.create] Missing fields", req.body);
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Validate times (optional but clean)
    if (workingHoursFrom && workingHoursTo && workingHoursFrom >= workingHoursTo) {
      return res
        .status(400)
        .json({ message: "'workingHoursTo' must be later than 'workingHoursFrom'" });
    }

    // ✅ Prepare data for Supabase
    const record = {
      email,
      name,
      phone,
      location,
      working_hours_from: workingHoursFrom ?? null,
      working_hours_to: workingHoursTo ?? null,
      updated_at: new Date().toISOString(),
    };

    // ✅ UPSERT into Supabase
    const { data, error } = await logSupabase("mechanics.upsert", async () =>
      supabase.from("mechanics").upsert([record], { onConflict: "email" }).select().single()
    );

    if (error) {
      console.error("[mechanics.create] Supabase error:", error);
      return res.status(500).json({ message: "Failed to save mechanic", error });
    }

    console.log("[mechanics.create] upserted", data);
    return res.status(200).json({ ok: true, mechanic: data });
  } catch (err) {
    console.error("[mechanics.create] Exception:", err);
    return res.status(500).json({ message: "Unexpected error" });
  }
});

/**
 * 🔍 Get Mechanic by Email
 */
mechanicsRouter.get("/:email", async (req: Request, res: Response) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ ok: false, message: "Email is required" });
  }

  try {
    const { data, error } = await supabase
      .from("mechanics")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      console.error("[mechanics.get] supabase error", error);
      return res.status(500).json({ ok: false, message: "Database error", error });
    }

    if (!data) {
      console.log("[mechanics.get] not found", email);
      return res.status(404).json({ ok: false, message: "Mechanic not found" });
    }

    // ✅ Combine into human-readable workingHours for frontend
    const workingHours = data.working_hours_from && data.working_hours_to
      ? `${data.working_hours_from} - ${data.working_hours_to}`
      : "";

    const mechanic: Mechanic = {
      email: data.email,
      name: data.name,
      phone: data.phone,
      location: data.location,
      workingHoursFrom: data.working_hours_from,
      workingHoursTo: data.working_hours_to,
      // optional display helper for frontend
      ...(workingHours ? { workingHours } : {}),
    };

    return res.status(200).json({ ok: true, mechanic });
  } catch (err) {
    console.error("[mechanics.get] internal error", err);
    return res.status(500).json({ ok: false, message: "Internal server error" });
  }
});

/**
 * 📍 Nearby Search (by coordinates)
 */
mechanicsRouter.get("/", async (req: Request, res: Response) => {
  const lat = Number(req.query.lat);
  const lng = Number(req.query.lng);
  const radiusKm = Number(req.query.radiusKm ?? 10);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    console.warn("[mechanics.nearby] invalid coords", req.query);
    return res.status(400).json({ message: "lat,lng are required numbers" });
  }

  const here: LatLng = { lat, lng };

  try {
    const { data: mechanics, error } = await supabase
      .from("mechanics")
      .select("*");

    if (error) {
      console.error("[mechanics.nearby] supabase fetch error", error);
      return res.status(500).json({ message: "Database error", error });
    }

    const results = mechanics
      ?.map((m) => ({
        mechanic: m,
        distanceKm: haversineKm(here, m.location),
      }))
      .filter((x) => x.distanceKm <= radiusKm)
      .sort((a, b) => a.distanceKm - b.distanceKm);

    return res.json({ ok: true, results });
  } catch (err) {
    console.error("[mechanics.nearby] internal error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});
