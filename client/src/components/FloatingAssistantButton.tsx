import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function FloatingAssistantButton() {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const hidden = useMemo(() => {
        // Hide on the assistant page itself to avoid redundancy
        return pathname.endsWith('/assistant')
    }, [pathname])

    if (hidden) return null

    return (
        <button
            aria-label="Open Mech Assistance Bot"
            title="Mech Assistance Bot"
            className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
            onClick={() => navigate('/assistant')}
        >
            <span className="text-xl" role="img" aria-hidden>
                🛠️
            </span>
        </button>
    )
}
