import { createContext, useState } from "react";




export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({username:'guest',name:null,avatar_url:"https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=3870&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"});
  return (
    <UserContext.Provider value={{ authUser, setAuthUser }}>
  {children}
    </UserContext.Provider>
  );
};
