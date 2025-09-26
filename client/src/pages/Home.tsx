function Home() {
    return (
      <div className="min-h-screen px-4 py-10">
        <div className="max-w-5xl mx-auto glass p-8 text-center animate-[fadeIn_300ms_ease-out]">
          <h1 className="text-4xl font-semibold">BREAK DOWN BUDDY</h1>
          <p className="text-gray-700 mt-3">Instant mechanic assistance. Get help fast wherever you are.</p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a className="btn btn-primary" href="/find">Find mechanics near me</a>
            <a className="btn btn-ghost" href="/mechanic">Mechanic portal</a>
          </div>
        </div>
      </div>
    )
  }
 export default Home