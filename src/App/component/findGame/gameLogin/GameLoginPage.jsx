import React, { useState } from "react";
import classes from "./gameLogin.module.css";
import { useLocation, useNavigate } from "react-router";
import UserReg from "../../../../API/RegUser";
import { moveToLocalStore } from "../../../../features/store";

const GameLoginPage = () => {
    const [password, setPassword] = useState("")
    const data = useLocation()
    const navigate = useNavigate()

    async function joinToGame(){
        const res = await UserReg.JoinToGame({player2Id: localStorage.getItem('id'), name: data.state.gameName, password: password})
        if (!res.result){
            alert("Error: " + res.message);
        }
        else{
            moveToLocalStore({gameId: res.id, gameName: res.name, moves: JSON.stringify(res.moves), winFlag: res.winFlag, opponentId: res.player1Id, number: 1});
            navigate("/game/?id="+data.state.id)
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
                    onChange={e => setPassword(e.target.value)}/>
                </div>
                <button onClick={joinToGame}>Confirm</button>
            </div>
        </div>
    )
}

export default GameLoginPage;