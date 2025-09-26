function Home() {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Welcome</h1>
        <p className="text-gray-600 mt-2">Users can enter directly. Mechanics please sign in.</p>
        <a className="text-blue-600 underline mt-4 inline-block" href="/mechanic">Mechanic portal</a>
      </div>
    )
  }
 export default Home