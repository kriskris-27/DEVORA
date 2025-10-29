import { BrowserRouter,Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'
import { AuthProvider, useAuth } from './auth/AuthProvider'
import AppRoutes from './Routes/AppRoutes'
// import MechanicAuth from './pages/MechanicAuth'
// import MechanicDashboard from './pages/MechanicDashboard'
// import MechanicOnboarding from './pages/MechanicOnboarding'
// import FindMechanics from './pages/FindMechanics'
// import Header from './components/Header'
// import Footer from './components/Footer'
// import Home from './pages/Home'

export const  ProtectedMechanicRoute = ({ children }: { children: ReactElement }) =>{
  const { role, user } = useAuth()
  if (!user) return <Navigate to="/mechanic" replace />
  if (role !== 'mechanic') return <Navigate to="/home" replace />
  return children
}


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* <Header />
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
        <Footer /> */}
        <AppRoutes/>
      </BrowserRouter>
    </AuthProvider>
  )
}