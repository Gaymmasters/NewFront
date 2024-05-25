import React, { useState } from "react";
import { Navigate, Outlet } from "react-router";
import UserReg from "../../API/RegUser";
import { useSearchParams } from "react-router-dom";
import { moveToLocalStore } from "../store";

const PrivateRouteToGame = (props) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const gameId = searchParams.get("id")
    const isLogin = localStorage.getItem("isLogin")
    const [number, setNumber] = useState(-1)
        if (isLogin){
            moveToTheGame().then((value) => {setNumber(value)})
            console.log(number)
            switch (number){
                case 1: 
                    return <Navigate to="/"/>
                case 2:
                    return <Navigate to = "/gamelogin"/>
                case 3:
                    return <Outlet/>
            }
        }
        else{
            alert("You aren't logged in")
            return <Navigate to={props.way}/>
        }

        async function moveToTheGame(){

            const res = await UserReg.GetInfAboutGame(gameId)
            console.log("result",res)
            if (!res.result){
                alert('Error: ' + res.message)
                console.log("error res")
                return 1 ///<Navigate to="/"/>
            }
            else{
                if((res.player1Id === localStorage.getItem("id")) || (res.player2Id === localStorage.getItem("id"))){
                    return 3
                }
                if ((res.isPrivate === true) && (res.player2Id !== localStorage.getItem('id'))){
                    console.log("private")
                    moveToLocalStore({gameId: res.id, gameName: res.name})
                    return 2 ///<Navigate to = "/gamelogin"/>
                }
                if (res.isBot === true){
                    return 3
                }
                else{
                    console.log("success join")
                    return 3 ///<Outlet/>
                }
            }
        }
    }

export default PrivateRouteToGame;