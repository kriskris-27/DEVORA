import { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

type LatLng = { lat: number; lng: number }

type Result = {
  mechanic: {
    email: string
    name: string
    working_hours_from: string
    working_hours_to: string
    phone: string
    location: LatLng
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

  // 🧭 Restore last search & get current location
  useEffect(() => {
    const last = localStorage.getItem('find:last')
    if (last) {
      try {
        const parsed = JSON.parse(last)
        if (parsed?.center?.lat && parsed?.center?.lng) setCenter(parsed.center)
        if (parsed?.radiusKm) setRadiusKm(parsed.radiusKm)
      } catch {}
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
  

  // ⚙️ Filter mechanics by availability
  const filteredResults = useMemo(() => {
    if (!showAvailableOnly) return results
    return results.filter((r) =>
      isMechanicAvailable(r.mechanic.working_hours_from, r.mechanic.working_hours_to)
    )
  }, [results, showAvailableOnly])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100 px-4 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto backdrop-blur-sm bg-white/60 shadow-xl rounded-3xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <a
            className="btn btn-sm sm:btn-md btn-ghost w-full sm:w-auto shadow-sm hover:scale-105 transition-transform"
            href="/home"
          >
            Back
          </a>
          <h1 className="text-xl sm:text-3xl font-bold text-center flex-1 text-gray-800">
            Find Nearby Mechanics
          </h1>
          <span className="hidden sm:block w-[90px]" />
        </div>

        {error && <p className="text-red-600 mb-3 text-sm text-center sm:text-left">{error}</p>}

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 whitespace-nowrap">Radius (km)</label>
            <input
              type="number"
              className="input input-bordered w-24 shadow-sm hover:shadow-md transition-all"
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[2, 5, 10].map((n) => (
              <button
                key={n}
                className={`btn btn-sm sm:btn-ghost ${
                  radiusKm === n ? 'btn-primary text-white shadow-md' : 'btn-outline'
                } hover:scale-105 transition-transform`}
                onClick={() => setRadiusKm(n)}
              >
                {n} km
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              id="availableOnly"
              type="checkbox"
              checked={showAvailableOnly}
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <label htmlFor="availableOnly" className="text-sm text-gray-700">
              Show only available now
            </label>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button
              className="btn btn-primary flex-1 sm:flex-none shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
              onClick={search}
              disabled={!center || loading}
            >
              {loading ? 'Searching…' : 'Search'}
            </button>
          </div>
        </div>

        {offlineHint && (
          <p className="text-xs text-gray-600 mb-3 text-center sm:text-left">{offlineHint}</p>
        )}

        {/* Map + Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Map Section */}
          <div className="h-[340px] sm:h-[450px] rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
            <MapContainer
              center={[mapCenter.lat, mapCenter.lng]}
              zoom={center ? 13 : 5}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              {center && (
                <Marker position={[center.lat, center.lng]} icon={userMarkerIcon}>
                  <Popup>You are here</Popup>
                </Marker>
              )}

              {filteredResults.map((r) => (
                <Marker
                  key={r.mechanic.email}
                  position={[r.mechanic.location.lat, r.mechanic.location.lng]}
                  icon={markerIcon}
                >
                  <Popup>
                    <div className="text-sm space-y-1">
                      <div className="font-semibold text-gray-800">{r.mechanic.name}</div>
                      <div className="flex items-center gap-2">
                        <span>
                          {r.mechanic.working_hours_from} – {r.mechanic.working_hours_to}
                        </span>
                        {isMechanicAvailable(r.mechanic.working_hours_from, r.mechanic.working_hours_to) ? (
                          <span className="text-green-600 font-semibold">🟢 Open</span>
                        ) : (
                          <span className="text-red-600 font-semibold">🔴 Closed</span>
                        )}
                      </div>
                      <div>{r.mechanic.phone}</div>
                      <div>{r.distanceKm.toFixed(2)} km away</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Results Section */}
          <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1 sm:pr-2">
            {filteredResults.length === 0 && (
              <p className="text-sm text-gray-500 text-center sm:text-left">
                No results yet. Click <strong>Search</strong>.
              </p>
            )}
            {filteredResults.map((r) => (
              <div
                key={r.mechanic.email}
                className={`border rounded-2xl p-4 sm:p-5 bg-white shadow hover:shadow-lg transition-all cursor-pointer ${
                  selectedEmail === r.mechanic.email ? 'ring-2 ring-blue-400' : ''
                }`}
                onClick={() => setSelectedEmail(r.mechanic.email)}
              >
                <div className="font-semibold text-lg sm:text-xl text-gray-800">{r.mechanic.name}</div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span>
                    {r.mechanic.working_hours_from} – {r.mechanic.working_hours_to}
                  </span>
                  {isMechanicAvailable(r.mechanic.working_hours_from, r.mechanic.working_hours_to) ? (
                    <span className="text-green-600 font-semibold">🟢 Available</span>
                  ) : (
                    <span className="text-red-600 font-semibold">🔴 Closed</span>
                  )}
                </div>
                <div className="text-sm text-gray-600">{r.mechanic.phone}</div>
                <div className="text-xs text-gray-500">{r.distanceKm.toFixed(2)} km away</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
