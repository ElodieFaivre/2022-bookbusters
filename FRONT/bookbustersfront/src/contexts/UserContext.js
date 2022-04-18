import React, { createContext, useState } from "react";

const userContext = createContext();

export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState([]);

  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </userContext.Provider>
  );
}

export default userContext;
