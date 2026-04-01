import { Link } from 'react-router-dom';
import "./Navbar.css";

export default function Navbar() {
    return (
        <div className='navbar'>
            <div className='navbar-links'>
                <h5><Link to="/">Financial-T</Link></h5>
                
                <Link to="/dashboard">Dashboard</Link>
                
            </div>
            <div className='navbar-menu'>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
}