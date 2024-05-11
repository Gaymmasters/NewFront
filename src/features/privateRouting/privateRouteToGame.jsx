import React from "react";
import { Navigate, useNavigate } from "react-router";
import UserReg from "../../API/RegUser";
import { useSearchParams } from "react-router-dom";

///   1715347899766

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
                console.log("error res")
                return <Navigate to="/"/>
            }
            else{
                console.log("success res")
                if(res.player2Id != null && res.player2Id != localStorage.getItem("id")){
                    console.log("2id")
                    alert("You can't join to this game")
                    return <Navigate to="/"/>
                }
                else{
                    if (res.isPrivate == true){
                        console.log("private")
                        return <Navigate to = '/gamelogin'/>
                    }
                    else{
                        console.log("success join")
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