import { useState } from 'react'

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const faqData = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How do I sign up for Break Down Buddy?',
          answer: 'Signing up is easy! Simply click the "Sign Up" button on our homepage, choose your role (user or mechanic), and follow the registration process. You\'ll need to provide your email address and create a password.'
        },
        {
          question: 'Is Break Down Buddy free to use?',
          answer: 'Yes, creating an account and browsing mechanics is completely free. We only charge when you actually book a service. Our pricing is transparent and shown upfront before you confirm any booking.'
        },
        {
          question: 'What areas do you cover?',
          answer: 'We currently cover major cities across the United States and are rapidly expanding. You can check if we\'re available in your area by entering your location on our homepage.'
        }
      ]
    },
    {
      category: 'For Users',
      questions: [
        {
          question: 'How quickly can I get help?',
          answer: 'Our average response time is under 5 minutes! We have a network of verified mechanics who are available 24/7. In emergency situations, we prioritize getting you help as quickly as possible.'
        },
        {
          question: 'How do I find mechanics near me?',
          answer: 'Simply go to our "Find Mechanics" page and allow location access, or manually enter your location. You\'ll see a map with nearby mechanics, their ratings, specialties, and estimated arrival times.'
        },
        {
          question: 'Are the mechanics verified and trustworthy?',
          answer: 'Absolutely! All our mechanics undergo thorough background checks, license verification, and are rated by real customers. We also provide insurance coverage for all services performed through our platform.'
        },
        {
          question: 'What if I\'m not satisfied with the service?',
          answer: 'We stand behind our service quality. If you\'re not satisfied, contact our support team within 24 hours and we\'ll work to resolve the issue, including refunds when appropriate.'
        },
        {
          question: 'Can I track my mechanic\'s location?',
          answer: 'Yes! Once your mechanic is assigned, you\'ll receive real-time updates on their location and estimated arrival time. You can track them through our app or receive SMS updates.'
        }
      ]
    },
    {
      category: 'For Mechanics',
      questions: [
        {
          question: 'How do I become a Break Down Buddy mechanic?',
          answer: 'Visit our mechanic portal, sign up with your email, and complete our onboarding process. You\'ll need to provide your license information, insurance details, and complete a background check.'
        },
        {
          question: 'What are the requirements to join?',
          answer: 'You need a valid mechanic\'s license, current insurance, a reliable vehicle, and must pass our background check. We also require at least 2 years of professional experience.'
        },
        {
          question: 'How do I get paid?',
          answer: 'We handle all payments through our secure platform. You\'ll receive payments weekly via direct deposit, and we provide detailed earnings reports for your records.'
        },
        {
          question: 'Can I set my own schedule?',
          answer: 'Yes! You have complete control over when you\'re available. Simply update your availability in your dashboard, and we\'ll only send you requests during your active hours.'
        }
      ]
    },
    {
      category: 'Billing & Payments',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely through our encrypted payment system.'
        },
        {
          question: 'When will I be charged?',
          answer: 'You\'re only charged after the service is completed and you confirm satisfaction. We hold the payment securely until the job is done to your satisfaction.'
        },
        {
          question: 'Can I get a receipt?',
          answer: 'Yes! You\'ll receive a detailed receipt via email immediately after payment, and you can access all your receipts in your account dashboard.'
        },
        {
          question: 'What if there are additional charges?',
          answer: 'Any additional charges must be approved by you before work begins. We\'ll send you a detailed estimate, and you can approve or decline before any extra work is performed.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'The app isn\'t working properly. What should I do?',
          answer: 'Try refreshing the page or restarting the app. If the issue persists, contact our technical support team at support@breakdownbuddy.com or call our hotline for immediate assistance.'
        },
        {
          question: 'I can\'t find my location on the map. Help!',
          answer: 'Make sure location services are enabled in your browser settings. You can also manually enter your address or use the "Share Location" feature to pinpoint your exact position.'
        },
        {
          question: 'How do I update my profile information?',
          answer: 'Log into your account, go to "Profile Settings," and update any information you need to change. Don\'t forget to save your changes!'
        }
      ]
    }
  ]

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const filteredData = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers to common questions about Break Down Buddy
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="space-y-8">
          {filteredData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="glass p-6 rounded-2xl">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((item, itemIndex) => {
                  const globalIndex = faqData.slice(0, categoryIndex).reduce((acc, cat) => acc + cat.questions.length, 0) + itemIndex
                  const isOpen = openItems.includes(globalIndex)
                  
                  return (
                    <div key={itemIndex} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 pr-4">
                          {item.question}
                        </span>
                        <span className={`text-2xl transition-transform duration-200 ${
                          isOpen ? 'rotate-45' : ''
                        }`}>
                          +
                        </span>
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <div className="text-gray-600 leading-relaxed">
                            {item.answer}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <div className="glass p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/support" className="btn btn-primary">
                Contact Support
              </a>
              <a href="/contact" className="btn btn-ghost">
                Send us a Message
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
