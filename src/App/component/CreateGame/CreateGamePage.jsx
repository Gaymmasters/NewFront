import React, { useEffect, useState } from "react";
import classes from "./createGame.module.css";
import { useNavigate } from "react-router-dom/dist";
import UserReg from "../../../API/RegUser";
import { moveToLocalStore } from "../../../features/store";

const CreateGamePage = () =>{

    useEffect(() => {
        const newTile = document.getElementById("tile-0")
        newTile.style.border = "2px solid rgb(60,214,84)"
    },[])

    const [data, setData] = useState({password: "", name: localStorage.getItem("login")+"'s game"});
    const navigate = useNavigate();
    const [isPrivate, setIsPrivate] = useState(false)
    const [isBot, setIsBot] = useState(false)
    const tiles =[
        {id: 0, level: "easy"},
        {id: 1, level: "normal"}, 
        {id: 2, level: "hard"}
    ]
    async function createGame(){

        // can't chose two option at the same time
        if(isPrivate && isBot){
            alert("You can only chose one option.")
            return
        }

        // private game
        if (isPrivate && !isBot){
            if (data.password.length >= 5 && data.password.length <= 20){
                if (data.name.length >= 5 && data.name.length <= 27){
                    const res = await UserReg.CreateGame({...data, isPrivate: isPrivate, isBot: isBot, player1Id: localStorage.getItem("id")})
                    if (!res.result){
                        alert("Error:" + res.message);

                    }
                    else{
                        moveToLocalStore({gameId: res.id, gameName: res.name, moves: JSON.stringify(res.moves), winFlag: res.winFlag, number: 0,
                            player1Skin: localStorage.getItem("skin"), player1Login: localStorage.getItem("login")
                        });
                        navigate('/game/?id='+res.id, {replace: true})
                    }
                }
                else alert('Invalid login length')
            }
            else alert("Invalid password length")
        }

        // free game
        if (!isPrivate && !isBot){
            const res = await UserReg.CreateGame({...data, isPrivate: isPrivate, isBot: isBot, player1Id: localStorage.getItem("id")})
                if (!res.result){
                    alert("Error: " + res.message);
                }
                else{
                    moveToLocalStore({gameId: res.id, gameName: res.name, moves: JSON.stringify(res.moves), winFlag: res.winFlag, number: 0,
                        player1Skin: localStorage.getItem("skin"), player1Login: localStorage.getItem("login")});
                    navigate('/game/?id='+res.id, {replace: true})
                }
        }

        // game with bot
        if (!isPrivate && isBot){
            const res = await UserReg.CreateGame({...data, isPrivate: isPrivate, isBot: isBot, player1Id: localStorage.getItem("id")})
            if (!res.result){
                alert("bot Error: " + res.message);
                console.log("bot")
            }
            else{
                moveToLocalStore({gameId: res.id, gameName: res.name, moves: JSON.stringify(res.moves), winFlag: res.winFlag, number: 0,
                    player1Skin: localStorage.getItem("skin"), player1Login: localStorage.getItem("login"), difficulty: level
                });
                navigate('/game/withbot/?id='+res.id, {replace: true})
            }
        }
    }

    /// for private game
    function hidePass() {
        const Block = document.getElementById("pass");
        if (isPrivate || isBot){
            Block.style.display = "none";
            setIsPrivate(false)
        }
        else{
            Block.style.display = "block";
            setIsPrivate(true)
        }
    }

    /// for game with bot

    function hideRange() {
        const Block = document.getElementById("range");
        if (isBot || isPrivate){
            Block.style.display = "none";
            setIsBot(false)
        }
        else{
            Block.style.display = "block";
            setIsBot(true)
        }
    }

    const [level, setLevel] = useState(0)
    const tileClick = (id) => {
        if (id !== level){
            const newTile = document.getElementById("tile-"+ id)
            const prevTile = document.getElementById("tile-"+ level)
            newTile.style.border = "2px solid rgb(60,214,84)"
            prevTile.style.border = "2px solid black"
            setLevel(id)
            console.log("level", level, newTile, id)
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
                    <label to="checkboxB" onClick={hideRange}>Play with bot</label>
                </div>
                <div className={classes.cgpGhost} id="range">
                    <label>Difficulty</label> 
                    {tiles.map(tile => (
                        <div 
                        key={tile.id}
                        id = {'tile-'+tile.id}
                        className={classes.tile}
                        onClick={() => tileClick(tile.id)}>
                            <span>{tile.level}</span>
                        </div>))}
                </div>
                <div>
                    <input 
                    type="checkbox" 
                    className={classes.cgpCheckbox}
                    id = "checkboxP"
                    checked={isPrivate}/>
                    <label to="checkboxP" onClick={hidePass}>Private</label>
                </div>
            </div>
            <div className={classes.cgpGhost2} id="pass">
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