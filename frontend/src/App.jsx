import { useState, useEffect } from "react";
import Login from "./components/Login";
import TaskList from "./components/TaskList";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
  };

  // --- LOGGED-OUT VIEW ---
  // This block is now CORRECT. It ONLY renders the Login component.
  if (!token) {
    return (
      // We apply a base style for the entire application here
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <Login setToken={setToken} />
      </div>
    );
  }

  // --- LOGGED-IN VIEW ---
  // This is our main application view
  return (
    <div className="min-h-screen bg-slate-100 pt-8">
      <TaskList />
      {/* We will move the logout button into a proper header later */}
      <div className="flex justify-center mt-8">
         <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
         >
          Logout
        </button>
      </div>
    </div>
  );
}

export default App;