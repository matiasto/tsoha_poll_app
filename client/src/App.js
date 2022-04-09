import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import React, { useState } from "react";
import Home from "./Home";
import Navigation from "./Navigation";
import CreatePoll from "./Create";
import Poll from "./Poll";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Cookies from "js-cookie";

const App = () => {
    const [token, setToken] = useState(Cookies.get("csrf_access_token"));
    console.log(token);

    if (!token) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignIn setToken={setToken} />} />
                    <Route path="signup" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        )               
    }

    return (
        <div className="app">
            <BrowserRouter>
                <Navigation setToken={setToken}/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="create" element={<CreatePoll />} />
                    <Route path="poll/:poll_id" element={<Poll />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;