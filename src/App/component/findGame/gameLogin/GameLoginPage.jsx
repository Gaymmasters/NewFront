import React, { useState } from "react";
import classes from "./gameLogin.module.css";
import { useLocation, useNavigate } from "react-router";
import UserReg from "../../../../API/RegUser";
import { moveToLocalStore } from "../../../../features/store";

const GameLoginPage = () => {
    const [password, setPassword] = useState("")
    const gameName = localStorage.getItem("gameName")
    const gameId = localStorage.getItem("gameId")
    const navigate = useNavigate()

    async function joinToGame(){
        console.log(gameName, gameId)
        const res = await UserReg.JoinToGame({player2Id: localStorage.getItem('id'), name: gameName, password: password})
        if (!res.result){
            alert("Error: " + res.message);
        }
        else{
            const userData = await UserReg.GetInfAboutUser(res.player1Id)
            moveToLocalStore({gameId: res.id, gameName: res.name, moves: JSON.stringify(res.moves), winFlag: res.winFlag,
                opponentId: res.player1Id, number: 1, 
                player2Skin: localStorage.getItem("skin"), player2Login: localStorage.getItem("login"), 
                player1Skin: userData.skin,                player1Login: userData.login});
            navigate("/game/?id="+gameId)
        }
    }

    return(
        <div className={classes.main}>
            <h1>This game is private</h1>
            <div className={classes.inside}>
                <p>Please enter the password</p>
                <div>
                    <label>Game's password</label>
                    <input
                    type="password"
                    className={classes.inp}
                    onChange={e => setPassword(e.target.value)}/>
                </div>
                <button className={classes.btn} onClick={joinToGame}>Confirm</button>
                <button className={classes.backbtn} onClick={()=>{navigate('/findgame')}}>Back</button>
            </div>
        </div>
    )
}

export default GameLoginPage;