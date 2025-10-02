import { useState } from "react";
import axios from "axios";


function Login(){

    // Give the component memory for the username and password input
    // the initial values are empty strings.

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //this function is called when the user submits the form
    const handleSubmit = async (event) =>{
        
        // stop the browser's default behavior of reloading the page on form submission.
        event.preventDefault();
        try {
            // MAke the API POST request to the token endpoint
            const response = await axios.post('http://127.0.0.1:8000/api/token/',{
                username: username,
                password: password,
            });

            //for now we just log the entire response to see the token
            console.log('Login successful:', response.data);

            //solving the token will do it later

        } catch (error) {
            console.error('Login failed:', error)
        }
    };


    return (

        // when this form is submitted, it will call our handleSubmit function.
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <input 
                type="text" 
                placeholder="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <input 
                type="text" 
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type="submit">Login</button>
        </form>
    );
}

export default Login;