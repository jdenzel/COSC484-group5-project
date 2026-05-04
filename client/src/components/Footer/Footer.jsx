import { Link } from 'react-router-dom';
import "./Footer.css";

export default function Footer() {
    return (
        <div className='footer'>
            <div className='footer-links'>
                <h5><Link to="/">MoMoney</Link></h5>
            </div>
        </div>
    );
}