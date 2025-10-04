
import { useState,useEffect } from "react"
import Login from "./components/Login"
import TaskList from "./components/TaskList";


function App(){
  const [token, setToken] = useState(null);


  // --- useEffect Hook for Initial Load ---
  // This code runs ONLY ONCE at mount, the empty dependency array [] at the end ensures it only runs on mount.
  useEffect(() => {
    // check the user's localStorage for a token.
    const storedToken = localStorage.getItem('accessToken');

    if (storedToken){
      setToken(storedToken);
    }
  }, []); // the empty [] means this effect runs once on component mount.

  // --- Logout Handler ---
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('accessToken');

    // Update application state when logged out.
    setToken(null);
  };

  //Conditional Rendering: if we DO NOT have a token, show the login component.
  if (!token) {
    //pass down the setToken function to the Login component as a prop
    return(
      <div>
        <Login setToken={setToken} />
      </div>
    );
  }

  //If we DO have a token, show a welcome message.
// in App.jsx
  return (
    <div className="bg-slate-900 text-white min-h-screen p-8"> 
      <TaskList />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}


export default App;