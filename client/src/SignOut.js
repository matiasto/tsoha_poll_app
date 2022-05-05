import { useState } from "react";
import axios from "axios";


const SignOut = props => {
    const [text, setText] = useState("Logout");

    const submitSignOut = async (e) => {
        e.preventDefault();
        try {
            setText("Signing out...")
            const config = {
                method: "post",
                url: "/api/signout",
            };
            const result = await axios(config);
            props.setSignedIn(false);
        } catch(error) {
            setText("failed");
        }
    }

    return(
        <button onClick={e => submitSignOut(e)}> 
            {text}
        </button>
    )
}

export default SignOut;