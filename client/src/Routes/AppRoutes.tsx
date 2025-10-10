import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MechanicAuth from "../pages/MechanicAuth";
import FindMechanics from "../pages/FindMechanics";
// import { ProtectedUserRoute } from "../App";
import AppLayout from "../Layouts/AppLayout";
import MechanicOnboarding from "../pages/MechanicOnboarding";
import { ProtectedMechanicRoute } from "../App";

const AppRoutes = () => {
  return (
    <Routes>
        {/* Anyone can access this  */}
        <Route path="/home" element={<Home/>} />
        <Route path="/mechanic" element={<MechanicAuth />} />
        <Route path="/find" element={<FindMechanics/>} />


        {/* This will bring the header and footer */}
        <Route path="/" element={<ProtectedMechanicRoute>
            <AppLayout/>
        </ProtectedMechanicRoute>}>
        
            <Route path="/mech/onboarding" element={<MechanicOnboarding />}/>
        </Route>
           

    </Routes>
  )
}

export default AppRoutes
