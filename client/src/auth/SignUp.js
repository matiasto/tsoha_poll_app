import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const [signUpForm, setSignUpForm] = useState({ email: "", password: "", firstname: "", lastname: "" });
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    const submitSignUp = async (e) => {
        e.preventDefault();
        try {
            setMessage("Signing up...");
            setShowMessage(true);
            const config = {
                method: "post",
                url: "/api/signup",
                data: signUpForm,
            };
            const result = await axios(config);
            setShowMessage(false);
            navigate("/");
        } catch (error) {
            setMessage(error.response.data.message);
            setShowMessage(true);
        }
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
            {showMessage && (<p>{message}</p>)}
        </div>
    )
}

export default SignUp;