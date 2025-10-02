import { useState } from "react";
import axios from "axios";


// Let's "desctucture" the props to get the setToken function passed from App.jsx
function Login({ setToken }){

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
            const accessToken = response.data.access;

            // Save the token to the browser's local storage which makes it persist across page reloads
            localStorage.setItem('accessToken', accessToken)

            // Update the parent component's state by calling the passed-in function which triggers the conditional rendering in App.jsx
            setToken(accessToken);


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