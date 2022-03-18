import React from "react";
import { Navigate} from "react-router";
import { useAuth } from "../contexts/AuthProvider";

export default function RequireAuth({ children }){
    const {currentUser} = useAuth()
    //If user isnt signed In
    if(!currentUser){
        return <Navigate to="/"/>
    }
    //User is signed in, proceed normally
    return children
}