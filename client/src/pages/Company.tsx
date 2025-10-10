export default function Company() {
  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '2K+', label: 'Verified Mechanics' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ]

  const values = [
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'We continuously innovate to provide the best roadside assistance experience through cutting-edge technology.'
    },
    {
      icon: '🤝',
      title: 'Trust',
      description: 'We build trust through transparency, verified mechanics, and reliable service that our customers can count on.'
    },
    {
      icon: '⚡',
      title: 'Speed',
      description: 'We understand that breakdowns are urgent. Our platform is designed for quick response and fast service delivery.'
    },
    {
      icon: '🛡️',
      title: 'Safety',
      description: 'Safety is our top priority. All mechanics are background-checked and insured for your peace of mind.'
    },
    {
      icon: '💡',
      title: 'Simplicity',
      description: 'We make roadside assistance simple and accessible to everyone, regardless of technical knowledge.'
    },
    {
      icon: '🌍',
      title: 'Community',
      description: 'We believe in building a community where mechanics and customers support each other for mutual benefit.'
    }
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '👩‍💼',
      bio: 'Former automotive engineer with 15+ years experience in the industry.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '👨‍💻',
      bio: 'Tech veteran who previously led engineering teams at major tech companies.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      image: '👩‍🔧',
      bio: 'Operations expert with deep knowledge of the automotive service industry.'
    },
    {
      name: 'David Kim',
      role: 'Head of Customer Success',
      image: '👨‍💼',
      bio: 'Customer-focused leader with a passion for delivering exceptional experiences.'
    }
  ]

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About Break Down Buddy
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're revolutionizing roadside assistance by connecting drivers with verified mechanics 
            in real-time, making breakdowns less stressful and more manageable.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="glass p-6 rounded-2xl text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Our Story */}
        <div className="glass p-8 rounded-2xl mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-6">
              Break Down Buddy was born from a simple yet powerful idea: what if getting help during 
              a vehicle breakdown could be as easy as ordering food delivery? Our founders experienced 
              the frustration of being stranded on the side of the road, waiting hours for help, 
              and dealing with unreliable service providers.
            </p>
            <p className="mb-6">
              Founded in 2023, we set out to create a platform that would connect drivers with 
              trusted, verified mechanics in real-time. We believe that everyone deserves quick, 
              reliable, and transparent roadside assistance, regardless of where they are or what 
              time it is.
            </p>
            <p>
              Today, we're proud to serve thousands of customers across the country, with a network 
              of skilled mechanics who share our commitment to excellence and customer satisfaction.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="glass p-6 rounded-2xl text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="glass p-6 rounded-2xl text-center">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <div className="text-blue-600 font-medium mb-3">
                  {member.role}
                </div>
                <p className="text-gray-600 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="glass p-8 rounded-2xl">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To make roadside assistance accessible, reliable, and stress-free for every driver, 
              while creating meaningful opportunities for skilled mechanics to grow their businesses 
              and serve their communities.
            </p>
          </div>
          <div className="glass p-8 rounded-2xl">
            <div className="text-4xl mb-4">🔮</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To become the leading platform for roadside assistance, setting the standard for 
              quality, reliability, and customer satisfaction while building a community that 
              supports both drivers and mechanics.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="glass p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Journey
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether you're a driver looking for reliable roadside assistance or a mechanic 
              wanting to grow your business, we'd love to have you as part of our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/mechanic" className="btn btn-primary">
                Become a Mechanic
              </a>
              <a href="/contact" className="btn btn-ghost">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
