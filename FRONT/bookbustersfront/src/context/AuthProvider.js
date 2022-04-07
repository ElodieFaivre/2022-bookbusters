import { createContext, useState } from "react";

/* Ce composant sert à gérer de manière centralisé la partie auth  */
const AuthContext = createContext({});

/* Children représente les enfants qui se trouve dans le authProvider  */

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
