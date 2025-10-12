import { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

type LatLng = { lat: number; lng: number }
type Result = { mechanic: { email: string; name: string; workingHours: string; phone: string; location: LatLng }, distanceKm: number }

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
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
  const [manualPin, setManualPin] = useState<LatLng | null>(null)
  const [offlineHint, setOfflineHint] = useState<string | undefined>()

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

  const search = async () => {
    const c = manualPin ?? center
    if (!c) return
    setLoading(true)
    setError(undefined)
    try {
      const url = `${API_URL}/api/mechanics?lat=${c.lat}&lng=${c.lng}&radiusKm=${radiusKm}`
      console.log('[client] GET', url)
      const res = await fetch(url)
      const data = await res.json()
      console.log('[client] nearby data', data)
      if (Array.isArray(data?.results)) {
        console.log('[client] results count', data.results.length)
        console.table(data.results.map((r: any) => ({ email: r?.mechanic?.email, distanceKm: r?.distanceKm, lat: r?.mechanic?.location?.lat, lng: r?.mechanic?.location?.lng })))
      }
      if (!res.ok) throw new Error(data?.message || 'Search failed')
      setResults(data.results)
      setOfflineHint(undefined)
      localStorage.setItem('find:last', JSON.stringify({ center: c, radiusKm }))
    } catch (e: any) {
      setError(e.message || 'Failed to search')
      const c2 = manualPin ?? center
      if (c2) setOfflineHint(`If online search fails, send SMS with GPS: ${c2.lat.toFixed(5)}, ${c2.lng.toFixed(5)}`)
    } finally {
      setLoading(false)
    }
  }

  const mapCenter = useMemo<LatLng>(() => center ?? { lat: 20.5937, lng: 78.9629 }, [center])

  function ClickToPin() {
    useMapEvents({
      click(e) {
        setManualPin({ lat: e.latlng.lat, lng: e.latlng.lng })
      },
    })
    return null
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto glass p-6 animate-[fadeIn_300ms_ease-out]">
      <div className="flex items-center justify-between mb-4">
        <a className="btn btn-ghost" href="/home">Back</a>
        <h1 className="text-2xl font-semibold">Find Nearby Mechanics</h1>
        <span />
      </div>
      {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}
      <div className="flex items-center gap-3 mb-3">
        <label className="text-sm text-gray-700">Radius (km)</label>
        <input type="number" className="input w-24" value={radiusKm} onChange={(e) => setRadiusKm(Number(e.target.value))} />
        <div className="flex gap-2">
          {[2,5,10].map(n => (
            <button key={n} className="btn btn-ghost" onClick={() => setRadiusKm(n)}>{n} km</button>
          ))}
        </div>
        <button className="btn btn-primary disabled:opacity-60" onClick={search} disabled={(!center && !manualPin) || loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
        <button className="btn btn-ghost" onClick={async () => {
          const c = manualPin ?? center
          if (!c) return
          const url = `https://www.google.com/maps?q=${c.lat},${c.lng}`
          try {
            if ((navigator as any).share) await (navigator as any).share({ title: 'My location', text: `My location: ${c.lat},${c.lng}`, url })
            else await navigator.clipboard.writeText(`My location: ${c.lat},${c.lng}\n${url}`)
            alert('Location shared/copied')
          } catch {}
        }}>Share location</button>
      </div>
      {offlineHint && <p className="text-xs text-gray-600 mb-2">{offlineHint}</p>}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="h-[420px] rounded-2xl overflow-hidden">
          <MapContainer center={[mapCenter.lat, mapCenter.lng]} zoom={center ? 13 : 5} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            <ClickToPin />
            {center && !manualPin && (
              <Marker position={[center.lat, center.lng]} icon={markerIcon}>
                <Popup>You are here</Popup>
              </Marker>
            )}
            {manualPin && (
              <Marker position={[manualPin.lat, manualPin.lng]} icon={markerIcon}>
                <Popup>Manual location</Popup>
              </Marker>
            )}
            {results.map((r) => (
              <Marker key={r.mechanic.email} position={[r.mechanic.location.lat, r.mechanic.location.lng]} icon={markerIcon}>
                <Popup>
                  <div className="text-sm">
                    <div className="font-medium">{r.mechanic.name}</div>
                    <div>{r.mechanic.workingHours}</div>
                    <div>{r.mechanic.phone}</div>
                    <div>{r.distanceKm.toFixed(2)} km away</div>
                    <div className="mt-2 flex gap-2">
                      <a className="btn btn-ghost" href={`tel:${r.mechanic.phone}`}>Call</a>
                      <button className="btn btn-ghost" onClick={() => navigator.clipboard.writeText(`${r.mechanic.location.lat}, ${r.mechanic.location.lng}`)}>Copy coords</button>
                      <a className="btn btn-ghost" target="_blank" href={`https://www.google.com/maps?q=${r.mechanic.location.lat},${r.mechanic.location.lng}`}>Navigate</a>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div className="space-y-2">
          {results.length === 0 && <p className="text-sm text-gray-600">No results yet. Click Search.</p>}
          {results.map((r) => (
            <div key={r.mechanic.email} className={`border rounded p-3 cursor-pointer ${selectedEmail === r.mechanic.email ? 'ring-2 ring-blue-400' : ''}`}
                 onClick={() => {
                   setSelectedEmail(r.mechanic.email)
                   // Recenter map smoothly by changing hash in URL could be done via refs; for simplicity, just log
                   console.log('[client] select', r.mechanic.email)
                 }}>
              <div className="font-medium">{r.mechanic.name}</div>
              <div className="text-sm text-gray-700">{r.mechanic.workingHours}</div>
              <div className="text-sm text-gray-700">{r.mechanic.phone}</div>
              <div className="text-sm text-gray-500">{r.distanceKm.toFixed(2)} km away</div>
              
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}


