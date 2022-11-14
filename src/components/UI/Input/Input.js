import React, { useRef, useImperativeHandle, Fragment } from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <Fragment>
      <div
        className={`${classes.control} ${
          props.isValid === false ? classes.invalid : ""
        }`}
      >
        <span className={`material-icons ${classes.icon}`}>
          {props.iconName}
        </span>
        <input
          className={classes.input}
          ref={inputRef}
          type={props.type}
          id={props.id}
          value={props.value}
          placeholder={props.placeholder}
          required={props?.required || false}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>

      {props.errorMessage && (
        <div className={classes["error-message"]}>{props.errorMessage}</div>
      )}
    </Fragment>
  );
});

export default Input;
