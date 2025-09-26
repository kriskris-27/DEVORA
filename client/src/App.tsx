import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthProvider'
import MechanicAuth from './pages/MechanicAuth'
import MechanicDashboard from './pages/MechanicDashboard'
import MechanicOnboarding from './pages/MechanicOnboarding'
import FindMechanics from './pages/FindMechanics'
import Home from './pages/Home'

function ProtectedMechanicRoute({ children }: { children: JSX.Element }) {
  const { role, user } = useAuth()
  if (!user) return <Navigate to="/mechanic" replace />
  if (role !== 'mechanic') return <Navigate to="/home" replace />
  return children
}

function ProtectedUserRoute({ children }: { children: JSX.Element }) {
  const { role, user } = useAuth()
  if (!user) return <Navigate to="/home" replace />
  if (role !== 'user') return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedUserRoute><Home/></ProtectedUserRoute>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/find" element={<FindMechanics/>} />
          <Route path="/mechanic" element={<MechanicAuth />} />
          <Route
            path="/mechanic/onboarding"
            element={
              <ProtectedMechanicRoute>
                <MechanicOnboarding />
              </ProtectedMechanicRoute>
            }
          />
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