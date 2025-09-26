export default function Footer() {
  return (
    <footer className="mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600">
        <div className="flex items-center justify-between">
          <div>© {new Date().getFullYear()} BREAK DOWN BUDDY</div>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Contact</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}


