import { Router } from "express";

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

mechanicsRouter.post("/", (req, res) => {
	const { email, name, workingHours, phone, location } = req.body as Partial<Mechanic>;
	if (!email || !name || !workingHours || !phone || !location) {
		console.warn("[mechanics.create] missing fields", req.body);
		return res.status(400).json({ message: "Missing required fields" });
	}
	const idx = mechanics.findIndex(m => m.email === email);
	const record: Mechanic = {
		email,
		name,
		workingHours,
		phone,
		location,
	} as Mechanic;
	if (idx >= 0) mechanics[idx] = record; else mechanics.push(record);
	console.log("[mechanics.create] upserted", record);
	return res.status(200).json({ ok: true, mechanic: record });
});

// Get by email (exists)
mechanicsRouter.get("/:email", (req, res) => {
	const { email } = req.params;
	const m = mechanics.find(x => x.email === email);
	if (!m) {
		console.log("[mechanics.get] not found", email);
		return res.status(404).json({ ok: false });
	}
	console.log("[mechanics.get] found", m.email);
	return res.json({ ok: true, mechanic: m });
});

// Nearby search
mechanicsRouter.get("/", (req, res) => {
	const lat = Number(req.query.lat);
	const lng = Number(req.query.lng);
	const radiusKm = Number(req.query.radiusKm ?? 10);
	if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
		console.warn("[mechanics.nearby] invalid coords", req.query);
		return res.status(400).json({ message: "lat,lng are required numbers" });
	}
	const here: LatLng = { lat, lng };
	const results = mechanics
		.map(m => ({ mechanic: m, distanceKm: haversineKm(here, m.location) }))
		.filter(x => x.distanceKm <= radiusKm)
		.sort((a, b) => a.distanceKm - b.distanceKm);
	console.log("[mechanics.nearby] results", { input: here, radiusKm, count: results.length });
	return res.json({ ok: true, results });
});

// SMS fallback stub
mechanicsRouter.post("/sms/help", (req, res) => {
	const { lat, lng, phone } = req.body as { lat: number; lng: number; phone?: string };
	if (!Number.isFinite(lat) || !Number.isFinite(lng)) return res.status(400).json({ message: "lat,lng required" });
	console.log("[SMS HELP REQUEST]", { lat, lng, phone });
	return res.json({ ok: true });
});


