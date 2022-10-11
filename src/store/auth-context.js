import React, { useState, useEffect, useContext } from "react";
import useHttp from "../components/hooks/use-http";
import UIContext from "./ui-context";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
  email: null,
  onSignup: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpiredDateTime = localStorage.getItem(
      "token_expired_date_time"
    );
    if (token && new Date() < new Date(parseInt(tokenExpiredDateTime))) {
      // check token date time
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      localStorage.removeItem("token_expired_date_time");
    }
  }, []);

  const { isLoading, error, sendRequest } = useHttp();

  const { setIsLoading, setError } = useContext(UIContext);
  useEffect(() => {
    setIsLoading(isLoading);
    setError(error);
  }, [isLoading, error, setIsLoading, setError]);

  const apiKey = process.env.REACT_APP_API_KEY

  const loginHandler = async (props) => {
    await sendRequest(
      {
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + apiKey,
        method: "POST",
        body: {
          email: props.email,
          password: props.password,
          returnSecureToken: true,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      (data) => {
        setIsLoggedIn(true);
        setEmail(data.email);
        localStorage.setItem("token", data.idToken);
        const now = new Date();
        const date = now.setMinutes(now.getMinutes() + data.expiresIn / 60); // timestamp
        localStorage.setItem("token_expired_date_time", date);
      }
    );
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("token_expired_date_time");
  };

  const singUpHandler = async (props) => {
    await sendRequest(
      {
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + apiKey,
        method: "POST",
        body: {
          email: props.email,
          password: props.password,
          returnSecureToken: true,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      (data) => {
        alert("Sign up Success");
      }
    );
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        email: email,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onSignup: singUpHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
