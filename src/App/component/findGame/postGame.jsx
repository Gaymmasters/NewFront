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
            navigate("/gamelogin",{state:{id: id, gameName: gameName}})
        }
        else{
            const res = await UserReg.JoinToGame({player2Id: localStorage.getItem('id'), name: gameName, password: null})
            if (!res.result){
                alert("Error: " + res.message);
            }
            else{
                moveToLocalStore({gameId: res.id, gameName: res.name, moves: JSON.stringify(res.moves), winFlag: res.winFlag, player1Id: res.player1Id});
                navigate("/game/"+id)
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
            <div className={classes.post}>
                <p className={classes.postName}>{gameName}</p> 
            </div>
        );
    }
}

export default PostGame;