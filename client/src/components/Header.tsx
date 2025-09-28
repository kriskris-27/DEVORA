export default function Header() {
    return (
      <header className="sticky top-0 z-40">
        <div className="backdrop-blur-md bg-white/70 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo / Brand */}
            <a
              href="/"
              className="text-lg font-bold tracking-tight text-gray-900 hover:text-gray-700 transition-colors"
            >
              BREAK DOWN BUDDY
            </a>
  
            {/* Nav */}
            <nav className="flex items-center gap-3">
              <a
                href="/find"
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Find help
              </a>
              <a
                href="/mechanic"
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
              >
                Mechanic portal
              </a>
            </nav>
          </div>
        </div>
      </header>
    )
  }
  