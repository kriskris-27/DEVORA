import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

function Home() {
    return (
        <div className="min-h-screen bg-surface-50">
            {/* Hero Section */}
            <section className="relative px-4 py-24 md:py-32 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-transparent opacity-60"></div>
                <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-electric-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse"></div>
                <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-purple-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-pulse delay-700"></div>

                <div className="relative max-w-6xl mx-auto text-center z-10">
                    <Badge variant="secondary" className="mb-8 animate-in delay-100">
                        🚀 FASTER THAN EVER BEFORE
                    </Badge>

                    {/* Main Heading */}
                    <div className="mb-8 max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 leading-[1.1] animate-in delay-200">
                            Don't let a breakdown <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-600 to-electric-400"> ruin your journey.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-in delay-300">
                            Your trusted companion for instant mechanic assistance.
                            <br className="hidden md:block" /> Get back on the road in minutes, not hours.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-in delay-500">
                        <a href="/find">
                            <Button size="lg" className="rounded-full px-10 text-lg h-14 shadow-glow">
                                Find Mechanics Nearby
                            </Button>
                        </a>
                        <a href="/mechanic">
                            <Button variant="secondary" size="lg" className="rounded-full px-10 text-lg h-14 bg-white/50 backdrop-blur-sm">
                                Mechanic Portal
                            </Button>
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-in delay-700">
                        <Card className="p-6 bg-white/60 backdrop-blur-md border-0">
                            <div className="text-4xl font-serif font-bold text-electric-600 mb-1">24/7</div>
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Always available</div>
                        </Card>
                        <Card className="p-6 bg-white/60 backdrop-blur-md border-0">
                            <div className="text-4xl font-serif font-bold text-electric-600 mb-1">5m</div>
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Avg. Response</div>
                        </Card>
                        <Card className="p-6 bg-white/60 backdrop-blur-md border-0">
                            <div className="text-4xl font-serif font-bold text-electric-600 mb-1">1k+</div>
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Trusted Mechanics</div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
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
                        <Card className="p-8 h-full group hover:border-electric-200">
                            <div className="w-14 h-14 bg-electric-50 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm border border-electric-100">
                                ⚡
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-electric-600 transition-colors">Lightning Fast</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Get connected to nearby mechanics in minutes. Our smart matching system finds the closest help instantly.
                            </p>
                        </Card>

                        {/* Feature 2 */}
                        <Card className="p-8 h-full group hover:border-green-200">
                            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm border border-green-100">
                                🛡️
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Verified Mechanics</h3>
                            <p className="text-gray-600 leading-relaxed">
                                All mechanics are background-checked, licensed, and rated. Your safety is our absolute priority.
                            </p>
                        </Card>

                        {/* Feature 3 */}
                        <Card className="p-8 h-full group hover:border-purple-200">
                            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm border border-purple-100">
                                💰
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Fair Pricing</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Transparent pricing with no hidden fees. See the cost upfront and pay securely through our platform.
                            </p>
                        </Card>

                        {/* Feature 4 */}
                        <Card className="p-8 h-full group hover:border-orange-200">
                            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm border border-orange-100">
                                📍
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">Real-time Tracking</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Track your mechanic's location and ETA in real-time. Know exactly when help will arrive.
                            </p>
                        </Card>

                        {/* Feature 5 */}
                        <Card className="p-8 h-full group hover:border-red-200">
                            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm border border-red-100">
                                🚨
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">Emergency Ready</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Available 24/7 for emergencies. Whether it's a flat tire at midnight or engine trouble on a weekend.
                            </p>
                        </Card>

                        {/* Feature 6 */}
                        <Card className="p-8 h-full group hover:border-teal-200">
                            <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm border border-teal-100">
                                💬
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">Live Support</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Get instant help from our support team. Chat, call, or message us anytime you need assistance.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-24 px-4 bg-gray-900 relative overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-electric-900 rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900 rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>

                <div className="relative max-w-4xl mx-auto text-center text-white z-10 transition-all">
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                        Ready to hit the road?
                    </h2>
                    <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who trust Break Down Buddy for their roadside assistance needs.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a href="/find" className="w-full sm:w-auto">
                            <Button size="lg" className="rounded-full px-10 h-14 w-full sm:w-auto text-lg bg-white text-gray-900 hover:bg-gray-100 border-0">
                                Get Help Now
                            </Button>
                        </a>
                        <a href="/mechanic" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="rounded-full px-10 h-14 w-full sm:w-auto text-lg border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-600">
                                Become a Mechanic
                            </Button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Home