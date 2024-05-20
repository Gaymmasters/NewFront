import React, { useState } from "react";
import classes from "./createGame.module.css";
import { useNavigate } from "react-router-dom/dist";
import UserReg from "../../../API/RegUser";
import { moveToLocalStore } from "../../../features/store";

const CreateGamePage = () =>{
    const [data, setData] = useState({password: "", name: localStorage.getItem("login")+"'s game"});
    const navigate = useNavigate();
    const [isPrivate, setIsPrivate] = useState(false)
    const [isBot, setIsBot] = useState(false)
    async function createGame(){
        if (isPrivate){
            if (data.password.length >= 5 && data.password.length <= 20){
                if (data.name.length >= 5 && data.name.length <= 27){
                    const res = await UserReg.CreateGame({...data, isPrivate: isPrivate, isBot: isBot, player1Id: localStorage.getItem("id")})
                    if (!res.result){
                        alert("Error:" + res.message);
                    }
                    else{
                        moveToLocalStore({gameId: res.id, gameName: res.name, moves: JSON.stringify(res.moves), winFlag: res.winFlag, number: 0});
                        navigate('/game/?id='+res.id, {replace: true})
                    }
                }
                else alert('Invalid login length')
            }
            else alert("Invalid password length")
        }
        else{
            const res = await UserReg.CreateGame({...data, isPrivate: isPrivate, isBot: isBot, player1Id: localStorage.getItem("id")})
                if (!res.result){
                    alert("Error:" + res.message);
                }
                else{
                    moveToLocalStore({gameId: res.id, gameName: res.name, moves: JSON.stringify(res.moves), winFlag: res.winFlag, number: 0,
                        player1Skin: localStorage.getItem("skin"), player1Login: localStorage.getItem("login")});
                    navigate('/game/?id='+res.id, {replace: true})
                }
        }
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
                value={data.name}
                onChange={e => setData({...data,name: e.target.value})}/>
            </div>
            <div className={classes.cgpMainCheckBox}>
                <div className={classes.cgpDivCheckbox}>
                    <input 
                    type="checkbox" 
                    className={classes.cgpCheckbox}
                    id = "checkboxB"
                    checked={isBot}/>
                    <label to="checkboxB" onClick={() => isBot ? setIsBot(false) : setIsBot(true)}>Play with bot</label>
                </div>
                <div>
                    <input 
                    type="checkbox" 
                    className={classes.cgpCheckbox}
                    id = "checkboxP"
                    checked={isPrivate}/>
                    <label to="checkboxP" onClick={hide}>Private</label>
                </div>
            </div>
            <div className={classes.cgpGhost} id="cgp">
                <label>Password</label>
                <input
                type="password"
                className={classes.cgpInp}
                onChange={e => setData({...data,password: e.target.value})}/>
            </div>

            <div className={classes.cgpButtons}>
                <button className={classes.cgpBtn} onClick={()=>{navigate('/')}}>Back</button>
                <button className={classes.cgpBtn} onClick={createGame}>Start</button>
            </div>
        </div>
    );
}
export default CreateGamePage;