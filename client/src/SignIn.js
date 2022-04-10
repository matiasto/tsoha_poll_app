import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const SignIn = props => {
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [options, setOptions] = useState({url: ""});
    const { fetchData } = useAxios(options);

    const submitLogin = async function(e) {
        e.preventDefault();
        const response = await fetchData({url:"/api/signin", method: "post", data: loginForm});
        props.setToken(Cookies.get('csrf_access_token'));
    }

    const handleChange = e => {
        const { value, name } = e.target;
        setLoginForm(old => ({
            ...old, [name]: value
        }))
    }

    return (
        <div>
            <h1>Login</h1>
                <form className="login">
                    <input 
                        type="email"
                        text={loginForm.email}
                        name="email"
                        placeholder="email"
                        value={loginForm.email}
                        onChange={handleChange} />
                    <input
                        type="password"
                        text={loginForm.password}
                        name="password"
                        placeholder="password"
                        value={loginForm.password}
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

    