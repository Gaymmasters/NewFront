import React from "react";
import { Navigate, useNavigate } from "react-router";
import UserReg from "../../API/RegUser";

const PrivateRouteToGame = (props) => {
    const isLogin = localStorage.getItem("isLogin")
    const navigate = useNavigate()
    if (isLogin){
        const res = UserReg.GetInfAboutGame() ///передать id
        if (!res.result){
            alert('Error: ' + res.message)
        }
        else{
            if(({...res, player2Id} != null) || ({...res, winFlag} == 1)){
                navigate('/menu')
                alert("You can't join to this game")
            }
            else{
                if ({...res, isPrivate} == true){
                    navigate('/gamelogin', {state:{id: res.id , gameName: res.name}})
                    alert("This game is private.")
                }
                else{
                    navigate('/game/'/*+id игры*/)
                }
            }
        }
    }
    else{
        return <Navigate to={props.way}/>
    }
}

export default PrivateRouteToGame;