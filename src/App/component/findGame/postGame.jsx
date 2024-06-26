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
            navigate("/gamelogin")
        }
        else{
            console.log(gameName)
            const res = await UserReg.JoinToGame({player2Id: localStorage.getItem('id'), name: gameName, password: null})
            if (!res.result){
                alert("Error: " + res.message);
            }
            else{
                moveToLocalStore({gameId: res.id, gameName: res.name, moves: JSON.stringify(res.moves), winFlag: res.winFlag, opponentId: res.player1Id, number: 1});
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