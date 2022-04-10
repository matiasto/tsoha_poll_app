import { useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import axios from "axios";

const SignIn = props => {
    const [signInForm, setSignInForm] = useState({ email: "", password: "" });
    const [pending, setPending] = useState(true);
    const [pendingMsg, setPendingMsg] = useState("Loading...");

    const submitLogin = async (e) => {
        e.preventDefault();
        try {
            setPendingMsg("Signing in...");
            setPending(true);
            const config = {
                method: "post",
                url: "/api/signin",
                data: signInForm,
            };
            const result = await axios(config);
            props.setToken(Cookies.get('csrf_access_token'));
        } catch(error) {
            console.log(error);
        } finally {
            setPending(false);
        }
    }

    const handleChange = e => {
        const { value, name } = e.target;
        setSignInForm(old => ({
            ...old, [name]: value
        }))
    }

    return (
        <div>
            <h1>Login</h1>
                <form className="login">
                    <input 
                        type="email"
                        text={signInForm.email}
                        name="email"
                        placeholder="email"
                        value={signInForm.email}
                        onChange={handleChange} />
                    <input
                        type="password"
                        text={signInForm.password}
                        name="password"
                        placeholder="password"
                        value={signInForm.password}
                        onChange={handleChange} />
                    <button onClick={e => submitLogin(e)}>Login</button>
                    <Link to="signup">
                        <button type="button">SignUp</button>
                    </Link>
                </form>
        </div>
    )
}

export default SignIn;

    