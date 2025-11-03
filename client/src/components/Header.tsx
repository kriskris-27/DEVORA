import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

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
    <header className="sticky top-0 z-40">
      <div className="backdrop-blur-md bg-white/70 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="/home"
            className="text-lg font-bold tracking-tight text-gray-900 hover:text-gray-700 transition-colors"
          >
            BREAK DOWN BUDDY
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/find"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Find Help
            </a>
            
            {/* Support Dropdown */}
            <div className="relative" ref={supportRef}>
              <button
                onClick={() => {
                  setIsSupportOpen(!isSupportOpen)
                  setIsCompanyOpen(false) // Close company dropdown when opening support
                }}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center gap-1"
              >
                Support
                <span className="text-xs">▼</span>
              </button>
              {isSupportOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <a href="/support" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Support Center</a>
                  <a href="/faq" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">FAQ</a>
                  <a href="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Contact Us</a>
                  <a href="/grievance" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Grievance Policy</a>
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div className="relative" ref={companyRef}>
              <button
                onClick={() => {
                  setIsCompanyOpen(!isCompanyOpen)
                  setIsSupportOpen(false) // Close support dropdown when opening company
                }}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center gap-1"
              >
                Company
                <span className="text-xs">▼</span>
              </button>
              {isCompanyOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <a href="/company" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">About Us</a>
                  <a href="/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Blog</a>
                  <a href="/partners" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Partners</a>
                  <a href="/terms" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Terms & Conditions</a>
                  <a href="/privacy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Privacy Policy</a>
                </div>
              )}
            </div>

            {!isInMechanicPortal && (
              <a
                href="/mechanic"
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
              >
                Mechanic Portal
              </a>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <span className="text-xl">☰</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="px-6 py-4 space-y-2">
              <a
                href="/find"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Find help
              </a>
              <a
                href="/support"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Support Center
              </a>
              <a
                href="/faq"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
              <a
                href="/contact"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </a>
              <a
                href="/company"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
              <a
                href="/blog"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
              {!isInMechanicPortal && (
                <a
                  href="/mechanic"
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mechanic Portal
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
  