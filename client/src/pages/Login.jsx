import { useNavigate } from 'react-router-dom';
import "./styles/Login.css";

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // stop refresh
        //test until database is linked and usable. code below is for DB integration
        navigate('/dashboard');

        // //will need to check backend for form data match
        // //create obj with form data
        // const formData = new FormData(e.target);
        // const data = Object.fromEntries(formData);

        // //send data to the backend and wait for response for match
        // const response = await fetch('http://localhost:5000/api/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });

        // //if response is match say success and go to dashboard if not tell user to try again
        // if (response.ok){
        //     console.log("Success! Redirecting to Dashboard...");
        //     navigate('/dashboard');
        // }
        // else {
        //     alert("Login failed. Please try again with different credentials.");
        // }

    };

    return (
        <section id="login-page">
            <div id="logInText">
                <h1>Log In</h1>           
            </div>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>

                <button type="submit" className="btn-primary">Sign In</button>
            </form>            
        </section>
    );
}