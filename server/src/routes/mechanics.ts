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
    vehicleTypes?: string[];
    rating?: number;
    reviewCount?: number;
    startingPrice?: number;
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
            vehicleTypes,
            startingPrice,
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
        // Note: rating and review_count are managed by system/users, not directly set here typically
        const record = {
            email,
            name,
            phone,
            location,
            working_hours_from: workingHoursFrom ?? null,
            working_hours_to: workingHoursTo ?? null,
            vehicle_types: vehicleTypes ?? [],
            starting_price: startingPrice ?? null, // Optional
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
            vehicleTypes: data.vehicle_types,
            rating: data.rating,
            reviewCount: data.review_count,
            startingPrice: data.starting_price,
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
    const vehicleType = req.query.vehicleType as string; // Optional filter

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        console.warn("[mechanics.nearby] invalid coords", req.query);
        return res.status(400).json({ message: "lat,lng are required numbers" });
    }

    const here: LatLng = { lat, lng };

    try {
        // Start query
        let query = supabase.from("mechanics").select("*");

        // Optional: Filter by vehicle type at DB level if using Postgres array overlap
        // For simple MVP/Supabase JS, client-side filter is clearer unless dataset is huge.
        // But let's try to fetch all and filter in memory for now to keep logic simple with haversine.

        const { data: mechanics, error } = await query;

        if (error) {
            console.error("[mechanics.nearby] supabase fetch error", error);
            return res.status(500).json({ message: "Database error", error });
        }

        let results = mechanics
            ?.map((m) => ({
                mechanic: {
                    email: m.email,
                    name: m.name,
                    phone: m.phone,
                    location: m.location,
                    workingHoursFrom: m.working_hours_from,
                    workingHoursTo: m.working_hours_to,
                    vehicleTypes: m.vehicle_types,
                    rating: m.rating,
                    reviewCount: m.review_count,
                    startingPrice: m.starting_price,
                },
                distanceKm: haversineKm(here, m.location),
            }))
            .filter((x) => x.distanceKm <= radiusKm);

        // Filter by vehicle type if provided
        if (vehicleType) {
            results = results?.filter(r => r.mechanic.vehicleTypes?.includes(vehicleType));
        }

        // Sort: Distance first, then by Rating (optional enhancement)
        // For now, keep distance sort
        results?.sort((a, b) => a.distanceKm - b.distanceKm);

        return res.json({ ok: true, results });
    } catch (err) {
        console.error("[mechanics.nearby] internal error", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * ⭐ Rate a Mechanic (Anonymous/Simple)
 */
mechanicsRouter.post("/:email/rate", async (req: Request, res: Response) => {
    const { email } = req.params;
    const { rating, deviceId } = req.body;

    if (!email || !rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Valid email and rating (1-5) required" });
    }

    if (!deviceId) {
        return res.status(400).json({ message: "Device ID is required for verification" });
    }

    try {
        // 1. Verify mechanic exists
        const { data: mechanic, error: fetchError } = await supabase
            .from("mechanics")
            .select("email")
            .eq("email", email)
            .single();

        if (fetchError || !mechanic) {
            return res.status(404).json({ message: "Mechanic not found" });
        }

        // 2. Insert or Update rating in mechanic_ratings table (Upsert)
        // This enforces one rating per device per mechanic
        const { error: ratingError } = await supabase
            .from("mechanic_ratings")
            .upsert({
                mechanic_email: email,
                device_id: deviceId,
                rating: rating
            }, { onConflict: 'mechanic_email, device_id' });

        if (ratingError) {
            console.error("[mechanics.rate] individual rating error", ratingError);
            return res.status(500).json({ message: "Failed to save rating" });
        }

        // 3. Recalculate Average & Count from source of truth
        // This ensures the aggregate is always correct based on individual votes
        const { data: allRatings, error: calcError } = await supabase
            .from("mechanic_ratings")
            .select("rating")
            .eq("mechanic_email", email);

        if (calcError || !allRatings) {
            console.error("[mechanics.rate] recalc error", calcError);
            // If we can't recalc, we just return success but warn log
            return res.status(200).json({ ok: true, message: "Rating saved, but stats update delayed" });
        }

        const newCount = allRatings.length;
        const sum = allRatings.reduce((acc, curr) => acc + curr.rating, 0);
        const newRating = newCount > 0 ? sum / newCount : 0;

        // 4. Update Aggregate in main table
        const { error: updateError } = await supabase
            .from("mechanics")
            .update({
                rating: parseFloat(newRating.toFixed(2)),
                review_count: newCount
            })
            .eq("email", email);

        if (updateError) {
            console.error("[mechanics.rate] aggregate update error", updateError);
        }

        return res.json({ ok: true, rating: newRating, reviewCount: newCount });

    } catch (err) {
        console.error("[mechanics.rate] internal error", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
