import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Home from "./common/Home";
import Navigation from "./common/Navigation";
import CreatePoll from "./poll/Create";
import Vote from "./poll/Vote";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Profile from "./user/Profile";

const App = () => {
    const [signedIn, setSignedIn] = useState(false);
    const [loading, setLoading] = useState(false);

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
            setSignedIn(true);
        })
        .catch(error => {})
        .finally(() => {
            setLoading(false);
        })
    }, [])

    return (
        <div className="app">
            {signedIn ? (
                <BrowserRouter>
                    <Navigation setSignedIn={setSignedIn}/>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="create" element={<CreatePoll />} />
                        <Route path="poll/:poll_id" element={<Vote />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            ) : (
                loading ? <div>Loading...</div> : (
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<SignIn setSignedIn={setSignedIn} />} />
                            <Route path="signup" element={<SignUp />} />
                            <Route path="*" element={<SignIn />} />
                        </Routes>
                    </BrowserRouter>
                )
            )}
            
        </div>
    );
}

export default App;