import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div>
            <ul>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/dashboard">Dashboard</Link>
            </ul>
        </div>
    );
}