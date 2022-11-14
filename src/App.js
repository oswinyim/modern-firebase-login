import React, { useContext } from "react";

import LoginAndRegister from "./components/LoginAndRegister/LoginAndRegister";
import AuthContext from "./store/auth-context";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const ctx = useContext(AuthContext);
  return (
    <Router>
      <main>
        <Routes>
          (
          {!ctx.isLoggedIn && (
            <Route path="/login" element={<LoginAndRegister />} />
          )}
          )
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<LoginAndRegister />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
