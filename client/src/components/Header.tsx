export default function Header() {
  return (
    <header className="sticky top-0 z-40">
      <div className="backdrop-blur-md bg-white/50 border-b border-white/30">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="font-semibold tracking-wide">BREAK DOWN BUDDY</a>
          <nav className="flex items-center gap-2">
            <a className="btn btn-ghost" href="/find">Find help</a>
            <a className="btn btn-primary" href="/mechanic">Mechanic portal</a>
          </nav>
        </div>
      </div>
    </header>
  )
}


