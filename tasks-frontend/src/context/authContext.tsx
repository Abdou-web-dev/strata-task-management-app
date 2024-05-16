import React, { useState } from "react";

export interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode | JSX.Element | JSX.Element[] }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State variable to track authentication status

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
