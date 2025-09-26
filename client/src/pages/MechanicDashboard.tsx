import { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { useNavigate } from 'react-router-dom'
type LatLng = { lat: number; lng: number }
type Mechanic = { email: string; name: string; workingHours: string; phone: string; location: LatLng }

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
        <div className="flex justify-between items-center">
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>Back</button>
          <h1 className="text-2xl font-semibold">Mechanic Dashboard</h1>
          <button
          className="btn btn-ghost"
          onClick={async () => {
            await signOut()
            navigate('/mechanic', { replace: true })
          }}
        >
          Sign out
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
              <div className="text-gray-700">Hours: {profile.workingHours}</div>
              <div className="text-gray-700">Phone: {profile.phone}</div>
              <div className="text-gray-700">Location: {profile.location?.lat}, {profile.location?.lng}</div>
              <div className="mt-2">
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
              </div>
            </div>
          ) : (
            <div className="mt-6 grid gap-3 max-w-xl">
              <input className="input" value={profile.name ?? ''}
                     onChange={(e) => setProfile({ ...(profile as Mechanic), name: e.target.value })} />
              <input className="input" value={profile.workingHours ?? ''}
                     onChange={(e) => setProfile({ ...(profile as Mechanic), workingHours: e.target.value })} />
              <input className="input" value={profile.phone ?? ''}
                     onChange={(e) => setProfile({ ...(profile as Mechanic), phone: e.target.value })} />
              <div className="grid grid-cols-2 gap-2">
                <input className="input" value={profile.location?.lat ?? ''}
                       onChange={(e) => setProfile({ ...(profile as Mechanic), location: { ...(profile.location || { lat: 0, lng: 0 }), lat: Number(e.target.value) } })} />
                <input className="input" value={profile.location?.lng ?? ''}
                       onChange={(e) => setProfile({ ...(profile as Mechanic), location: { ...(profile.location || { lat: 0, lng: 0 }), lng: Number(e.target.value) } })} />
              </div>
              <div className="flex gap-3">
                <button className="btn btn-primary disabled:opacity-60" disabled={saving}
                        onClick={async () => {
                          if (!profile) return
                          setSaving(true)
                          setError(undefined)
                          try {
                            const res = await fetch(`${API_URL}/api/mechanics`, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(profile),
                            })
                            const data = await res.json().catch(() => undefined)
                            if (!res.ok) throw new Error(data?.message || 'Failed to save')
                            setOriginal(profile)
                            setIsEditing(false)
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


