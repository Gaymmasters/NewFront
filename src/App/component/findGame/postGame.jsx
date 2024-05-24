import React from "react";
import classes from "./findGame.module.css";
import privateGame from "./../img/privateGame.png"
import { useNavigate } from "react-router";
import UserReg from "../../../API/RegUser";
import { moveToLocalStore } from "../../../features/store";

const PostGame = (props) =>{
    const id = props.post.id
    const gameName = props.post.name
    const isPrivate = props.post.isPrivate
    const navigate = useNavigate()

    async function joinToGame(){
        if (isPrivate){
            moveToLocalStore({gameId: id, gameName: gameName})
            navigate("/game/?id="+id)
        }
        else{
            console.log(gameName)
            const res = await UserReg.JoinToGame({player2Id: localStorage.getItem('id'), name: gameName, password: null})
            if (!res.result){
                alert("Error: " + res.message);
            }
            else{
                const userData = await UserReg.GetInfAboutUser(res.player1Id)
                moveToLocalStore({gameId: res.id, gameName: res.name, moves: JSON.stringify(res.moves), winFlag: res.winFlag,
                    number: 1, 
                    player2Skin: localStorage.getItem("skin"), player2Login: localStorage.getItem("login"),
                    player1Skin: userData.skin,                player1Login: userData.login});
                navigate("/game/?id="+id)
            }
        }
    }

    if (isPrivate){
        return(
            <div className={classes.post}
            onClick={joinToGame}>
                <img className={classes.imagePrivateGame} src = {privateGame} alt = "Private game"/>
                <p className={classes.postName}>{gameName}</p> 
            </div>
        );
    }
    else{
        return(
            <div className={classes.post}
            onClick={joinToGame}>
                <p className={classes.postName}>{gameName}</p> 
            </div>
        );
    }
}

export default PostGame;