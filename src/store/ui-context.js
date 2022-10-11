import React, { useState } from "react";

const UIContext = React.createContext({
  isLoading: false,
  error: null,
  setIsLoading: (isLoading) => {},
  setError: (error) => {},
});

export const UIContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <UIContext.Provider
      value={{
        isLoading: isLoading,
        error: error,
        setIsLoading: setIsLoading,
        setError: setError,
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
};

export default UIContext;
