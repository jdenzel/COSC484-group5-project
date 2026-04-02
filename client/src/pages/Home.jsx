import HeroImage from '../assets/hero-img.png';
import "./styles/Home.css"

export default function Home() {
    return (
        <section id="home">
            <div className="hero">
                <div className="hero-description-container">
                    <h1>Finance Management</h1>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    <div className="hero-cta-btn">
                        <button className="btn btn-secondary">Learn More</button>
                        <button className="btn btn-outline">Get In Touch</button>
                    </div>
                </div>
                <div className="hero-img-container">
                    <img src={HeroImage} />
                </div>
            </div>

            <div className="features">
                <h3>F-T Features</h3>
            </div>
        </section>
    );
}