import { createContext, useState, useContext } from "react";

export const AuthContext = createContext(false);

export function AuthProvider(props) {
  const [universalLoggedin, setUniversalLoggedin] = useState(false);

  return (
    <AuthContext.Provider
      value={{ universalLoggedin, setUniversalLoggedin, name: "Heel" }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
