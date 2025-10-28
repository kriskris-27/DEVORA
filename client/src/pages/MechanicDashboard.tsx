import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useAuth } from '../auth/AuthProvider'
import { useNavigate } from 'react-router-dom'
type LatLng = { lat: number; lng: number }
type Mechanic = { email: string; name: string; workingHours: string; phone: string; location: LatLng }

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

export default function MechanicDashboard() {
  const { user, role, signOut } = useAuth()
  const navigate = useNavigate()
  const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000'
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [profile, setProfile] = useState<Mechanic | null>(null)
  const [original, setOriginal] = useState<Mechanic | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const email = user?.email
    if (!email || role !== 'mechanic') {
      navigate('/', { replace: true })
      return
    }
    const load = async () => {
      setLoading(true)
      setError(undefined)
      try {
        const res = await fetch(`${API_URL}/api/mechanics/${encodeURIComponent(email)}`)
        if (res.status === 404) {
          setProfile(null)
        } else {
          const data = await res.json()
          setProfile(data.mechanic as Mechanic)
          setOriginal(data.mechanic as Mechanic)
        }
      } catch (e: any) {
        setError(e.message || 'Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user, role, navigate, API_URL])
  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-4xl mx-auto glass p-6 animate-[fadeIn_300ms_ease-out]">
        <div className="flex justify-between items-center mb-8">
          <button 
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full border border-gray-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => navigate(-1)}
          >
            <div className="w-5 h-5 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors duration-200">
              <span className="text-sm">←</span>
            </div>
            <span className="font-medium">Back</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Mechanic Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your profile and settings</p>
          </div>
          
          <button
            className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-4 py-2 rounded-full border border-red-200 hover:border-red-300 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={async () => {
              await signOut()
              navigate('/mechanic', { replace: true })
            }}
          >
            <div className="w-5 h-5 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors duration-200">
              <span className="text-sm">↪</span>
            </div>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      <div className="mt-4 space-y-1">
        <p className="text-gray-700">Email: {user?.email}</p>
        <p className="text-gray-700">Role: {role}</p>
      </div>
      {error && <p className="text-red-600 mt-3 text-sm">{error}</p>}
      {loading ? (
        <p className="mt-6 text-sm text-gray-600">Loading profile…</p>
      ) : profile ? (
        <>
          {!isEditing ? (
            <div className="mt-6 grid gap-3 max-w-xl">
              <div className="text-lg font-medium">{profile.name}</div>
              <div className="text-gray-700">
                <span className="font-medium">Working Hours:</span> {profile.workingHours || 'Not set'}
              </div>
              <div className="text-gray-700">
                <span className="font-medium">Phone:</span> {profile.phone || 'Not set'}
              </div>
              <div className="text-gray-700">
                <span className="font-medium">Location:</span> {profile.location?.lat ? `${profile.location.lat}, ${profile.location.lng}` : 'Not set'}
              </div>
              <div className="mt-2">
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
              </div>
            </div>
          ) : (
            <div className="mt-6 grid gap-3 max-w-xl">
              <input className="input" value={profile.name ?? ''}
                     placeholder="Enter your full name"
                     onChange={(e) => setProfile({ ...(profile as Mechanic), name: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                  <div className="relative">
                    <input 
                      className="input w-full pr-12" 
                      type="time"
                      step="60"
                      value={(() => {
                        const timeStr = profile.workingHours?.split(' - ')[0] || ''
                        if (!timeStr) return ''
                        try {
                          const date = new Date(`2000-01-01 ${timeStr}`)
                          return date.toTimeString().slice(0, 5)
                        } catch {
                          return ''
                        }
                      })()}
                      onChange={(e) => {
                        const toTime = profile.workingHours?.split(' - ')[1] || ''
                        const time24 = e.target.value
                        const time12 = time24 ? new Date(`2000-01-01T${time24}`).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit', 
                          hour12: true 
                        }) : ''
                        setProfile({ ...(profile as Mechanic), workingHours: `${time12} - ${toTime}` })
                      }} 
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                      
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                  <div className="relative">
                    <input 
                      className="input w-full pr-12" 
                      type="time"
                      step="60"
                      value={(() => {
                        const timeStr = profile.workingHours?.split(' - ')[1] || ''
                        if (!timeStr) return ''
                        try {
                          const date = new Date(`2000-01-01 ${timeStr}`)
                          return date.toTimeString().slice(0, 5)
                        } catch {
                          return ''
                        }
                      })()}
                      onChange={(e) => {
                        const fromTime = profile.workingHours?.split(' - ')[0] || ''
                        const time24 = e.target.value
                        const time12 = time24 ? new Date(`2000-01-01T${time24}`).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit', 
                          hour12: true 
                        }) : ''
                        setProfile({ ...(profile as Mechanic), workingHours: `${fromTime} - ${time12}` })
                      }} 
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                      
                    </div>
                  </div>
                </div>
              </div>
              <input className="input" value={profile.phone ?? ''}
                     placeholder="+91 98765 43210"
                     onChange={(e) => setProfile({ ...(profile as Mechanic), phone: e.target.value })} />
              <div className="grid md:grid-cols-2 gap-3">
                <div className="grid grid-cols-2 gap-2">
                  <input className="input" value={profile.location?.lat ?? ''}
                         placeholder="Latitude"
                         onChange={(e) => setProfile({ ...(profile as Mechanic), location: { ...(profile.location || { lat: 0, lng: 0 }), lat: Number(e.target.value) } })} />
                  <input className="input" value={profile.location?.lng ?? ''}
                         placeholder="Longitude"
                         onChange={(e) => setProfile({ ...(profile as Mechanic), location: { ...(profile.location || { lat: 0, lng: 0 }), lng: Number(e.target.value) } })} />
                </div>
                
              </div>
              <div className="h-[380px]  rounded-2xl overflow-hidden">
                  <MapContainer center={[profile.location?.lat || 20.5937, profile.location?.lng || 78.9629]} zoom={profile.location ? 13 : 5} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
                    <ClickPicker onPick={(la, ln) => setProfile({ ...(profile as Mechanic), location: { ...(profile.location || { lat: 0, lng: 0 }), lat: la, lng: ln } })} />
                    {profile.location && <Marker position={[profile.location.lat, profile.location.lng]} icon={markerIcon} />}
                  </MapContainer>
                </div>
              <div className="flex gap-3">
                <button className="btn btn-primary disabled:opacity-60" disabled={saving}
                        onClick={async () => {
                          if (!profile) return
                          setSaving(true)
                          setError(undefined)
                          try {
                            // Derive HH:MM from the display string "h:mm AM - h:mm PM" if present
                            const [a, b] = (profile.workingHours || '').split(' - ')
                            const to24 = (s?: string) => {
                              if (!s) return ''
                              try {
                                const d = new Date(`2000-01-01 ${s}`)
                                return d.toTimeString().slice(0,5)
                              } catch {}
                              return ''
                            }
                            const workingHoursFrom = to24(a)
                            const workingHoursTo = to24(b)
                            const body = { ...profile, workingHoursFrom, workingHoursTo }
                            const res = await fetch(`${API_URL}/api/mechanics`, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(body),
                            })
                            const data = await res.json().catch(() => undefined)
                            if (!res.ok) throw new Error(data?.message || 'Failed to save')
                            setOriginal(profile)
                            setIsEditing(false)
                            alert('Profile updated')
                          } catch (e: any) {
                            setError(e.message || 'Failed to save')
                          } finally {
                            setSaving(false)
                          }
                        }}>
                  {saving ? 'Saving…' : 'Save changes'}
                </button>
                <button className="btn btn-ghost" onClick={() => { setProfile(original); setIsEditing(false) }}>Cancel</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="mt-6">
          <p className="text-sm text-gray-700">No profile found.</p>
          <button className="btn btn-ghost mt-2" onClick={() => navigate('/mechanic/onboarding')}>Create your profile</button>
        </div>
      )}
      </div>
    </div>
  )
}


