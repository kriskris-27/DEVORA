import { useState } from 'react'

export default function Partners() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    partnershipType: 'strategic',
    description: '',
    message: ''
  })

  const partnershipTypes = [
    { value: 'strategic', label: 'Strategic Partnership' },
    { value: 'technology', label: 'Technology Integration' },
    { value: 'marketing', label: 'Marketing Collaboration' },
    { value: 'distribution', label: 'Distribution Partnership' },
    { value: 'service', label: 'Service Provider' },
    { value: 'other', label: 'Other' }
  ]

  const currentPartners = [
    {
      name: 'AutoZone',
      logo: '🏪',
      description: 'Strategic retail partnership for automotive parts and supplies',
      category: 'Retail'
    },
    {
      name: 'AAA',
      logo: '🚗',
      description: 'Cross-platform integration for enhanced roadside assistance',
      category: 'Insurance'
    },
    {
      name: 'Google Maps',
      logo: '🗺️',
      description: 'Advanced mapping and navigation integration',
      category: 'Technology'
    },
    {
      name: 'PayPal',
      logo: '💳',
      description: 'Secure payment processing and financial services',
      category: 'Fintech'
    },
    {
      name: 'Verizon',
      logo: '📡',
      description: 'Reliable communication infrastructure and IoT solutions',
      category: 'Telecommunications'
    },
    {
      name: 'State Farm',
      logo: '🛡️',
      description: 'Insurance coverage and risk management solutions',
      category: 'Insurance'
    }
  ]

  const benefits = [
    {
      icon: '📈',
      title: 'Increased Revenue',
      description: 'Access to our growing customer base and expand your business reach'
    },
    {
      icon: '🤝',
      title: 'Strategic Collaboration',
      description: 'Work together to create innovative solutions and mutual growth opportunities'
    },
    {
      icon: '📊',
      title: 'Data Insights',
      description: 'Gain valuable market insights and customer behavior analytics'
    },
    {
      icon: '🔧',
      title: 'Technical Support',
      description: 'Comprehensive API documentation and dedicated technical support'
    },
    {
      icon: '📢',
      title: 'Marketing Support',
      description: 'Co-marketing opportunities and brand visibility enhancement'
    },
    {
      icon: '⚡',
      title: 'Quick Integration',
      description: 'Streamlined onboarding process and fast time-to-market'
    }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Partnership inquiry submitted:', formData)
    alert('Thank you for your interest! We\'ll get back to you within 2 business days.')
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            GoMechanic Partners
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our ecosystem of trusted partners and grow your business with Break Down Buddy
          </p>
        </div>

        {/* Partnership Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Partner With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="glass p-6 rounded-2xl text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Current Partners */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Current Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPartners.map((partner, index) => (
              <div key={index} className="glass p-6 rounded-2xl text-center">
                <div className="text-4xl mb-4">{partner.logo}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {partner.name}
                </h3>
                <div className="text-blue-600 font-medium mb-3">
                  {partner.category}
                </div>
                <p className="text-gray-600 text-sm">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Partnership Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Technology Partners</h3>
              <p className="text-gray-600 mb-4">
                Integrate your technology solutions with our platform to enhance user experience 
                and create innovative features.
              </p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>API integrations</li>
                <li>Data sharing agreements</li>
                <li>Co-development opportunities</li>
                <li>Technical support</li>
              </ul>
            </div>
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Service Partners</h3>
              <p className="text-gray-600 mb-4">
                Provide specialized services to our customers and expand your business through 
                our trusted platform.
              </p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Service provider network</li>
                <li>Quality assurance programs</li>
                <li>Revenue sharing models</li>
                <li>Marketing support</li>
              </ul>
            </div>
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Strategic Partners</h3>
              <p className="text-gray-600 mb-4">
                Form long-term strategic alliances to drive mutual growth and market expansion.
              </p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Joint ventures</li>
                <li>Market expansion</li>
                <li>Cross-promotion</li>
                <li>Shared resources</li>
              </ul>
            </div>
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Marketing Partners</h3>
              <p className="text-gray-600 mb-4">
                Collaborate on marketing initiatives to reach new audiences and increase brand awareness.
              </p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Co-marketing campaigns</li>
                <li>Event partnerships</li>
                <li>Content collaboration</li>
                <li>Referral programs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Partnership Form */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Become a Partner</h2>
          <div className="glass p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    className="input w-full"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partnership Type *
                  </label>
                  <select
                    name="partnershipType"
                    value={formData.partnershipType}
                    onChange={handleChange}
                    className="input w-full"
                    required
                  >
                    {partnershipTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="input w-full resize-none"
                  placeholder="Tell us about your company and what you do..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partnership Proposal *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="input w-full resize-none"
                  placeholder="Describe your partnership proposal and how we can work together..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full btn btn-primary"
              >
                Submit Partnership Inquiry
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center">
          <div className="glass p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Questions About Partnerships?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our partnership team is here to help you explore opportunities and answer any questions you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:partnerships@breakdownbuddy.com" className="btn btn-primary">
                Email Partnerships Team
              </a>
              <a href="/contact" className="btn btn-ghost">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
