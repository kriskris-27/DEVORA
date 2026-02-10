import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MechanicAuth from "../pages/MechanicAuth";
import FindMechanics from "../pages/FindMechanics";
import MechanicOnboarding from "../pages/MechanicOnboarding";
import Support from "../pages/Support";
import Contact from "../pages/Contact";
import FAQ from "../pages/FAQ";
import Company from "../pages/Company";
import Blog from "../pages/Blog";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import Partners from "../pages/Partners";
import Grievance from "../pages/Grievance";
import AppLayout from "../Layouts/AppLayout";
import { ProtectedMechanicRoute } from "../App";
import MechanicDashboard from "../pages/MechanicDashboard";
import MechanicAssistant from "../pages/MechanicAssistant";
import NotFound from "../pages/NotFound";
import FloatingAssistantButton from "../components/FloatingAssistantButton";

const AppRoutes = () => {
    return (
        <>
            <FloatingAssistantButton />
            <Routes>
                {/* Public pages */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/mechanic" element={<MechanicAuth />} />

                {/* Layout routes for general pages */}
                <Route element={<AppLayout />}>
                    <Route path="find" element={<FindMechanics />} />
                    <Route path="support" element={<Support />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="faq" element={<FAQ />} />
                    <Route path="company" element={<Company />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="terms" element={<Terms />} />
                    <Route path="privacy" element={<Privacy />} />
                    <Route path="partners" element={<Partners />} />
                    <Route path="grievance" element={<Grievance />} />
                    <Route path="assistant" element={<MechanicAssistant />} />
                </Route>

                {/* Mechanic routes (protected + with layout) */}
                <Route
                    path="/mechanic"
                    element={
                        <ProtectedMechanicRoute>
                            <AppLayout />
                        </ProtectedMechanicRoute>
                    }
                >
                    <Route path="onboarding" element={<MechanicOnboarding />} />
                    <Route path="dashboard" element={<MechanicDashboard />} />
                </Route>

                {/* Fallback route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
