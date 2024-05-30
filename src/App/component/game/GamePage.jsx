import React, { useEffect, useState } from "react";
import classes from "./game.module.css";
import Box9x9 from "./box9x9";
import Game from "../../../API/Game";
import UserReg from "../../../API/RegUser";
import { moveToLocalStore } from "../../../features/store";
import plr0skin0 from "./../img/plr1skins/plr1skin0.png";
import plr0skin1 from "./../img/plr1skins/plr1skin1.png";
import plr0skin2 from "./../img/plr1skins/plr1skin2.png";
import plr0skin3 from "./../img/plr1skins/plr1skin3.png";
import plr0skin4 from "./../img/plr1skins/plr1skin4.png";
import plr0skin5 from "./../img/plr1skins/plr1skin5.png";
import plr1skin0 from "./../img/plr2skins/plr2skin0.png";
import plr1skin1 from "./../img/plr2skins/plr2skin1.png";
import plr1skin2 from "./../img/plr2skins/plr2skin2.png";
import plr1skin3 from "./../img/plr2skins/plr2skin3.png";
import plr1skin4 from "./../img/plr2skins/plr2skin4.png";
import plr1skin5 from "./../img/plr2skins/plr2skin5.png";
import { useNavigate } from "react-router";

const GamePage = () => {
    useEffect(() => {
        awaitConnection()
        drawMoves()
        fillMatrix()
        checkWin()
        waitMove()
    }, []) 

    const navigate = useNavigate()

    const [player2data, setPlayer2Data] = useState({skin: localStorage.getItem('player2Skin'), login: localStorage.getItem('player2Login')});

    let secondPlayerWaitFlag = true ///ожидание хода
    let connectionFlag = true ///подключение игрока

    const plr0skins = {0: plr0skin0, 1: plr0skin1, 2: plr0skin2, 3: plr0skin3, 4: plr0skin4, 5: plr0skin5}
    const plr1skins = {0: plr1skin0, 1: plr1skin1, 2: plr1skin2, 3: plr1skin3, 4: plr1skin4, 5: plr1skin5}

    const [matrix, setMatrix] = useState([
        [0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],
        [0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],
        [0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8]
    ])
    let moveList = JSON.parse(localStorage.getItem("moves"))

    let winFlag = 0

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
        
        let res;
        if (localStorage.getItem("gameId")){
            res = await UserReg.GetInfAboutGame(localStorage.getItem("gameId"))
            moveToLocalStore({winFlag: res.winFlag, gameName: res.name, isPrivate: res.isPrivate})
        }
        else{
            return;
        }

        if (res.player2Id !== null){
            const userData1 = await UserReg.GetInfAboutUser(res.player1Id)
            const userData2 = await UserReg.GetInfAboutUser(res.player2Id) 
            moveToLocalStore({player1Skin: userData1.skin, player1Login: userData1.login})
            moveToLocalStore({player2Skin: userData2.skin, player2Login: userData2.login})
            setPlayer2Data({skin: userData2.skin, login: userData2.login})
            connectionFlag = false;
            return;
        }  
    }

    async function makeMove(blockId, boxId){
        if ((localStorage.getItem("player1Login") !== null) && (localStorage.getItem("player2Login") !== null) && (+localStorage.getItem("winFlag") === 0) 
        && ((JSON.parse(localStorage.getItem("moves")).length % 2) === +localStorage.getItem("number")) 
        && (document.getElementById(boxId).style.border === '4px solid rgb(60, 214, 84)')) {
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
                passivePlayer.style.borderColor = "rgb(60,214,84)"

                secondPlayerWaitFlag = true
                checkWin()
                waitMove()
            }
        }
        return undefined /// если нет второго игрока
    }
    //// fix
    async function drawMoves(){
        const res = await Game.getGameMoves(localStorage.getItem("gameId"))
        if (res.length === 0){
            document.getElementById('b4').style.border = '4px solid rgb(60, 214, 84)'
        }
        for (let i = 0; i < res.length; i++){
            const box = document.getElementById('b'+res[i][3]);
            const block = document.getElementById(res[i])
            let newMatrix =  Object.assign([], matrix)
            if (block != undefined){
                if (i % 2 === 0){
                    block.style.backgroundImage = "url("+plr0skins[localStorage.getItem("player1Skin")]+")"
                    newMatrix[res.at(-1)[1]].splice(res.at(-1)[3], 1, "X") //запись хода первого игрока в матрицу
                    setMatrix(newMatrix)
                                      
                }
                else{
                    block.style.backgroundImage = "url("+plr1skins[localStorage.getItem("player2Skin")]+")"
                    newMatrix[res.at(-1)[1]].splice(res.at(-1)[3], 1, "O") // запись хода второго игрока в матрицу
                    setMatrix(newMatrix)
                }
                if ((res.length === 1) && (res[0][1] === res[0][3])){ //если первый ход сделан в центральную клетку
                    block.style.border = '2px solid rgb(60, 214, 84)';
                    box.style.border = '4px solid rgb(60, 214, 84)';
                }
                else if (res.length >= 2){
                    if (i === res.length-2){ //возвращаем ранее отмечанный предпоследний ход
                        block.style.border = '2px solid black';
                        box.style.border = '4px solid black';
                    }
                    if (i === res.length-1){ //отмечаем последний ход
                        block.style.border = '2px solid rgb(60, 214, 84)';
                        box.style.border = '4px solid rgb(60, 214, 84)';
                    }
                }
                else{ //первый ход отличается от остальных
                    block.style.border = '2px solid rgb(60, 214, 84)';
                    box.style.border = '4px solid rgb(60, 214, 84)';
                    document.getElementById('b4').style.border = '4px solid black';
                    console.log("первый ход")
                }           
            }
        }
        console.log("matrix", matrix)
        localStorage.setItem("moves", JSON.stringify(res))
    }

    async function waitMove(){
        while (secondPlayerWaitFlag) {
            await new Promise(resolve => setTimeout(resolve, 500));
            let res;
            if (localStorage.getItem("gameId")){
                res = await Game.getGameMoves(localStorage.getItem("gameId"));
            }
            else{
                return;
            }
            if (res.length % 2 === +localStorage.getItem("number")){
                await drawMoves();

                const activePlayer = document.getElementById("player-"+localStorage.getItem("number"))
                const passivePlayer = document.getElementById("player-"+((+localStorage.getItem("number") + 1) % 2))
                activePlayer.style.borderColor = "rgb(60,214,84)"
                passivePlayer.style.borderColor = "black"

                secondPlayerWaitFlag = false;
                checkWin()
                return;
            }
        }
    }

    
    async function checkWin(){
        let player = ''
        let box = null 
        const res = await UserReg.GetInfAboutGame(localStorage.getItem("gameId"))
        const moves = res.moves
        winFlag = res.winFlag
        if (moves.length !== 0){ // для начала игры(ходов нет)
            if (moves.length % 2 === 0){
                player = "O"
            }
            else{
                player = "X"
            }
        }
        else{
            return 
        }
        box = moves.at(-1)[1]
        if (winFlag === 0){
            if ((matrix[box][0] == player && matrix[box][1] == player && matrix[box][2] == player) ||
            (matrix[box][3] == player && matrix[box][4] == player && matrix[box][5] == player )||
            (matrix[box][6] == player && matrix[box][7] == player && matrix[box][8] == player )||
            (matrix[box][0] == player && matrix[box][3] == player && matrix[box][6] == player )||
            (matrix[box][1] == player && matrix[box][4] == player && matrix[box][7] == player )||
            (matrix[box][2] == player && matrix[box][5] == player && matrix[box][8] == player )||
            (matrix[box][0] == player && matrix[box][4] == player && matrix[box][8] == player )||
            (matrix[box][2] == player && matrix[box][4] == player && matrix[box][6] == player )||
            ((matrix[moves.at(-1)[3]].every(item => isNaN(item))))){
                console.log("win player", player)
                if (player === "X"){
                    winFlag = 1
                }
                else{
                    winFlag = 2
                }
                console.log("change win flag", winFlag)
                localStorage.setItem("winFlag", winFlag)
                changeWinFlag()
            }
            else{
                console.log("res", res, moves)
                console.log("not win", player, box, localStorage.getItem("number"))
                return
            }
        }
        else{
            changeWinFlag()
        }
    }

    async function changeWinFlag(){
        const res = await Game.ChangeWinFlag({id: localStorage.getItem("gameId"), winFlag: winFlag })
            if (!res.result){
                alert("Error: " + res.result)
            }
            else{
                if (winFlag === (+localStorage.getItem("number") + 1)){
                    document.getElementById("flag").style.zIndex = "10"
                    document.getElementById("winFlag").style.display = "flex"
                }
                else{
                    document.getElementById("flag").style.zIndex = "10"
                    document.getElementById("loseFlag").style.display = "flex"
                }
            }        
    }

    async function deleteGame(){
        if (localStorage.getItem("number") == 0){
            await Game.DeleteGame(localStorage.getItem("gameId"))
            localStorage.removeItem("gameId")
            console.log("game is delete")
            navigate("/")
        }
        else{
            localStorage.removeItem("gameId")
            console.log("not delete game")
            navigate("/")
        }
    }

    async function fillMatrix(){
        const res = await Game.getGameMoves(localStorage.getItem("gameId"))
        let newMatrix = []
        for (var i = 0; i < res.length; i += 1){
            newMatrix = Object.assign([], matrix)
            if (i % 2 == 0){
                newMatrix[res.at(i)[1]].splice(res.at(i)[3], 1, "X")
                setMatrix(newMatrix)
            }
            else{
                newMatrix[res.at(i)[1]].splice(res.at(i)[3], 1, "O")
                setMatrix(newMatrix)
            }
            
        }
        return
    }

    return(
        <div>
            <div className={classes.h1}>
                <h1>{localStorage.getItem("gameName")}</h1>
            </div>
            <div className={classes.flag} id="flag">
                <div className={classes.winFlag} id = "winFlag">
                    <h1>Victory</h1>
                    <button className={classes.btn} onClick={deleteGame}>Back to the menu</button>
                </div>
                <div className={classes.loseFlag} id = "loseFlag">
                    <h1>Lose</h1>
                    <button className={classes.btn} onClick={deleteGame}>Back to the menu</button>
                </div>
            </div>
            <div className={classes.container}>
                <div className={classes.player0} id="player-0">
                    <div>
                        <h3>{localStorage.getItem("player1Login")}</h3>
                        <img className={classes.skin} src={plr0skins[localStorage.getItem('player1Skin')]} alt = "skin"/>
                    </div>
                </div>
                
                <div className={classes.allField}>
                    
                    <Box9x9 getId={makeMove}/>
                </div>
                <div className={classes.player1} id="player-1">
                    <div>
                        <h3>{player2data.login}</h3>
                        <img className={classes.skin} src={plr1skins[player2data.skin]} alt = "skin"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GamePage;