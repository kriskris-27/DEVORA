import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useAuth } from '../auth/AuthProvider'
import { useNavigate } from 'react-router-dom'

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

function ClickPicker({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

export default function MechanicOnboarding() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000'
  const [name, setName] = useState('')
  const [workingHours, setWorkingHours] = useState('')
  const [phone, setPhone] = useState('')
  const [lat, setLat] = useState<number | null>(null)
  const [lng, setLng] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    if (!user) navigate('/mechanic', { replace: true })
  }, [user, navigate])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)
    if (!user?.email) return setError('Missing user email')
    if (!name || !workingHours || !phone || lat == null || lng == null) return setError('Fill all fields and pick location')
    setLoading(true)
    try {
      console.log('[client] POST /api/mechanics payload', { email: user.email, name, workingHours, phone, location: { lat, lng } })
      const res = await fetch(`${API_URL}/api/mechanics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, name, workingHours, phone, location: { lat, lng } }),
      })
      console.log('[client] response status', res.status)
      const data = await res.json().catch(() => undefined)
      console.log('[client] response body', data)
      if (!res.ok) throw new Error(data?.message || 'Failed to save')
      navigate('/mechanic/dashboard', { replace: true })
    } catch (err: any) {
      setError(err.message || 'Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-3xl mx-auto glass p-6 animate-[fadeIn_300ms_ease-out]">
        <div className="flex items-center justify-between mb-4">
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>Back</button>
          <h1 className="text-2xl font-semibold">Mechanic Onboarding</h1>
        </div>
        {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}
        <form onSubmit={submit} className="grid gap-3 md:grid-cols-2">
          <input className="input" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="input" placeholder="Working hours (e.g. 9am-6pm)" value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} />
          <input className="input" placeholder="Contact number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <div className="md:col-span-2">
            <p className="text-sm text-gray-600 mb-2">Click on the map to set your shop location</p>
            <div className="h[360px] md:h-[420px] rounded-2xl overflow-hidden">
              <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
                <ClickPicker onPick={(la, ln) => { setLat(la); setLng(ln) }} />
                {lat != null && lng != null && <Marker position={[lat, lng]} icon={markerIcon} />}
              </MapContainer>
            </div>
            <p className="text-sm mt-2">Selected: {lat?.toFixed(5)}, {lng?.toFixed(5)}</p>
          </div>
          <div className="md:col-span-2">
            <button className="btn btn-primary disabled:opacity-60" disabled={loading} type="submit">
              {loading ? 'Saving…' : 'Save profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


