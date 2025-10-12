import { Router } from "express";
import { supabase, logSupabase } from "../supabase.js";

type LatLng = { lat: number; lng: number };
type Mechanic = {
	email: string;
	name: string;
	workingHours: string;
	phone: string;
	location: LatLng;
};

const mechanics: Mechanic[] = [];

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
	const c = 2 * Math.asin(Math.sqrt(sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon));
	return R * c;
}

export const mechanicsRouter = Router();

// Create or update mechanic profile
mechanicsRouter.post("/", async (req, res) => {
	try {
		const { email, name, workingHours, phone, location } = req.body as Partial<Mechanic>;

		// 1️⃣ Validate input
		if (!email || !name || !workingHours || !phone || !location) {
			console.warn("[mechanics.create] Missing fields", req.body);
			return res.status(400).json({ message: "Missing required fields" });
		}

		// 2️⃣ Normalize data for DB schema
		const record = {
			email,
			name,
			working_hours: workingHours,
			phone,
			location,
		};

		// 3️⃣ UPSERT mechanic (insert or update based on email)
		const { data, error } = await logSupabase("mechanics.upsert", async () =>
			supabase
				.from("mechanics")
				.upsert([record], { onConflict: "email" })
				.select()
				.single()
		);

		// 4️⃣ Handle possible error
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

// Get by email (exists)
mechanicsRouter.get("/:email", async (req, res) => {
    const { email } = req.params;
  
    if (!email) {
      console.warn("[mechanics.get] missing email param");
      return res.status(400).json({ ok: false, message: "Email parameter is required" });
    }
  
    try {
      const { data, error } = await supabase
        .from("mechanics")
        .select("*")
        .eq("email", email)
        .maybeSingle(); // since email should be unique
  
      if (error) {
        console.error("[mechanics.get] supabase error", error);
        return res.status(500).json({ ok: false, message: "Database error", error });
      }
  
      if (!data) {
        console.log("[mechanics.get] not found", email);
        return res.status(404).json({ ok: false, message: "Mechanic not found" });
      }
  
      console.log("[mechanics.get] found", data.email);
      return res.status(200).json({ ok: true, mechanic: data as Mechanic });
    } catch (err) {
      console.error("[mechanics.get] internal error", err);
      return res.status(500).json({ ok: false, message: "Internal server error" });
    }
  });

// Nearby search
mechanicsRouter.get("/", async (req, res) => {
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
        ?.map(m => ({
          mechanic: m,
          distanceKm: haversineKm(here, m.location),
        }))
        .filter(x => x.distanceKm <= radiusKm)
        .sort((a, b) => a.distanceKm - b.distanceKm);
  
      console.log("[mechanics.nearby] results", {
        input: here,
        radiusKm,
        count: results?.length ?? 0,
      });
  
      return res.json({ ok: true, results });
    } catch (err) {
      console.error("[mechanics.nearby] internal error", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  



