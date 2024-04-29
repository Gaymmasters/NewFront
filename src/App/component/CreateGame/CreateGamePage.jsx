import React, { useState } from "react";
import classes from "./createGame.module.css";
import { Link, useNavigate } from "react-router-dom/dist";
import UserReg from "../../../API/RegUser";
import { moveToLocalStore } from "../../../features/store";

const CreateGamePage = () =>{
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const [isPrivate, setIsPrivate] = useState(false)
    async function createGame(){
        if (isPrivate || (data.gamePassword.length >= 5 && data.gamePassword.length <= 20)){
            const res = await UserReg.CreateGame({...data, isPrivate: isPrivate, player1Id: localStorage.getItem("id")})
            if (!res.result){
                alert("Error:" + res.message);
            }
            else{
                moveToLocalStore({gameId: res.id, gameName: res.name, moves: JSON.stringify(res.moves), winFlag: res.winFlag});
                navigate('/game/'+res.id, {replace: true})
            }
        }
        else alert("Invalid password length")
    }

    function hide() {
        const Block = document.getElementById("cgp");
        if (isPrivate){
            Block.style.display = "none";
            setIsPrivate(false)
        }
        else{
            Block.style.display = "block";
            setIsPrivate(true)
        }
    }
    return(
        <div className={classes.cgpContainer}>
            <h1>Create Game</h1>
            <div className={classes.cgpMain}>
                <label>Room's name</label>
                <input
                type="text"
                className={classes.cgpInp}
                onChange={e => setData({...data,name: e.target.value})}/>
                <input 
                type="checkbox" 
                className={classes.cgpCheckbox}
                id = "checkbox"
                onClick={hide}/>
                <label to="checkbox">Private</label>
            </div>

            <div className={classes.cgpGhost} id="cgp">
                <input
                type="password"
                className={classes.cgpInp}
                onChange={e => setData({...data,password: e.target.value})}/>
            </div>

            <div className={classes.cgpButtons}>
                <Link to="/">
                    <button className={classes.cgpBtn}>Back</button>
                </Link>
                <button className={classes.cgpBtn} onClick={createGame}>Start</button>
            </div>
        </div>
    );
}
export default CreateGamePage;