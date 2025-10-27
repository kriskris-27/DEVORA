import { useState } from 'react'

export default function Support() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const supportCategories = [
    { id: 'technical', label: 'Technical Issues', icon: '🔧' },
    { id: 'billing', label: 'Billing & Payments', icon: '💳' },
    { id: 'account', label: 'Account Issues', icon: '👤' },
    { id: 'service', label: 'Service Quality', icon: '⭐' },
    { id: 'emergency', label: 'Emergency Support', icon: '🚨' },
    { id: 'other', label: 'Other', icon: '❓' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCategory || !message.trim()) return
    
    // Here you would typically send the support request to your backend
    console.log('Support request:', { category: selectedCategory, message })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="glass p-8 text-center animate-[fadeIn_300ms_ease-out]">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✅</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Support Request Submitted</h1>
            <p className="text-gray-600 mb-6">
              Thank you for contacting us! We've received your support request and will get back to you within 24 hours.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="btn btn-primary"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Support Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help! Get assistance with your Break Down Buddy experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Support Form */}
          <div className="lg:col-span-2">
            <div className="glass p-8 rounded-2xl">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What can we help you with?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {supportCategories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedCategory === category.id
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <div className="text-sm font-medium">{category.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your issue
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Please provide as much detail as possible about your issue..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={!selectedCategory || !message.trim()}
                  className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Support Request
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <div className="font-medium text-gray-900">Emergency Hotline</div>
                    <div className="text-blue-600 font-semibold">+1 (313) 555-0123</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <div className="font-medium text-gray-900">Email Support</div>
                    <div className="text-blue-600">support@breakdownbuddy.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💬</span>
                  <div>
                    <div className="font-medium text-gray-900">Live Chat</div>
                    <div className="text-green-600">Available 24/7</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Times */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Response Times</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Emergency</span>
                  <span className="font-semibold text-red-600">&lt; 5 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Technical Issues</span>
                  <span className="font-semibold text-orange-600">&lt; 2 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">General Support</span>
                  <span className="font-semibold text-blue-600">&lt; 24 hours</span>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Help</h3>
              <p className="text-gray-600 mb-4">
                Check our FAQ for instant answers to common questions.
              </p>
              <a href="/faq" className="btn btn-ghost w-full">
                View FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
