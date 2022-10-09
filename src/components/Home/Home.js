import React, { useContext, useEffect } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import classes from "./Home.module.css";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      navigate("/");
    }
  }, [authCtx.isLoggedIn, navigate]);

  return (
    <Card className={classes.home}>
      <h1>Welcome {props.email}</h1>
      <Button onClick={authCtx.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
