import { useState } from "react";
import useAxios from "./useAxios";


const SignOut = props => {
    const [options, setOptions] = useState({url: ""});
    const { fetchData } = useAxios(options);

    const submitSignOut = async function(e) {
        e.preventDefault();
        const response = await fetchData({url:"/api/signout", method: "post"});
        props.setToken(undefined);
    }

    return(
        <button onClick={e => submitSignOut(e)}> 
            Logout
        </button>
    )
}

export default SignOut;