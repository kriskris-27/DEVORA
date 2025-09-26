import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthProvider'
import MechanicAuth from './pages/MechanicAuth'
import MechanicDashboard from './pages/MechanicDashboard'

function ProtectedMechanicRoute({ children }: { children: JSX.Element }) {
  const { role, user } = useAuth()
  if (!user) return <Navigate to="/mechanic" replace />
  if (role !== 'mechanic') return <Navigate to="/" replace />
  return children
}

function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Welcome</h1>
      <p className="text-gray-600 mt-2">Users can enter directly. Mechanics please sign in.</p>
      <a className="text-blue-600 underline mt-4 inline-block" href="/mechanic">Mechanic portal</a>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mechanic" element={<MechanicAuth />} />
          <Route
            path="/mechanic/dashboard"
            element={
              <ProtectedMechanicRoute>
                <MechanicDashboard />
              </ProtectedMechanicRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}