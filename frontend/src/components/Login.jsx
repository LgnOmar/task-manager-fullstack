import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import apiClient from "../api";

// "desctucture" the props to get the setToken function passed from App.jsx
function Login({ setToken }){

    // Give the component memory for the username and password input
    // the initial values are empty strings.

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State for error messages

    //this function is called when the user submits the form
    const handleSubmit = async (event) =>{
        
        // stop the browser's default behavior of reloading the page on form submission.
        event.preventDefault();
        setError(null); // Clear previous errors
        try {
            // MAke the API POST request to the token endpoint
            const response = await apiClient.post('/api/token/',{
                username: username,
                password: password,
            });
            const accessToken = response.data.access;

            // Save the token to the browser's local storage which makes it persist across page reloads
            localStorage.setItem('accessToken', accessToken)

            // Update the parent component's state by calling the passed-in function which triggers the conditional rendering in App.jsx
            setToken(accessToken);


        } catch (error) {
            console.error('Login failed:', error)
            setError('Invalid username or password.'); // Set user-friendly error
        }
    };


    return (
        <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
            {/* Display error message if it exists */}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <div className="mt-1">
                <input
                id="username"
                type="text"
                required
                placeholder="Enter your username"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
            </div>
            </div>
            <div>
            <label htmlFor="password-input" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1">
                <input
                id="password-input"
                type="password"
                required
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            </div>
            <div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Sign in
            </button>
            </div>
        </form>
          <p className="mt-4 text-center text-sm">
            Don't have an account? {' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
    );
}

export default Login;