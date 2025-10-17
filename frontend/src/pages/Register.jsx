import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api';

function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            await apiClient.post('/api/users/register/', {
                username: username,
                password: password,
            });
            // On success, navigate the user to the login page
            navigate('/login');
        } catch (error) {
            console.error('Registrationfailed: ', error);
            setError('Failed to create account. Please try a different username.');
        }
    };
    return(
        <div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Create Account
                </h2>
                {error && <p className="text-red-500 text-sm text-center">
                    {error}</p>}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <div className="mt-1">
                            <input 
                              id="username"
                              type="text"
                              required
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password-input" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1">
                            <input 
                              id="password-input"
                              type="password"
                              required
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                          type="submit"
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Register
                        </button>
                    </div>
            </form>
        </div>
    )
}

export default Register;