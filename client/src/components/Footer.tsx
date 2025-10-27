export default function Footer() {
  return (
    <footer className="mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600">
        <div className="flex items-center justify-between">
          <div>© {new Date().getFullYear()} BREAK DOWN BUDDY</div>
          <div className="flex gap-4">
            <a href="/contact" className="hover:underline hover:text-blue-600 transition-colors">Contact</a>
            <a href="/privacy" className="hover:underline hover:text-blue-600 transition-colors">Privacy</a>
            <a href="/terms" className="hover:underline hover:text-blue-600 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}


