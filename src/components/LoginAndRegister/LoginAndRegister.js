import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
  Fragment,
} from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";
import classes from "./LoginAndRegister.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import UIContext from "../../store/ui-context";

const ACTION_USER_INPUT = "USER_INPUT";
const ACTION_INPUT_BLUR = "INPUT_BLUR";

const emailReducer = (state, action) => {
  if (action.type === ACTION_USER_INPUT) {
    return {
      value: action.val,
      isValid: action.val.includes("@"),
      errorMessage: action.val.includes("@") ? null : "Email must contains '@'",
    };
  }
  if (action.type === ACTION_INPUT_BLUR) {
    return {
      value: state.value,
      isValid: state.value.includes("@"),
      errorMessage: state.value.includes("@")
        ? null
        : "Email must contains '@'",
    };
  }
  return { value: "", isValid: false, errorMessage: null };
};

const passwordReducer = (state, action) => {
  if (action.type === ACTION_USER_INPUT) {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6,
      errorMessage:
        action.val.trim().length > 6
          ? null
          : "Password words must greater than 6",
    };
  }
  if (action.type === ACTION_INPUT_BLUR) {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6,
      errorMessage:
        state.value.trim().length > 6
          ? null
          : "Password words must greater than 6",
    };
  }
  return { value: "", isValid: false, errorMessage: null };
};

const LoginAndRegister = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
    errorMessage: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
    errorMessage: null,
  });

  const authCtx = useContext(AuthContext);
  const uiCtx = useContext(UIContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      navigate("/home");
    }
    if (uiCtx.error) {
      alert(uiCtx.error);
    }
  }, [authCtx.isLoggedIn, uiCtx.error, navigate]);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  //debounce
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: ACTION_USER_INPUT, val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: ACTION_USER_INPUT, val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: ACTION_INPUT_BLUR });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: ACTION_INPUT_BLUR });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      if (isLogin) {
        authCtx.onLogin({
          email: emailState.value,
          password: passwordState.value,
        });
        navigate("/home");
      } else {
        authCtx.onSignup({
          email: emailState.value,
          password: passwordState.value,
        });
      }
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Fragment>
      <Card className={classes.login}>
        <div className={classes["img-wrapper"]}>
          <img src={logo} className={classes["App-logo"]} alt="logo" />
        </div>
        <form onSubmit={submitHandler}>
          <Input
            ref={emailInputRef}
            id="email"
            label="E-Mail"
            type="email"
            isValid={emailIsValid}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            errorMessage={emailState.errorMessage}
          />
          <Input
            ref={passwordInputRef}
            id="password"
            label="Password"
            type="password"
            isValid={passwordIsValid}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            errorMessage={passwordState.errorMessage}
          />
          <div className={classes.actions}>
            <Button disabled={uiCtx.isLoading} type="submit">
              {isLogin && "Login"}
              {!isLogin && "Register"}
            </Button>
          </div>
        </form>
        <div className={classes.actions} onClick={() => setIsLogin(!isLogin)}>
          <span className={classes["span-btn"]}>
            {isLogin && "Create Account"}
            {!isLogin && "Login"}
          </span>
        </div>
      </Card>
    </Fragment>
  );
};

export default LoginAndRegister;
