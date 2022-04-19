import React, { createContext, useEffect, useState } from "react";

const userContext = createContext();

export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState(localStorage.getItem("user"));

  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </userContext.Provider>
  );
}

export default userContext;

// j'ai besoin de rendre les informations de ce contexte persistante.
