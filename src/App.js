import React, { useContext } from "react";

import LoginAndRegister from "./components/LoginAndRegister/LoginAndRegister";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const ctx = useContext(AuthContext);

  return (
    <Router>
      <MainHeader />
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
