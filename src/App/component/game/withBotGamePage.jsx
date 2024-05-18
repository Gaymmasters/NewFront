import React from "react";
import classes from "./game.module.css";
import Box9x9 from "./box9x9";
import Game from "../../../API/Game";
import skin0  from "./../img/skin0.png";
import skin1  from "./../img/skin1.png";
import skin2  from "./../img/skin2.png";
import skin3  from "./../img/skin3.png";
import skin4  from "./../img/skin4.png";
import skin5  from "./../img/skin5.png";


const withBotGamePage = () => {


    const skin = {0: skin0, 1: skin1, 2: skin2, 3: skin3, 4: skin4, 5:skin5}

    const matrix = [
        [0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],
        [0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],
        [0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8]
    ]
    let moveList = JSON.parse(localStorage.getItem("moves"))


    async function makeMove(blockId, boxId){
        if ((+localStorage.getItem("winFlag") === 0) 
        && ((JSON.parse(localStorage.getItem("moves")).length % 2) === +localStorage.getItem("number")) 
        && (document.getElementById(boxId).style.border === '4px solid blue')) {
            const move = boxId + blockId 
            moveList = await Game.getGameMoves(localStorage.getItem("gameId"))
            if (moveList.includes(move)){
                return undefined /// проверка уникальности хода
            }
            const res = await Game.moveBot({move: move, id: localStorage.getItem('gameId')})
            if (!res.result){
                alert("Error: " + res.message)
            }
            else{
                console.log(moveList, JSON.parse(localStorage.getItem("moves")))
                await drawMoves()
            }
        }
        return undefined /// если нет второго игрока
    }
    //// fix
    async function drawMoves(){
        const res = await Game.getGameMoves(localStorage.getItem("gameId"))
        if (res.length === 0){
            document.getElementById('b4').style.border = '4px solid blue'
        }
        for (let i = 0; i < res.length; i++){
            const box = document.getElementById('b'+res[i][3]);
            const block = document.getElementById(res[i])
            if (block != undefined){
                if (i % 2 === 0){
                    block.style.backgroundImage = "url("+skin[localStorage.getItem("player1Skin")]+")"                    
                }
                else{
                    block.style.backgroundImage = "url("+skin[(+localStorage.getItem("player1Skin") + 3) % 6]+")"
                }
                if (res.length >= 2){
                    if (i === res.length-2){ //возвращаем ранее отмечанный предпоследний ход
                        block.style.border = '2px solid black';
                        box.style.border = '4px solid black';
                    }
                    if (i === res.length-1){ //отмечаем последний ход
                        block.style.border = '2px solid blue';
                        box.style.border = '4px solid blue';
                    } 
                }
                else{ //первый ход отличается от остальных
                    block.style.border = '2px solid blue';
                    box.style.border = '4px solid blue';
                    document.getElementById('b4').style.border = '4px solid black';
                }
                       
            }
        }
        localStorage.setItem("moves", JSON.stringify(res))
    }

    return(
        <div>
            <div className={classes.h1}>
                <h1>{localStorage.getItem("gameName")}</h1>
            </div>
            <div className={classes.container}>
                <div className={classes.player0} id="player-0">
                    <div>
                        <h3>{localStorage.getItem("player1Login")}</h3>
                        <img className={classes.skin} src={skin[localStorage.getItem('player1Skin')]} alt = "skin"/>
                    </div>
                </div>
                <div className={classes.allField}>
                    <Box9x9 getId={makeMove}/>
                </div>
                <div className={classes.player1} id="player-1">
                    <div>
                        <h3>Skynet</h3>
                        <img className={classes.skin} src={skin[(+localStorage.getItem("player1Skin") + 3) % 6]} alt = "skin"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withBotGamePage;