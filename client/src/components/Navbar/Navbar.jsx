import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div className='navbar'>
            <div className='navbar-links'>
                <h5><Link to="/">Financial-T</Link></h5>
                {token && <Link to="/dashboard">Dashboard</Link>}
            </div>
            <div className='navbar-menu'>
                {token ? (
                    <button className='logout-btn' onClick={handleLogout}>Logout</button>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
}