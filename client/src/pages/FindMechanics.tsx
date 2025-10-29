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

  // 🔄 Convert 24-hour time to 12-hour AM/PM format
  const formatTimeToAMPM = (timeStr: string): string => {
    if (!timeStr) return timeStr
    
    // Remove seconds if present (HH:MM:SS -> HH:MM)
    const timeWithoutSeconds = timeStr.includes(':') && timeStr.split(':').length === 3 
      ? timeStr.split(':').slice(0, 2).join(':')
      : timeStr
    
    try {
      // If already in AM/PM format, return as is
      if (timeWithoutSeconds.includes('AM') || timeWithoutSeconds.includes('PM')) {
        return timeWithoutSeconds
      }
      
      // Parse HH:MM format
      const [hours, minutes] = timeWithoutSeconds.split(':').map(Number)
      const date = new Date()
      date.setHours(hours, minutes || 0, 0)
      
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    } catch {
      return timeStr
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
                    <div className="text-sm space-y-2 min-w-[200px]">
                      <div className="font-semibold text-gray-800">{r.mechanic.name}</div>
                      <div className="flex items-center gap-2 text-xs">
                        <span>
                          {formatTimeToAMPM(r.mechanic.working_hours_from)} – {formatTimeToAMPM(r.mechanic.working_hours_to)}
                        </span>
                        {isMechanicAvailable(r.mechanic.working_hours_from, r.mechanic.working_hours_to) ? (
                          <span className="text-green-600 font-semibold">🟢 Open</span>
                        ) : (
                          <span className="text-red-600 font-semibold">🔴 Closed</span>
                        )}
                      </div>
                      <div className="text-xs">{r.mechanic.phone}</div>
                      <div className="text-xs text-gray-500">{r.distanceKm.toFixed(2)} km away</div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-200">
                        <button
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-xs"
                          onClick={() => window.location.href = `tel:${r.mechanic.phone}`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                          </svg>
                          <span>Call</span>
                        </button>
                        
                        <button
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors text-xs"
                          onClick={() => {
                            const phoneNumber = r.mechanic.phone.replace(/[^0-9+]/g, '')
                            window.open(`https://wa.me/${phoneNumber}`, '_blank')
                          }}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982a.394.394 0 01-.38-.55l.893-3.083a.395.395 0 01.09-.164c.045-.043.096-.083.148-.122.052-.04.105-.079.163-.111a.4.4 0 01.056-.024c-.175-.485-.298-.987-.363-1.493C1.993 7.825 1.992 5.928 2.59 4.17c.598-1.758 1.677-3.283 3.128-4.423.89-.698 1.909-1.224 3.018-1.562a.378.378 0 01.045-.011l.001-.001c4.973-1.259 10.323.202 13.842 3.723a13.247 13.247 0 013.175 15.082c-.445 1.037-.982 2.008-1.601 2.9l-.038.048c-.343.432-.71.834-1.092 1.21a.38.38 0 01-.067.061 12.734 12.734 0 01-1.787 1.306c-.014.01-.03.018-.043.027a.389.389 0 01-.026.015l-3.626 1.896a.413.413 0 01-.206.056"/>
                          </svg>
                          <span>WhatsApp</span>
                        </button>
                        
                        <button
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors text-xs"
                          onClick={() => {
                            const locationText = `${r.mechanic.name}\n${r.mechanic.phone}\nDistance: ${r.distanceKm.toFixed(2)} km`
                            navigator.clipboard.writeText(locationText)
                            alert('Information copied!')
                          }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                          </svg>
                          <span>Copy</span>
                        </button>
                        
                        <button
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 text-blue-700 hover:bg-gray-100 transition-colors text-xs"
                          onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${r.mechanic.location.lat},${r.mechanic.location.lng}`, '_blank')}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                          <span>Navigate</span>
                        </button>
                      </div>
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
                className={`border rounded-2xl p-4 sm:p-5 bg-white shadow hover:shadow-lg transition-all ${
                  selectedEmail === r.mechanic.email ? 'ring-2 ring-blue-400' : ''
                }`}
                onClick={() => setSelectedEmail(r.mechanic.email)}
              >
                <div className="font-semibold text-lg sm:text-xl text-gray-800">{r.mechanic.name}</div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span>
                    {formatTimeToAMPM(r.mechanic.working_hours_from)} – {formatTimeToAMPM(r.mechanic.working_hours_to)}
                  </span>
                  {isMechanicAvailable(r.mechanic.working_hours_from, r.mechanic.working_hours_to) ? (
                    <span className="text-green-600 font-semibold">🟢 Available</span>
                  ) : (
                    <span className="text-red-600 font-semibold">🔴 Closed</span>
                  )}
                </div>
                <div className="text-sm text-gray-600">{r.mechanic.phone}</div>
                <div className="text-xs text-gray-500">{r.distanceKm.toFixed(2)} km away</div>
                
                {/* Action Buttons */}
                <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-gray-200">
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.location.href = `tel:${r.mechanic.phone}`
                    }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span className="text-sm font-medium">Call</span>
                  </button>
                  
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      const phoneNumber = r.mechanic.phone.replace(/[^0-9+]/g, '')
                      window.open(`https://wa.me/${phoneNumber}`, '_blank')
                    }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982a.394.394 0 01-.38-.55l.893-3.083a.395.395 0 01.09-.164c.045-.043.096-.083.148-.122.052-.04.105-.079.163-.111a.4.4 0 01.056-.024c-.175-.485-.298-.987-.363-1.493C1.993 7.825 1.992 5.928 2.59 4.17c.598-1.758 1.677-3.283 3.128-4.423.89-.698 1.909-1.224 3.018-1.562a.378.378 0 01.045-.011l.001-.001c4.973-1.259 10.323.202 13.842 3.723a13.247 13.247 0 013.175 15.082c-.445 1.037-.982 2.008-1.601 2.9l-.038.048c-.343.432-.71.834-1.092 1.21a.38.38 0 01-.067.061 12.734 12.734 0 01-1.787 1.306c-.014.01-.03.018-.043.027a.389.389 0 01-.026.015l-3.626 1.896a.413.413 0 01-.206.056"/>
                    </svg>
                    <span className="text-sm font-medium">WhatsApp</span>
                  </button>
                  
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      const locationText = `${r.mechanic.name}\n${r.mechanic.phone}\nDistance: ${r.distanceKm.toFixed(2)} km`
                      navigator.clipboard.writeText(locationText)
                      alert('Information copied!')
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    <span className="text-sm font-medium">Copy</span>
                  </button>
                  
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-blue-700 hover:bg-gray-100 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(`https://www.google.com/maps/dir/?api=1&destination=${r.mechanic.location.lat},${r.mechanic.location.lng}`, '_blank')
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span className="text-sm font-medium">Navigate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

