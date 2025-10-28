import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl px-10 py-12 flex flex-col items-center max-w-lg w-full mx-4">
        {/* SVG Icon */}
        <div className="mb-5">
          <svg width="72" height="72" fill="none" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
            <circle cx="36" cy="36" r="36" fill="#e0e7ff" />
            <ellipse cx="46" cy="38.5" rx="3.5" ry="2.5" fill="#6366f1" />
            <ellipse cx="26" cy="38.5" rx="3.5" ry="2.5" fill="#6366f1" />
            <ellipse cx="36" cy="49" rx="7" ry="4" fill="#6366f1" fillOpacity=".3"/>
            <circle cx="26" cy="30" r="4" fill="#6366f1" />
            <circle cx="46" cy="30" r="4" fill="#6366f1" />
          </svg>
        </div>
        <h1 className="text-6xl font-black mb-2 text-gray-900">404</h1>
        <p className="text-xl text-gray-700 font-medium mb-6 text-center max-w-xs">
          Page not found. The URL you entered does not exist.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-full shadow-md bg-blue-600 text-white text-lg font-semibold transition hover:bg-blue-700 focus:bg-blue-800 focus:outline-none"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;


