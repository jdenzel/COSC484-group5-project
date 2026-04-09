import HeroImage from "../assets/hero-img.png";
import "./styles/Register.css";

export default function Register() {
    return (
        <section id="register">

            <div className="register-container">

                <div className="register-description">

                    <h1>Create Your Account</h1>

                    <p>
                        Start managing your finances smarter. Track spending,
                        create budgets, and gain financial insights all in one place.
                    </p>

                    <form className="register-form">

                        <div className="name-row">
                            <input type="text" placeholder="First Name" required/>
                            <input type="text" placeholder="Last Name" required/>
                        </div>

                        <input type="text" placeholder="Username" required/>

                        <input type="email" placeholder="Email" required/>

                        <input type="password" placeholder="Password" required/>

                        <input type="password" placeholder="Confirm Password" required/>

                        <button className="btn btn-secondary">
                            Register
                        </button>
                    </form>
                </div>
                <div className="register-img-container">
                    <img src={HeroImage} />
                </div>
            </div>
        </section>
    );
}