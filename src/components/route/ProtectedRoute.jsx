import React from 'react'
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import { useEffect } from 'react';

function ProtectedRoute({children}) {
  
    const {isAuth} = useAuth();
    const navigate = useNavigate()

   useEffect(()=>{
    if(!isAuth) navigate("/login");
   },[isAuth,navigate])

    return children;
}

export default ProtectedRoute