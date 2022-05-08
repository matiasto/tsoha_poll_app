import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


/**
 * Responsible for Singin
 * @param {methods from parent component} props 
 */
const SignIn = props => {
    const [signInForm, setSignInForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    /**
     * Submits sing in request to API
     * @param {the event} e 
     */
    const submitSignIn = async (e) => {
        e.preventDefault();
        try {
            setMessage("Signing in...");
            setShowMessage(true);
            const config = {
                method: "post",
                url: "/api/signin",
                data: signInForm,
            };
            await axios(config);
            props.setSignedIn(true);
            setShowMessage(false);
            navigate("/");
        } catch (error) {
            setMessage(error.response.data.message);
            setShowMessage(true);
        }
    }

    /**
     * handles the changes on form state.
     * @param {event} e 
     */
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
                <button onClick={e => submitSignIn(e)}>Login</button>
                <Link to="signup">
                    <button type="button">SignUp</button>
                </Link>
            </form>
            {showMessage && (<p>{message}</p>)}
        </div>
    )
}

export default SignIn;
