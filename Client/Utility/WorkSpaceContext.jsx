import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

const WorkSpaceContext = createContext();

export function WorkSpaceProvider({ children }) {
    const {user} = useUser();
    const [currentWorkSpace, setCurrentWorkSpace] = useState("");
    const [activeWorkSpaceName, setActiveWorkSpaceName] = useState("");

    useEffect(()=>{
        if(user !== null){
            setCurrentWorkSpace(user.mySpace._id);
            setActiveWorkSpaceName(user.mySpace.name);
        }
    }, [user])

    return (
        <WorkSpaceContext.Provider value={{currentWorkSpace, activeWorkSpaceName, setActiveWorkSpaceName, setCurrentWorkSpace}}>
            {children}
        </WorkSpaceContext.Provider>
    )
}


export function useWorkSpace() {
    return useContext(WorkSpaceContext);
}