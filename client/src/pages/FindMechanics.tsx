import { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

type LatLng = { lat: number; lng: number }

type Result = {
    mechanic: {
        email: string
        name: string
        working_hours_from: string
        working_hours_to: string
        phone: string
        location: LatLng
        vehicleTypes?: string[]
        rating?: number
        reviewCount?: number
        startingPrice?: number
    }
    distanceKm: number
}

// Default marker icons
const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

const userMarkerIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

export default function FindMechanics() {
    const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000'

    const [center, setCenter] = useState<LatLng | null>(null)
    const [results, setResults] = useState<Result[]>([])
    const [selectedEmail, setSelectedEmail] = useState<string | null>(null)
    const [radiusKm, setRadiusKm] = useState(10)
    const [error, setError] = useState<string | undefined>()
    const [loading, setLoading] = useState(false)
    const [offlineHint, setOfflineHint] = useState<string | undefined>()
    const [showAvailableOnly, setShowAvailableOnly] = useState(true)
    const [selectedVehicleType, setSelectedVehicleType] = useState<string | null>(null)
    const [ratingModalOpen, setRatingModalOpen] = useState(false)
    const [ratingMechanic, setRatingMechanic] = useState<Result['mechanic'] | null>(null)
    const [userRating, setUserRating] = useState(0)
    const [ratingSubmitting, setRatingSubmitting] = useState(false)

    // 🧭 Restore last search & get current location
    useEffect(() => {
        const last = localStorage.getItem('find:last')
        if (last) {
            try {
                const parsed = JSON.parse(last)
                if (parsed?.center?.lat && parsed?.center?.lng) setCenter(parsed.center)
                if (parsed?.radiusKm) setRadiusKm(parsed.radiusKm)
            } catch { }
        }

        if (!('geolocation' in navigator)) {
            setError('Geolocation not available')
            return
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
            (err) => setError(err.message),
            { enableHighAccuracy: true }
        )
    }, [])

    // 🔍 Search nearby mechanics
    const search = async () => {
        if (!center) return
        setLoading(true)
        setError(undefined)

        try {
            const url = `${API_URL}/api/mechanics?lat=${center.lat}&lng=${center.lng}&radiusKm=${radiusKm}`
            const res = await fetch(url)
            const data = await res.json()

            if (!res.ok) throw new Error(data?.message || 'Search failed')
            setResults(data.results)
            setOfflineHint(undefined)
            localStorage.setItem('find:last', JSON.stringify({ center, radiusKm }))
        } catch (e: any) {
            setError(e.message || 'Failed to search')
            if (center)
                setOfflineHint(`If online search fails, send SMS with GPS: ${center.lat.toFixed(5)}, ${center.lng.toFixed(5)}`)
        } finally {
            setLoading(false)
        }
    }

    const mapCenter = useMemo<LatLng>(() => center ?? { lat: 20.5937, lng: 78.9629 }, [center])

    const handleRateClick = (mechanic: Result['mechanic']) => {
        setRatingMechanic(mechanic)
        setUserRating(0)
        setRatingModalOpen(true)
    }

    const submitRating = async () => {
        if (!ratingMechanic || userRating === 0) return
        setRatingSubmitting(true)
        try {
            // Get or create a simple device ID for anonymous rate limiting
            let deviceId = localStorage.getItem('device_id')
            if (!deviceId) {
                deviceId = Math.random().toString(36).slice(2) + Date.now().toString(36)
                localStorage.setItem('device_id', deviceId)
            }

            const res = await fetch(`${API_URL}/api/mechanics/${ratingMechanic.email}/rate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating: userRating, deviceId })
            })
            if (res.ok) {
                const data = await res.json()
                setResults(prev => prev.map(r =>
                    r.mechanic.email === ratingMechanic.email
                        ? { ...r, mechanic: { ...r.mechanic, rating: data.rating, reviewCount: data.reviewCount } }
                        : r
                ))
                setRatingModalOpen(false)
                setRatingMechanic(null)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setRatingSubmitting(false)
        }
    }


    // 🕒 Check if mechanic is currently available
    // ✅ Works for both "06:15:00", "6:15 PM", "15:02:00" etc.
    function isMechanicAvailable(from: string, to: string): boolean {
        if (!from || !to) return false;

        const now = new Date();

        // 🕓 Parse time to 24-hour format safely
        const parseTime = (timeStr: string): number => {
            timeStr = timeStr.trim().toUpperCase();

            // If AM/PM present, use Date parsing
            if (timeStr.includes("AM") || timeStr.includes("PM")) {
                const date = new Date(`1970-01-01T${timeStr.replace(" ", "")}`);
                return isNaN(date.getTime()) ? 0 : date.getHours() * 3600 + date.getMinutes() * 60;
            }

            // If plain HH:mm:ss — treat as 24-hour
            const parts = timeStr.split(":").map(Number);
            const [h, m = 0, s = 0] = parts;
            return h * 3600 + m * 60 + s;
        };

        const fromSecs = parseTime(from);
        const toSecs = parseTime(to);

        const nowSecs = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

        // 🧠 Handle shift that spans midnight (like 22:00–06:00)
        if (toSecs < fromSecs) {
            // If it's after 'from' (late night) or before 'to' (early morning)
            return nowSecs >= fromSecs || nowSecs <= toSecs;
        }

        // Normal case (same-day interval)
        return nowSecs >= fromSecs && nowSecs <= toSecs;
    }


    // ⚙️ Filter mechanics by availability & vehicle type
    const filteredResults = useMemo(() => {
        let res = results;
        if (showAvailableOnly) {
            res = res.filter((r) =>
                isMechanicAvailable(r.mechanic.working_hours_from, r.mechanic.working_hours_to)
            )
        }
        if (selectedVehicleType) {
            res = res.filter(r => r.mechanic.vehicleTypes?.includes(selectedVehicleType))
        }
        return res;
    }, [results, showAvailableOnly, selectedVehicleType])

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] bg-surface-50 overflow-hidden relative">
            {/* Rating Modal */}
            {ratingModalOpen && ratingMechanic && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-in zoom-in-95 duration-200">
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Rate {ratingMechanic.name}</h3>
                            <p className="text-sm text-gray-500">How would you rate your experience?</p>
                        </div>

                        <div className="flex justify-center gap-2 mb-8">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setUserRating(star)}
                                    className={`text-3xl transition-transform hover:scale-110 focus:outline-none ${userRating >= star ? 'text-yellow-400' : 'text-gray-200'}`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => setRatingModalOpen(false)}>Cancel</Button>
                            <Button
                                className="flex-1"
                                disabled={userRating === 0 || ratingSubmitting}
                                onClick={submitRating}
                            >
                                {ratingSubmitting ? 'Submitting...' : 'Submit Rating'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar - Controls & Results */}
            <div className="w-full md:w-[450px] flex flex-col bg-white border-r border-gray-200 h-full shadow-xl z-20">

                {/* Header Section */}
                <div className="p-6 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <a href="/home" className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </a>
                        <h1 className="text-2xl font-serif font-bold text-gray-900">Find Mechanics</h1>
                    </div>

                    {/* Controls */}
                    <div className="space-y-4">
                        {/* Radius Select */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between mb-1">
                                <label className="text-sm font-medium text-gray-700">Search Radius (km)</label>
                            </div>
                            <div className="flex gap-2 h-9">
                                {[5, 10, 20].map((n) => (
                                    <button
                                        key={n}
                                        onClick={() => setRadiusKm(n)}
                                        className={`flex-1 px-3 text-xs font-medium rounded-lg transition-all border ${radiusKm === n
                                            ? 'bg-electric-600 text-white border-electric-600 shadow-sm'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {n}
                                    </button>
                                ))}
                                <div className="relative w-20 group">
                                    <input
                                        type="number"
                                        min="1"
                                        max="500"
                                        value={radiusKm}
                                        onChange={(e) => setRadiusKm(Number(e.target.value))}
                                        className="w-full h-full px-2 text-sm text-center font-medium text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-transparent transition-all group-hover:border-gray-300"
                                        placeholder="..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Filters Row 2: Vehicle Type & Available */}
                        <div className="flex items-center gap-2">
                            <div className="flex-1">
                                <select
                                    className="select select-sm select-bordered w-full text-xs"
                                    value={selectedVehicleType || ""}
                                    onChange={(e) => setSelectedVehicleType(e.target.value || null)}
                                >
                                    <option value="">All Vehicles</option>
                                    <option value="Car">🚗 Car</option>
                                    <option value="Bike">🏍️ Bike</option>
                                    <option value="Heavy">🚛 Heavy</option>
                                </select>
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer group px-2">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        checked={showAvailableOnly}
                                        onChange={(e) => setShowAvailableOnly(e.target.checked)}
                                    />
                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-electric-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-electric-600"></div>
                                </div>
                                <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Open Now</span>
                            </label>
                        </div>

                        <Button
                            onClick={search}
                            disabled={!center || loading}
                            className="w-full shadow-lg shadow-electric-500/20"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Searching...
                                </>
                            ) : 'Search Area'}
                        </Button>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-sm text-red-600 animate-in fade-in">
                                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {error}
                            </div>
                        )}
                    </div>
                </div>

                {/* Results List */}
                <div className="flex-1 overflow-y-auto bg-gray-50/50 p-4 space-y-3">
                    {filteredResults.length === 0 && !loading && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-500">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <p className="text-sm font-medium">No mechanics found</p>
                            <p className="text-xs mt-1">Try increasing the radius or checking filters</p>
                        </div>
                    )}

                    {filteredResults.map((r) => {
                        const isOpen = isMechanicAvailable(r.mechanic.working_hours_from, r.mechanic.working_hours_to);
                        return (
                            <Card
                                key={r.mechanic.email}
                                className={`p-4 transition-all duration-200 cursor-pointer border ${selectedEmail === r.mechanic.email ? 'border-electric-500 ring-1 ring-electric-500 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}
                                onClick={() => setSelectedEmail(r.mechanic.email)}
                            >
                                {/* Tags Row */}
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {/* Vehicle Types */}
                                    {r.mechanic.vehicleTypes?.map(type => (
                                        <span key={type} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                            {type}
                                        </span>
                                    ))}
                                    {/* Rating Tag */}
                                    {r.mechanic.rating && (
                                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
                                            <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                            {r.mechanic.rating} <span className="text-yellow-600/70">({r.mechanic.reviewCount})</span>
                                        </span>
                                    )}
                                </div>

                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{r.mechanic.name}</h3>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                {r.mechanic.working_hours_from} - {r.mechanic.working_hours_to}
                                            </span>
                                            <span>•</span>
                                            <span>{r.distanceKm.toFixed(1)} km</span>
                                        </div>
                                        {r.mechanic.startingPrice && (
                                            <div className="text-xs text-electric-600 font-medium mt-1">
                                                Starts from ${r.mechanic.startingPrice}
                                            </div>
                                        )}
                                    </div>
                                    <Badge variant={isOpen ? "default" : "destructive"} className="shrink-0">
                                        {isOpen ? "Open" : "Closed"}
                                    </Badge>
                                </div>

                                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-50">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 text-xs px-2 border-gray-200 text-gray-600 hover:text-yellow-600 hover:border-yellow-200 hover:bg-yellow-50"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleRateClick(r.mechanic)
                                        }}
                                        title="Rate this mechanic"
                                    >
                                        <span className="mr-1">★</span> Rate
                                    </Button>
                                    <a
                                        href={`tel:${r.mechanic.phone}`}
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex-1"
                                    >
                                        <Button variant="outline" size="sm" className="w-full h-8 text-xs gap-1.5 border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                            Call
                                        </Button>
                                    </a>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 text-xs px-2 border-gray-200 text-gray-600 hover:text-green-600 hover:border-green-100 hover:bg-green-50"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            const phoneNumber = r.mechanic.phone.replace(/[^0-9+]/g, '')
                                            window.open(`https://wa.me/${phoneNumber}`, '_blank')
                                        }}
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982a.394.394 0 01-.38-.55l.893-3.083a.395.395 0 01.09-.164c.045-.043.096-.083.148-.122.052-.04.105-.079.163-.111a.4.4 0 01.056-.024c-.175-.485-.298-.987-.363-1.493C1.993 7.825 1.992 5.928 2.59 4.17c.598-1.758 1.677-3.283 3.128-4.423.89-.698 1.909-1.224 3.018-1.562a.378.378 0 01.045-.011l.001-.001c4.973-1.259 10.323.202 13.842 3.723a13.247 13.247 0 013.175 15.082c-.445 1.037-.982 2.008-1.601 2.9l-.038.048c-.343.432-.71.834-1.092 1.21a.38.38 0 01-.067.061 12.734 12.734 0 01-1.787 1.306c-.014.01-.03.018-.043.027a.389.389 0 01-.026.015l-3.626 1.896a.413.413 0 01-.206.056" /></svg>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 text-xs px-2 border-gray-200 text-gray-600 hover:text-electric-600 hover:border-electric-100 hover:bg-electric-50"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            window.open(`https://www.google.com/maps/dir/?api=1&destination=${r.mechanic.location.lat},${r.mechanic.location.lng}`, '_blank')
                                        }}
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </Button>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* Offline Hint */}
                {offlineHint && (
                    <div className="p-3 bg-yellow-50 text-yellow-800 text-xs text-center border-t border-yellow-100">
                        {offlineHint}
                    </div>
                )}
            </div>

            {/* Map Area */}
            <div className="flex-1 relative h-[300px] md:h-auto z-10">
                <MapContainer
                    center={[mapCenter.lat, mapCenter.lng]}
                    zoom={center ? 13 : 5}
                    style={{ height: '100%', width: '100%' }}
                    className="z-0"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />

                    {center && (
                        <Marker position={[center.lat, center.lng]} icon={userMarkerIcon}>
                            <Popup>
                                <div className="text-center">
                                    <span className="font-semibold text-gray-900">You are here</span>
                                </div>
                            </Popup>
                        </Marker>
                    )}

                    {filteredResults.map((r) => (
                        <Marker
                            key={r.mechanic.email}
                            position={[r.mechanic.location.lat, r.mechanic.location.lng]}
                            icon={markerIcon}
                        >
                            <Popup className="custom-popup">
                                <div className="p-1 min-w-[200px]">
                                    <div className="flex justify-between items-start">
                                        <div className="font-bold text-gray-900 text-base mb-1">{r.mechanic.name}</div>
                                        {r.mechanic.rating && (
                                            <div className="flex items-center gap-0.5 text-xs font-semibold text-yellow-600">
                                                <span>★</span> {r.mechanic.rating}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs mb-2">
                                        {isMechanicAvailable(r.mechanic.working_hours_from, r.mechanic.working_hours_to) ? (
                                            <span className="text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-medium">Available</span>
                                        ) : (
                                            <span className="text-red-600 bg-red-50 px-1.5 py-0.5 rounded font-medium">Closed</span>
                                        )}
                                        <span className="text-gray-500">{r.distanceKm.toFixed(1)} km</span>
                                    </div>
                                    <Button size="sm" className="w-full h-8 text-xs" onClick={() => window.location.href = `tel:${r.mechanic.phone}`}>
                                        Call Now
                                    </Button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* Locate Me Floating Button (Desktop) */}
                <div className="absolute bottom-6 right-6 z-[1000] hidden md:block">
                    <button
                        className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all text-gray-700"
                        onClick={() => {
                            navigator.geolocation.getCurrentPosition(
                                (pos) => setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                                () => setError('Could not locate you'),
                                { enableHighAccuracy: true }
                            )
                        }}
                        title="Locate Me"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
