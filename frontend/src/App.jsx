import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import Register from "./pages/Register";

function App() {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const navigate = useNavigate();
  const location = useLocation();

  const setAndStoreToken = (newToken) =>{
    localStorage.setItem('accessToken', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
  };

  useEffect(()=>{
    if (token && (location.pathname === '/login' || location.pathname === '/register')) {
  navigate('/'); //if logged in then redirect from login/register to home      
    }

    if (!token && location.pathname === '/') {
      navigate('/login'); //if not logged in and on home then redirect to login
    }
  }, [token, location, navigate]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Routes>
        <Route path="/" element={
          token ? (
            <div className="pt-8">
              <TaskList />
              <div className="flex justify-center mt-8">
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Logout
                </button>
              </div>
            </div>
          ) : null // or a loading spinner
        }/>
        <Route path="/login" element={
          <div className="flex items-center justify-center h-screen">
            <Login setToken={setAndStoreToken} />
          </div>
        }/>
        <Route path="/register" element={
          <div className="flex items-center justify-center h-screen">
            <Register />
          </div>
        }/>
      </Routes>
    </div>
  );
}

export default App;