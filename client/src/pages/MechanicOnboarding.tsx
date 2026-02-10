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
    const [workingHoursFrom, setWorkingHoursFrom] = useState('')
    const [workingHoursTo, setWorkingHoursTo] = useState('')
    const [phone, setPhone] = useState('')
    const [lat, setLat] = useState<number | null>(null)
    const [lng, setLng] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | undefined>()

    const [vehicleTypes, setVehicleTypes] = useState<string[]>([])
    const [startingPrice, setStartingPrice] = useState('')

    useEffect(() => {
        if (!user) navigate('/mechanic', { replace: true })
    }, [user, navigate])

    // First-time: try to auto-detect location for default pin
    useEffect(() => {
        if (lat != null && lng != null) return
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setLat(pos.coords.latitude)
                    setLng(pos.coords.longitude)
                },
                () => { },
                { enableHighAccuracy: true }
            )
        }
    }, [lat, lng])

    const toggleVehicleType = (type: string) => {
        setVehicleTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        )
    }

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(undefined)
        if (!user?.email) return setError('Missing user email')
        if (!name || !workingHoursFrom || !workingHoursTo || !phone || lat == null || lng == null) return setError('Fill all fields and pick location')

        setLoading(true)
        try {
            const payload = {
                email: user.email,
                name,
                workingHoursFrom,
                workingHoursTo,
                phone,
                location: { lat, lng },
                vehicleTypes,
                startingPrice: startingPrice ? Number(startingPrice) : null
            }
            console.log('[client] POST /api/mechanics payload', payload)
            const res = await fetch(`${API_URL}/api/mechanics`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
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
        <div className="min-h-screen px-4 py-10 bg-gray-50/50">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-8">
                    <button
                        className="text-gray-500 hover:text-gray-900 font-medium text-sm flex items-center gap-1 transition-colors"
                        onClick={() => navigate(-1)}
                    >
                        ← Back
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">Setup Your Profile</h1>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        {error}
                    </div>
                )}

                <form onSubmit={submit} className="grid gap-6 md:grid-cols-2">
                    {/* Personal Info */}
                    <div className="space-y-4 md:col-span-2">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Basic Details</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                                <input className="input w-full" placeholder="e.g. Joe's Auto Repair" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                                <input className="input w-full" placeholder="+1 234 567 8900" value={phone} onChange={(e) => setPhone(e.target.value)} pattern="^[0-9\-\+\s]{6,15}$" title="Enter a valid phone number" required />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 md:col-span-2">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
                                <div className="flex items-center gap-2">
                                    <input className="input w-full" type="time" value={workingHoursFrom} onChange={(e) => setWorkingHoursFrom(e.target.value)} required />
                                    <span className="text-gray-400">to</span>
                                    <input className="input w-full" type="time" value={workingHoursTo} onChange={(e) => setWorkingHoursTo(e.target.value)} required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Starting Price ($)</label>
                                <input
                                    className="input w-full"
                                    type="number"
                                    placeholder="Min service charge"
                                    value={startingPrice}
                                    onChange={(e) => setStartingPrice(e.target.value)}
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="space-y-4 md:col-span-2">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Services</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Types Serviced</label>
                            <div className="flex flex-wrap gap-3">
                                {['Car', 'Bike', 'Heavy'].map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => toggleVehicleType(type)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${vehicleTypes.includes(type)
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-100'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="md:col-span-2 space-y-2">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Location</h3>
                        <p className="text-sm text-gray-500">Click on the map to pinpoint your exact shop location.</p>
                        <div className="h-[300px] rounded-xl overflow-hidden border border-gray-200 shadow-inner relative z-0">
                            <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
                                <ClickPicker onPick={(la, ln) => { setLat(la); setLng(ln) }} />
                                {lat != null && lng != null && <Marker position={[lat, lng]} icon={markerIcon} />}
                            </MapContainer>
                        </div>
                        {lat && lng && (
                            <p className="text-xs font-mono text-gray-500 bg-gray-50 p-2 rounded inline-block">
                                📍 {lat.toFixed(5)}, {lng.toFixed(5)}
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-2 pt-4 border-t border-gray-100">
                        <button
                            className="btn btn-primary w-full md:w-auto px-8 py-3 text-base shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Saving Profile...
                                </span>
                            ) : 'Complete Setup'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


