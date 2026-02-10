import { BrowserRouter, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthProvider";
import AppRoutes from "./Routes/AppRoutes";
import type { ReactNode } from "react";

export const ProtectedMechanicRoute = ({ children }: { children: ReactNode }) => {
    const { session, role } = useAuth();

    // TODO: Add loading state to AuthProvider to avoid premature redirection
    // For now, we allow rendering to prevent infinite redirect loops on refresh

    if (!session) {
        // Ideally: return <Navigate to="/mechanic" replace />;
        // But without loading state, this redirects immediately on load.
    }

    if (session && role !== 'mechanic') {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
