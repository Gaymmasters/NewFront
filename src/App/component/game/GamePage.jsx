import React, { useEffect } from "react";
import classes from "./game.module.css";
import Box9x9 from "./box9x9";
import Game from "../../../API/Game";
import skin0  from "./../img/skin0.png";
import skin1  from "./../img/skin1.png";
import skin2  from "./../img/skin2.png";
import skin3  from "./../img/skin3.png";
import skin4  from "./../img/skin4.png";
import skin5  from "./../img/skin5.png";
import UserReg from "../../../API/RegUser";
import { moveToLocalStore } from "../../../features/store";


const GamePage = () => {
    useEffect(() => {
        drawMoves()
        awaitConnection()
        waitMove()
    }, []) 

    let secondPlayerWaitFlag = true ///ожидание хода
    let connectionFlag = true ///подключение игрока

    const skin = {0: skin0, 1: skin1, 2: skin2, 3: skin3, 4: skin4, 5:skin5}

    const matrix = [
        [0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],
        [0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],
        [0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8]
    ]
    let moveList = JSON.parse(localStorage.getItem("moves"))

    async function awaitConnection(){
        while (connectionFlag) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            fetchData()
        }
    }

    async function fetchData(){
        if (localStorage.getItem("opponentId") !== null){
            connectionFlag = false;
            return;
        }
        
        const res = await UserReg.GetInfAboutGame(localStorage.getItem("gameId"))

        if (res.player2Id !== null && +localStorage.getItem("number") === 0){
            const userData = await UserReg.GetInfAboutUser(res.player2Id)
            moveToLocalStore({opponentId: res.player2Id, player2Skin: userData.skin, player2Login: userData.login})
            connectionFlag = false;
            return;
        }  
    }

    async function makeMove(blockId, boxId){
        if ((localStorage.getItem("opponentId") !== null) && (+localStorage.getItem("winFlag") === 0) 
        && ((JSON.parse(localStorage.getItem("moves")).length % 2) === +localStorage.getItem("number"))) {
            const move = boxId + blockId 
            moveList = await Game.getGameMoves(localStorage.getItem("gameId"))
            if (moveList.includes(move)){
                return undefined /// проверка уникальности хода
            }
            const res = await Game.makeMove({move: move, id: localStorage.getItem('gameId')})
            if (!res.result){
                alert("Error: " + res.message)
            }
            else{
                console.log(moveList, JSON.parse(localStorage.getItem("moves")))
                await drawMoves()

                const activePlayer = document.getElementById("player-"+localStorage.getItem("number"))
                const passivePlayer = document.getElementById("player-"+((+localStorage.getItem("number") + 1) % 2))
                activePlayer.style.borderColor = "black"
                passivePlayer.style.borderColor = "green"

                secondPlayerWaitFlag = true
                waitMove()
            }
        }
        return undefined /// если нет второго игрока
    }
    //// fix
    async function drawMoves(){
        const res = await Game.getGameMoves(localStorage.getItem("gameId"))
        for (let i = 0; i < res.length; i++){
            const block = document.getElementById(res[i])
            if (block != undefined){
                if (i % 2 === 0){
                    block.style.backgroundImage = "url("+skin[localStorage.getItem("player1Skin")]+")"                    
                }
                else{
                    block.style.backgroundImage = "url("+skin[localStorage.getItem("player2Skin")]+")"
                }
                       
            }
        }
        localStorage.setItem("moves", JSON.stringify(res))
    }

    async function waitMove(){
        while (secondPlayerWaitFlag) {
            await new Promise(resolve => setTimeout(resolve, 500));
            const res = await Game.getGameMoves(localStorage.getItem("gameId"));
            if (res.length % 2 === +localStorage.getItem("number")){
                await drawMoves();

                const activePlayer = document.getElementById("player-"+localStorage.getItem("number"))
                const passivePlayer = document.getElementById("player-"+((+localStorage.getItem("number") + 1) % 2))
                activePlayer.style.borderColor = "green"
                passivePlayer.style.borderColor = "black"

                secondPlayerWaitFlag = false;
                return;
            }
        }
    }

    return(
        <div>
            <div className={classes.h1}>
                <h1>{localStorage.getItem("gameName")}</h1>
            </div>
            <div className={classes.container}>
                <div className={classes.player0} id="player-0" getId={drawMoves}>
                    <div>
                        <h3>{localStorage.getItem("player1Login")}</h3>
                        <img className={classes.skin} src={skin[localStorage.getItem('player1Skin')]} alt = "skin"/>
                    </div>
                </div>
                <div className={classes.allField}>
                    <Box9x9 getId={makeMove}/>
                </div>
                <div className={classes.player1} id="player-1" getId={drawMoves}>
                    <div>
                        <h3>{localStorage.getItem("player2Login")}</h3>
                        <img className={classes.skinI} src={skin[localStorage.getItem('player2Skin')]} alt = "skin"/>
                    </div>
                </div>
                {/*<button onClick={drawMoves}>vghjkol;</button>*/}
            </div>
        </div>
    )
}

export default GamePage;