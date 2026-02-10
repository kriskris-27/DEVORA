import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from './ui/Button'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSupportOpen, setIsSupportOpen] = useState(false)
    const [isCompanyOpen, setIsCompanyOpen] = useState(false)
    const { pathname } = useLocation()

    const supportRef = useRef<HTMLDivElement>(null)
    const companyRef = useRef<HTMLDivElement>(null)

    // Hide Mechanic Portal button if already in mechanic portal
    const isInMechanicPortal = pathname.startsWith('/mechanic')

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (supportRef.current && !supportRef.current.contains(event.target as Node)) {
                setIsSupportOpen(false)
            }
            if (companyRef.current && !companyRef.current.contains(event.target as Node)) {
                setIsCompanyOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <header className="sticky top-0 z-40 w-full">
            <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    {/* Logo / Brand */}
                    <a
                        href="/home"
                        className="text-2xl font-serif font-semibold tracking-tight text-gray-900 hover:text-electric-600 transition-colors"
                    >
                        BREAK DOWN <span className="text-electric-600">BUDDY</span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-2">
                        <a
                            href="/find"
                            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-electric-600 hover:bg-electric-50 transition-all duration-200"
                        >
                            Find Help
                        </a>

                        {/* Support Dropdown */}
                        <div className="relative group" ref={supportRef}>
                            <button
                                onClick={() => {
                                    setIsSupportOpen(!isSupportOpen)
                                    setIsCompanyOpen(false)
                                }}
                                className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-electric-600 hover:bg-electric-50 transition-all duration-200 group-hover:text-electric-600"
                            >
                                Support
                                <span className="text-[10px] opacity-50 group-hover:opacity-100 transition-opacity">▼</span>
                            </button>

                            {/* Dropdown Menu */}
                            <div className={`absolute top-full right-0 pt-2 w-56 transition-all duration-200 transform origin-top-right ${isSupportOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                                <div className="bg-white rounded-2xl shadow-layered-lg border border-gray-100 p-2">
                                    <a href="/support" className="block px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:text-electric-700 hover:bg-electric-50 transition-colors">Support Center</a>
                                    <a href="/faq" className="block px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:text-electric-700 hover:bg-electric-50 transition-colors">FAQ</a>
                                    <a href="/contact" className="block px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:text-electric-700 hover:bg-electric-50 transition-colors">Contact Us</a>
                                    <div className="h-px bg-gray-50 my-1"></div>
                                    <a href="/grievance" className="block px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:text-electric-700 hover:bg-electric-50 transition-colors">Grievance Policy</a>
                                </div>
                            </div>
                        </div>

                        {/* Company Dropdown */}
                        <div className="relative group" ref={companyRef}>
                            <button
                                onClick={() => {
                                    setIsCompanyOpen(!isCompanyOpen)
                                    setIsSupportOpen(false)
                                }}
                                className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-electric-600 hover:bg-electric-50 transition-all duration-200 group-hover:text-electric-600"
                            >
                                Company
                                <span className="text-[10px] opacity-50 group-hover:opacity-100 transition-opacity">▼</span>
                            </button>
                            <div className={`absolute top-full right-0 pt-2 w-56 transition-all duration-200 transform origin-top-right ${isCompanyOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                                <div className="bg-white rounded-2xl shadow-layered-lg border border-gray-100 p-2">
                                    <a href="/company" className="block px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:text-electric-700 hover:bg-electric-50 transition-colors">About Us</a>
                                    <a href="/blog" className="block px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:text-electric-700 hover:bg-electric-50 transition-colors">Blog</a>
                                    <a href="/partners" className="block px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:text-electric-700 hover:bg-electric-50 transition-colors">Partners</a>
                                    <div className="h-px bg-gray-50 my-1"></div>
                                    <a href="/terms" className="block px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:text-electric-700 hover:bg-electric-50 transition-colors">Terms & Conditions</a>
                                    <a href="/privacy" className="block px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:text-electric-700 hover:bg-electric-50 transition-colors">Privacy Policy</a>
                                </div>
                            </div>
                        </div>

                        {!isInMechanicPortal && (
                            <div className="pl-4 ml-2 border-l border-gray-200">
                                <a href="/mechanic">
                                    <Button variant="primary" size="sm" className="font-semibold">
                                        Mechanic Portal
                                    </Button>
                                </a>
                            </div>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                        <span className="text-xl">☰</span>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
                        <div className="px-6 py-6 space-y-2">
                            <a
                                href="/find"
                                className="block px-4 py-3 rounded-xl text-base font-medium text-gray-600 hover:text-electric-700 hover:bg-electric-50 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Find help
                            </a>
                            <div className="h-px bg-gray-100 my-2"></div>
                            <a
                                href="/support"
                                className="block px-4 py-3 rounded-xl text-base font-medium text-gray-600 hover:text-electric-700 hover:bg-electric-50 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Support Center
                            </a>
                            {!isInMechanicPortal && (
                                <a
                                    href="/mechanic"
                                    className="block mt-4"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Button fullWidth>Mechanic Portal</Button>
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
