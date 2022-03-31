import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import React from "react";
import Home from "./Home";
import Navigation from "./Navigation";
import CreatePoll from "./Create";
import Poll from "./Poll";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Navigation />
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