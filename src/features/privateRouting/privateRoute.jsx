import React from "react";
import { Navigate, Outlet} from "react-router";

const PrivateRoute = (props) => {
    const isLogin = localStorage.getItem("isLogin");
    const keys = ["gameId", "gameName","opponentId", "player1Skin", "player2Skin",
    "winFlag", "moves", "number", "player1Login","player2Login"]
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