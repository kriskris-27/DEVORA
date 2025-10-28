import { useState } from 'react'

export default function Grievance() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderId: '',
    grievanceType: 'service',
    priority: 'medium',
    description: '',
    resolution: '',
    attachments: ''
  })

  const grievanceTypes = [
    { value: 'service', label: 'Service Quality Issue' },
    { value: 'billing', label: 'Billing Dispute' },
    { value: 'mechanic', label: 'Mechanic Behavior' },
    { value: 'safety', label: 'Safety Concern' },
    { value: 'refund', label: 'Refund Request' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'other', label: 'Other' }
  ]

  const priorityLevels = [
    { value: 'low', label: 'Low - General inquiry or minor issue' },
    { value: 'medium', label: 'Medium - Service quality or billing issue' },
    { value: 'high', label: 'High - Safety concern or major service failure' },
    { value: 'urgent', label: 'Urgent - Immediate safety or legal concern' }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Grievance submitted:', formData)
    alert('Your grievance has been submitted. We will respond within 24 hours.')
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Customer Grievance Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are committed to resolving your concerns promptly and fairly. Your feedback helps us improve our services and ensures the highest quality experience for all our customers.
          </p>
        </div>

        {/* Policy Overview */}
        <div className="glass p-8 rounded-2xl mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What We Promise</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Timely acknowledgment of all grievances within 2 hours</li>
                <li>Fair and impartial investigation by our dedicated team</li>
                <li>Transparent communication throughout the entire process</li>
                <li>Appropriate resolution and compensation when warranted</li>
                <li>Follow-up to ensure your complete satisfaction</li>
                <li>Continuous improvement based on your feedback</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Response Times</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Urgent Issues</span>
                  <span className="font-semibold text-red-600">&lt; 2 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">High Priority</span>
                  <span className="font-semibold text-orange-600">&lt; 24 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Medium Priority</span>
                  <span className="font-semibold text-blue-600">&lt; 3 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Low Priority</span>
                  <span className="font-semibold text-green-600">&lt; 7 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grievance Process */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Grievance Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit</h3>
              <p className="text-gray-600 text-sm">
                Submit your grievance through our form or contact channels
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Acknowledge</h3>
              <p className="text-gray-600 text-sm">
                We acknowledge receipt and assign a tracking number
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Investigate</h3>
              <p className="text-gray-600 text-sm">
                Our team investigates the matter thoroughly and fairly
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Resolve</h3>
              <p className="text-gray-600 text-sm">
                We provide a resolution and implement corrective measures
              </p>
            </div>
          </div>
        </div>

        {/* Grievance Form */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Submit a Grievance</h2>
          <div className="glass p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input w-full"
                    required
                  />
                </div>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order/Service ID
                  </label>
                  <input
                    type="text"
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="If applicable"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grievance Type *
                  </label>
                  <select
                    name="grievanceType"
                    value={formData.grievanceType}
                    onChange={handleChange}
                    className="input w-full"
                    required
                  >
                    {grievanceTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level *
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="input w-full"
                    required
                  >
                    {priorityLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  className="input w-full resize-none"
                  placeholder="Please provide a detailed description of your grievance, including dates, times, and any relevant information..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desired Resolution
                </label>
                <textarea
                  name="resolution"
                  value={formData.resolution}
                  onChange={handleChange}
                  rows={3}
                  className="input w-full resize-none"
                  placeholder="What resolution would you like to see? (Optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supporting Documents
                </label>
                <input
                  type="file"
                  name="attachments"
                  className="input w-full"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  multiple
                />
                <p className="text-sm text-gray-500 mt-1">
                  You can attach photos, receipts, or other relevant documents (PDF, JPG, PNG, DOC)
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Notice</h4>
                <p className="text-sm text-yellow-700">
                  By submitting this grievance, you acknowledge that you have provided accurate 
                  information and understand that false statements may result in legal consequences. 
                  We will investigate your complaint thoroughly and respond within the specified timeframes.
                </p>
              </div>

              <button
                type="submit"
                className="w-full btn btn-primary"
              >
                Submit Grievance
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass p-6 rounded-2xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Grievance Officer</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <div className="font-medium text-gray-900">Email</div>
                  <div className="text-blue-600">grievance@breakdownbuddy.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <div>
                  <div className="font-medium text-gray-900">Phone</div>
                  <div className="text-blue-600">+1 (555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🕒</span>
                <div>
                  <div className="font-medium text-gray-900">Hours</div>
                  <div className="text-gray-600">Mon-Fri: 9 AM - 6 PM PST</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Escalation Process</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <div className="font-medium text-gray-900">Level 1</div>
                  <div className="text-gray-600 text-sm">Customer Service Representative</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">2️⃣</span>
                <div>
                  <div className="font-medium text-gray-900">Level 2</div>
                  <div className="text-gray-600 text-sm">Grievance Officer</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">3️⃣</span>
                <div>
                  <div className="font-medium text-gray-900">Level 3</div>
                  <div className="text-gray-600 text-sm">Management Review</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
