import React from "react";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = (props) => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin){
        return <Outlet/>
    }
    else{
        return <Navigate to={props.way} />
    }
};

export default PrivateRoute;