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


const GamePage = () => {
    useEffect(() => {
        drawMoves(localStorage.getItem("moves"))
    }, []) 

    const skin = {0: skin0, 1:skin1, 2:skin2, 3:skin3, 4:skin4, 5:skin5}

    const matrix = [
        [0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],
        [0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],
        [0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8]
    ]
    const moveList = JSON.parse(localStorage.getItem("moves"))
    const moveList2 = ["b4s3",'b3s1','b1s2']

    async function makeMove(blockId, boxId){
        if ((localStorage.getItem("opponentId") !== null) && (+localStorage.getItem("winFlag") === 0) 
        && ((moveList.length % 2) === +localStorage.getItem("number"))) {
            const move = boxId + blockId 
            if (moveList.includes(move)){
                return undefined /// проверка уникальности хода
            }
            const res = await Game.makeMove({move: move, id: localStorage.getItem('gameId')})
            if (!res.result){
                alert("Error: " + res.message)
            }
            else{
                moveList.push(move)
                localStorage.setItem("moves", JSON.stringify(moveList))
                console.log(moveList,moveList.length)
                drawMoves(moveList)
                waitMove()
            }
        }
        return undefined /// если нет второго игрока
    }
    //// fix
    async function drawMoves(moves){
        const res = await Game.getGameMoves(localStorage.getItem("gameId"))
        if (!checkMoves(moves, res)){
            for (let i = 0; i < res.length; i++){
                const block = document.getElementById(res[i])
                if (block !== undefined){
                    if (i % 2 === 0){
                        block.style.backgroundColor = "blue" /// отмечаем ход первого игрока
                    }
                    else{
                        block.style.backgroundColor = "red" /// отмечаем второго игрока 
                    }
                }
                return undefined ///  fix
            }
        }
    }

    async function waitMove(){ 
        return undefined /// ожидание хода противника 
    }

    function checkMoves(localMoves, serverMoves){
        for (let i = 0; i < serverMoves.length; i++){
            if (serverMoves[i] === localMoves[i]){
                continue
            }
            return false /// fix
        }
        return true
    }
    return(
        <div>
            <div className={classes.allField}>
                <Box9x9 getId={makeMove}/>
            </div>
            <button onClick={drawMoves}>vghjkol;</button>

            {/* <div>
                {matrix.map(box => (
                    <div
                    key = {box.id}
                    id = {"block-"+box.id}
                    className={classes.field}
                    onClick={() => makeMove(box.id)}>
                        {block.map()}
                    </div>
                ))}
            </div> */}
        </div>
        
    )
}

export default GamePage;