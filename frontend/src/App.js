import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import React from "react";
import Home from "./Home";
import Navigation from "./Navigation";
import CreatePoll from "./Create";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="create" element={<CreatePoll />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;