import React from "react";
import { Navigate, useNavigate } from "react-router";
import UserReg from "../../API/RegUser";
import { useSearchParams } from "react-router-dom";

const PrivateRouteToGame = (props) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get("id")
    const isLogin = localStorage.getItem("isLogin")
    async function navigateToGame(gameId){
        if (isLogin){
            const res = await UserReg.GetInfAboutGame(gameId)
            console.log(res)
            if (!res.result){
                alert('Error: ' + res.message)
                return <Navigate to="/menu"/>
            }
            else{
                if(res.player2Id != null){
                    return <Navigate to="/menu"/>
                }
                else{
                    if (res.isPrivate == true){
                        return <Navigate to = '/gamelogin'/>
                    }
                    else{
                        return <Navigate to={"/game/?id="+id}/>
                    }
                }
            }
        }
        else{
            return <Navigate to={props.way}/>
        }
    }
    navigateToGame(id)    
}

export default PrivateRouteToGame;