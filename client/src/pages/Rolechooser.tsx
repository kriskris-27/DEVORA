import { useNavigate } from "react-router-dom";

export default function RoleChooser() {
  const navigate = useNavigate();

  const handleChoice = (role: "user" | "mechanic") => {
    if (role === "user") {
      navigate("/home");
    } else if (role === "mechanic") {
      navigate("/mechanic");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Choose your role</h1>
      <div className="space-x-4">
        <button
          onClick={() => handleChoice("user")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow"
        >
          Show station near me
        </button>
        <button
          onClick={() => handleChoice("mechanic")}
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow"
        >
          I am a Mechanic
        </button>
      </div>
    </div>
  );
}
