import React from "react";
import { Navigate, Outlet} from "react-router";

const PrivateRoute = (props) => {
    const isLogin = localStorage.getItem("isLogin");
    const keys = ["gameName","opponentId", "player1Skin", "player2Skin",
    "winFlag", "moves", "player1Login","player2Login", "isPrivate", "isBot",
    "difficulty"]
    if (isLogin){
        for (var k = 0; k < keys.length; k += 1){
            localStorage.removeItem(keys[k])
        }
        return <Outlet/>
    }
    else{
        return <Navigate to={props.way} />
    }
};

export default PrivateRoute;