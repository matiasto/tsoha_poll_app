import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import React from "react";
import Home from "./Home";
import Navigation from "./Navigation";
import Create from "./Create";

function App() {
    return (
        <div className='App'>
          <Navigation />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="create" element={<Create />} />
            </Routes>
          </BrowserRouter>
        </div>
    );
  }

export default App;
