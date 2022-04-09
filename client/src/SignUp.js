import { useState } from "react";
import useAxios from "./useAxios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [signUpForm, setSignUpForm] = useState({ email: "", password: "", firstname: "", lastname: ""});
    const [tmpOptions, setTmpOptions] = useState({url: ""});
    const { fetchData } = useAxios(tmpOptions);
    const navigate = useNavigate();

    const submitSignUp = async function(e) {
        e.preventDefault();
        const options = {
            method: "post",
            url: "/api/signup",
            data: signUpForm
        }
        const response = await fetchData(options);
        navigate("/");
    }

    const handleChange = e => {
        const { value, name } = e.target;
        setSignUpForm(old => ({
            ...old, [name]: value
        }))
    }

    return (
        <div>
            <h1>SignUp</h1>
            <form className="signup">
                <input 
                    type="email"
                    text={signUpForm.email}
                    name="email"
                    placeholder="email"
                    value={signUpForm.email}
                    onChange={handleChange} />
                <input
                    type="password"
                    text={signUpForm.password}
                    name="password"
                    placeholder="password"
                    value={signUpForm.password}
                    onChange={handleChange} />
                <input
                    type="text"
                    text={signUpForm.firstname}
                    name="firstname"
                    placeholder="firstname"
                    value={signUpForm.firstname}
                    onChange={handleChange} />
                <input
                    type="text"
                    text={signUpForm.lastname}
                    name="lastname"
                    placeholder="lastname"
                    value={signUpForm.lastname}
                    onChange={handleChange} />
                <button onClick={e => submitSignUp(e)}>SignUp</button>
            </form>
        </div>
    )
}

export default SignUp;