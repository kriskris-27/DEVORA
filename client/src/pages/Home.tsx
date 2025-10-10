function Home() {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative px-4 py-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-500"></div>
          
          <div className="relative max-w-6xl mx-auto text-center">
            {/* Main Heading */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6 animate-[fadeIn_600ms_ease-out]">
                BREAK DOWN BUDDY
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-[fadeIn_800ms_ease-out]">
                Your trusted companion when your vehicle needs help. 
                <span className="text-blue-600 font-semibold"> Instant mechanic assistance</span> wherever you are.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-[fadeIn_1000ms_ease-out]">
              <a 
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out"
                href="/find"
              >
                <span className="relative z-10 flex items-center gap-2">
                  🔧 Find mechanics near me
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-blue-700 font-semibold rounded-2xl border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 ease-out shadow-lg"
                href="/mechanic"
              >
                <span className="flex items-center gap-2">
                  👨‍🔧 Mechanic portal
                </span>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-[fadeIn_1200ms_ease-out]">
              <div className="glass p-6 rounded-2xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600">Always available</div>
              </div>
              <div className="glass p-6 rounded-2xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">5min</div>
                <div className="text-gray-600">Average response time</div>
              </div>
              <div className="glass p-6 rounded-2xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                <div className="text-gray-600">Trusted mechanics</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why choose Break Down Buddy?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We make getting roadside assistance simple, fast, and reliable
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="glass p-8 rounded-2xl card-hover group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get connected to nearby mechanics in minutes, not hours. Our smart matching system finds the closest available help.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass p-8 rounded-2xl card-hover group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Verified Mechanics</h3>
                <p className="text-gray-600 leading-relaxed">
                  All our mechanics are background-checked, licensed, and rated by real customers. Your safety is our priority.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass p-8 rounded-2xl card-hover group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Fair Pricing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Transparent pricing with no hidden fees. See the cost upfront and pay securely through our platform.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="glass p-8 rounded-2xl card-hover group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Tracking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Track your mechanic's location and ETA in real-time. Know exactly when help will arrive.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="glass p-8 rounded-2xl card-hover group">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🚨</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Emergency Ready</h3>
                <p className="text-gray-600 leading-relaxed">
                  Available 24/7 for emergencies. Whether it's a flat tire at midnight or engine trouble on a weekend.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="glass p-8 rounded-2xl card-hover group">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Live Support</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get instant help from our support team. Chat, call, or message us anytime you need assistance.
                </p>
          </div>
        </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied customers who trust Break Down Buddy for their roadside assistance needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out"
                href="/find"
              >
                Find help now
              </a>
              <a 
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-blue-700 transform hover:-translate-y-1 transition-all duration-300 ease-out"
                href="/mechanic"
              >
                Become a mechanic
              </a>
          </div>
        </div>
        </section>
      </div>
    )
  }
 export default Home