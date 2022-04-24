import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import axios from "axios";

const SignIn = props => {
    const [signInForm, setSignInForm] = useState({ email: "", password: "" });
    const [pending, setPending] = useState(true);
    const [pendingMsg, setPendingMsg] = useState("Loading...");

    const getCookie = name => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    useEffect(() => {
        const cred = getCookie("csrf_access_token");
        const config = {
            method: "get",
            url: "/api/user/polls",
            credentials: 'same-origin',
            headers: {
              "X-CSRF-TOKEN": cred
            }
        };
        axios(config)
        .then(response => {
            props.setSignedIn(true)
        })
    }, [])

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
            props.setSignedIn(true);
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

    