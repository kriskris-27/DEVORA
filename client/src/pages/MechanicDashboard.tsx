import { useEffect } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { useNavigate } from 'react-router-dom'

export default function MechanicDashboard() {
  const { user, role, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || role !== 'mechanic') {
      navigate('/mechanic', { replace: true })
    }
  }, [user, role, navigate])
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Mechanic Dashboard</h1>
        <button
          className="text-sm text-blue-600"
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
    </div>
  )
}


