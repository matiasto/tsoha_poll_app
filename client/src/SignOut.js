import { useState } from "react";
import axios from "axios";


const SignOut = props => {
    const [options, setOptions] = useState({url: ""});
    const [pending, setPending] = useState(true);
    const [pendingMsg, setPendingMsg] = useState("Loading...");

    const submitSignOut = async (e) => {
        e.preventDefault();
        try {
            setPendingMsg("Signing out...");
            setPending(true);
            const config = {
                method: "post",
                url: "/api/signout",
            };
            const result = await axios(config);
            props.setSignedIn(false);
        } catch(error) {
            console.log(error);
        } finally {
            setPending(false);
        }
        
    }

    return(
        <button onClick={e => submitSignOut(e)}> 
            Logout
        </button>
    )
}

export default SignOut;