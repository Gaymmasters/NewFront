import React, { useEffect, useState } from "react";
import classes from "./game.module.css";
import Box9x9 from "./box9x9";
import Game from "../../../API/Game";
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
import UserReg from "../../../API/RegUser";


const WithBotGamePage = () => {
    useEffect(() => {
        drawMoves()
        fillMatrix()
    }, [])

    const navigate = useNavigate()

    const plr0skins = {0: plr0skin0, 1: plr0skin1, 2: plr0skin2, 3: plr0skin3, 4: plr0skin4, 5: plr0skin5}
    const plr1skins = {0: plr1skin0, 1: plr1skin1, 2: plr1skin2, 3: plr1skin3, 4: plr1skin4, 5: plr1skin5}

    const [matrix, setMatrix] = useState([
        [0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],
        [0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],
        [0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8]
    ])
    let moveList = JSON.parse(localStorage.getItem("moves"))

    let winFlag = 0

    async function makeMove(blockId, boxId){
        if ((+localStorage.getItem("winFlag") === 0) 
        && ((JSON.parse(localStorage.getItem("moves")).length % 2) === +localStorage.getItem("number")) 
        && (document.getElementById(boxId).style.border === '4px solid rgb(60, 214, 84)')) {
            const move = boxId + blockId 
            moveList = await Game.getGameMoves(localStorage.getItem("gameId"))
            if (moveList.includes(move)){
                return undefined
            }
            const res = await Game.moveBot({move: move, id: localStorage.getItem('gameId'),
            difficulty: localStorage.getItem("difficulty")})
            if (!res.result){
                alert("Error: " + res.message)
            }
            else{
                console.log(moveList, JSON.parse(localStorage.getItem("moves")))
                await drawMoves()
            }
        }
        return undefined
    }

    async function drawMoves(){
        const res = await Game.getGameMoves(localStorage.getItem("gameId"))
        console.log("res",res)
        if (res.length === 0){
            document.getElementById('b4').style.border = '4px solid rgb(60, 214, 84)'
        }
        for (let i = 0; i < res.length; i++){
            const PrevBox = document.getElementById('b'+res[i][1]);
            const NextBox = document.getElementById('b'+res[i][3]);
            const block = document.getElementById(res[i])
            let newMatrix =  Object.assign([], matrix)
            if (block != undefined){
                if (i % 2 === 0){
                    block.style.backgroundImage = "url("+plr0skins[localStorage.getItem("skin")]+")"
                    newMatrix[res.at(-1)[1]].splice(res.at(-1)[3], 1, "X")
                    setMatrix(newMatrix)                    
                }
                else{
                    block.style.backgroundImage = "url("+plr1skins[(+localStorage.getItem("skin") + 3) % 6]+")"
                    block.style.border = '2px solid black'
                    newMatrix[res.at(-1)[1]].splice(res.at(-1)[3], 1, "O")
                    setMatrix(newMatrix)
                }
                if (i === res.length - 1){
                    NextBox.style.border = '4px solid rgb(60, 214, 84)'
                    block.style.border = '2px solid rgb(60, 214, 84)'
                    console.log('i === res.length-1', res[i], block)
                }
                if (i === res.length - 2){
                    PrevBox.style.border = '4px solid black'
                    console.log('i === res.length-2', res[i], block)
                }
                }
                console.log("new matrix", newMatrix)
            }
        localStorage.setItem("moves", JSON.stringify(res))
        console.log("matrix", matrix)
        checkWin()
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
        await Game.DeleteGame(localStorage.getItem("gameId"))
        localStorage.removeItem("gameId")
        console.log("game is delete")
        navigate("/")
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
                        <h3>{localStorage.getItem("login")}</h3>
                        <img className={classes.skin} src={plr0skins[localStorage.getItem('skin')]} alt = "skin"/>
                    </div>
                </div>
                <div className={classes.allField}>
                    <Box9x9 getId={makeMove}/>
                </div>
                <div className={classes.player1} id="player-1">
                    <div>
                        <h3>Skynet</h3>
                        <img className={classes.skin} src={plr1skins[(+localStorage.getItem("skin") + 3) % 6]} alt = "skin"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WithBotGamePage;