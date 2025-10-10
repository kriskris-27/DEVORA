import { useState } from 'react'

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'tips', label: 'Car Care Tips' },
    { id: 'safety', label: 'Safety' },
    { id: 'news', label: 'Company News' },
    { id: 'technology', label: 'Technology' }
  ]

  const blogPosts = [
    {
      id: 1,
      title: '10 Essential Car Maintenance Tips Every Driver Should Know',
      excerpt: 'Keep your vehicle running smoothly with these expert maintenance tips that can save you time and money.',
      category: 'tips',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      readTime: '5 min read',
      image: '🔧',
      featured: true
    },
    {
      id: 2,
      title: 'What to Do When Your Car Breaks Down on the Highway',
      excerpt: 'Stay safe and get help quickly with our step-by-step guide for handling highway breakdowns.',
      category: 'safety',
      author: 'Michael Chen',
      date: '2024-01-12',
      readTime: '7 min read',
      image: '🛣️',
      featured: false
    },
    {
      id: 3,
      title: 'Break Down Buddy Reaches 50,000 Happy Customers Milestone',
      excerpt: 'We\'re excited to announce that we\'ve helped over 50,000 drivers get back on the road safely.',
      category: 'news',
      author: 'Emily Rodriguez',
      date: '2024-01-10',
      readTime: '3 min read',
      image: '🎉',
      featured: true
    },
    {
      id: 4,
      title: 'How AI is Revolutionizing Roadside Assistance',
      excerpt: 'Discover how artificial intelligence is making roadside assistance faster and more efficient.',
      category: 'technology',
      author: 'David Kim',
      date: '2024-01-08',
      readTime: '6 min read',
      image: '🤖',
      featured: false
    },
    {
      id: 5,
      title: 'Winter Driving Safety: Preparing Your Vehicle for Cold Weather',
      excerpt: 'Essential tips to prepare your car for winter conditions and stay safe on icy roads.',
      category: 'safety',
      author: 'Sarah Johnson',
      date: '2024-01-05',
      readTime: '8 min read',
      image: '❄️',
      featured: false
    },
    {
      id: 6,
      title: 'The Future of Electric Vehicle Roadside Assistance',
      excerpt: 'How we\'re adapting our services to support the growing number of electric vehicles on the road.',
      category: 'technology',
      author: 'Michael Chen',
      date: '2024-01-03',
      readTime: '5 min read',
      image: '⚡',
      featured: false
    },
    {
      id: 7,
      title: 'Common Car Problems and How to Diagnose Them',
      excerpt: 'Learn to identify common vehicle issues before they become major problems.',
      category: 'tips',
      author: 'Emily Rodriguez',
      date: '2024-01-01',
      readTime: '9 min read',
      image: '🔍',
      featured: false
    },
    {
      id: 8,
      title: 'Introducing Our New 24/7 Emergency Response Team',
      excerpt: 'Meet the dedicated team that ensures help is always available when you need it most.',
      category: 'news',
      author: 'David Kim',
      date: '2023-12-28',
      readTime: '4 min read',
      image: '🚨',
      featured: false
    }
  ]

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Break Down Buddy Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest in automotive care, safety tips, and company news
          </p>
        </div>

        {/* Featured Posts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <article key={post.id} className="glass p-6 rounded-2xl card-hover">
                <div className="text-4xl mb-4">{post.image}</div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <a 
                  href={`/blog/${post.id}`}
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  Read more →
                </a>
              </article>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="glass p-6 rounded-2xl card-hover">
              <div className="text-3xl mb-4">{post.image}</div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <span>{post.author}</span>
                <span>•</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {post.excerpt}
              </p>
              <a 
                href={`/blog/${post.id}`}
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm"
              >
                Read more →
              </a>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <div className="glass p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss the latest tips, news, and updates from Break Down Buddy.
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="btn btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
