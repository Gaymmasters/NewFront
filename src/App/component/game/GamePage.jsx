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
        drawMoves(localStorage.getItem("moves"))
        awaitConnection()
    }, []) 

    const skin = {0: skin0, 1:skin1, 2:skin2, 3:skin3, 4:skin4, 5:skin5}

    const matrix = [
        [0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],
        [0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],
        [0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8]
    ]
    let moveList = JSON.parse(localStorage.getItem("moves"))
    const moveList2 = ["b4s3",'b3s1','b1s2']

    let connectionFlag = false
    //// fix интервал задавался только тогда нет второго пользователя, прерфвался, когда пользователь подключился (при flag = true скрытно работает)
    async function awaitConnection(){
            let timerId = setInterval(fetchData, 2000);
            setTimeout(() => { clearInterval(timerId); player1(localStorage.getItem("opponentId")) }, 30000);
    }


    async function fetchData(){
        if (!connectionFlag){
            const res = await UserReg.GetInfAboutGame(localStorage.getItem("gameId"))
            if (res.player2Id != null && +localStorage.getItem("number") ===  0){
                const userData = await UserReg.GetInfAboutUser(res.player2Id)
                moveToLocalStore({opponentId: res.player2Id, opponentSkin: userData.skin, opponentLogin: userData.login})
                connectionFlag = true
            }
        }
    }

    async function makeMove(blockId, boxId){
        if ((localStorage.getItem("opponentId") !== null) && (+localStorage.getItem("winFlag") === 0) 
        && ((JSON.parse(localStorage.getItem("moves")).length % 2) === +localStorage.getItem("number"))) {
            const move = boxId + blockId 
            if (moveList.includes(move)){
                return undefined /// проверка уникальности хода
            }
            const res = await Game.makeMove({move: move, id: localStorage.getItem('gameId')})
            if (!res.result){
                alert("Error: " + res.message)
            }
            else{
                moveList = await Game.getGameMoves(localStorage.getItem("gameId"))
                console.log(moveList, JSON.parse(localStorage.getItem("moves")))
                await drawMoves()
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
                    block.style.backgroundColor = "blue" /// отмечаем ход первого игрока
                }
                else{
                    block.style.backgroundColor = "red" /// отмечаем второго игрока 
                }
            }
        }
        localStorage.setItem("moves", JSON.stringify(res))
    }

    ////fix таймер. прерывалась функция, когда сделан ход
    async function waitMove(){ 
        let timerId = setInterval(drawMoves, 1000);
            setTimeout(() => { clearInterval(timerId); player1(localStorage.getItem("opponentId")) }, 20000);
    }

    async function player1(id){
        if (id != undefined){
                const res = await UserReg.GetInfAboutUser(id)
            if (res.result){
                moveToLocalStore({opponentLogin: res.login, opponentSkin: res.skin})
            }
            else{
                alert("Invalid connection of the second player.")
            }
        }
        else{
            alert("Connection time out") ///вся логика с удалением игры, если второй игрок не подключился
        }
    }
    return(
        <div>
            <div className={classes.h1}>
                <h1>{localStorage.getItem("gameName")}</h1>
            </div>
            <div className={classes.container}>
                <div className={classes.player1}>
                    <h3>{localStorage.getItem("login")}</h3>
                    <img className={classes.skinI} src={skin[localStorage.getItem('skin')]} alt = "skin"/>
                </div>
                <div className={classes.allField}>
                    <Box9x9 getId={makeMove}/>
                </div>
                <div className={classes.player2}>
                    <h3>{localStorage.getItem("opponentLogin")}</h3>
                    <img className={classes.skin} src={skin[localStorage.getItem('opponentSkin')]} alt = "skin"/>
                </div>
                {/*<button onClick={drawMoves}>vghjkol;</button>*/}
            </div>
        </div>
    )
}

export default GamePage;