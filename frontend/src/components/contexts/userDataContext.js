import { children, createContext, useEffect, useState } from "react";
export const userDataContext = createContext();


//function act as a context provider
export function UserDataProvider({children}) {

    //state to store the user data and flowtye as an object the state takes one intializer function to initialize object and checking if the data is in localStorage first grab it if not then assign it as empty object

    const [userData,setUserData] = useState(() => {
        const saved = localStorage.getItem("userData");
        return saved ? JSON.parse(saved) : {};
    }  
    );

    //whenever the data is going to change call this useffecr and set the data in localStorage
    useEffect(()=> {
        localStorage.setItem("userData",JSON.stringify(userData));
    },[userData]);


    // function to clear the flow (after completion)
    const clearUserData = () => {
        setUserData({}); // clear context state
        localStorage.removeItem("flowData"); // clear localStorage
    };


    //function returning with provider and children as a special prop 
    return(
    <>
        <userDataContext.Provider value={{userData,setUserData,clearUserData}}>
            {children}
        </userDataContext.Provider>
    </>);
}