import { useState } from "react";
import axios from "axios";

/**
 * Responsible for Signout
 * @param {methods from parent component} props 
 */
const SignOut = props => {
    const [text, setText] = useState("Logout");

    /**
     * Submits Signout event to API and unsets the App components Signedin state. 
     * @param {event} e 
     */
    const submitSignOut = async (e) => {
        e.preventDefault();
        try {
            setText("Signing out...")
            const config = {
                method: "post",
                url: "/api/signout",
            };
            await axios(config);
            props.setSignedIn(false);
        } catch (error) {
            setText("failed");
        }
    }

    return (
        <button onClick={e => submitSignOut(e)}>
            {text}
        </button>
    )
}

export default SignOut;