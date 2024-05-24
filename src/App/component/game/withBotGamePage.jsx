import React, { useEffect } from "react";
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


const WithBotGamePage = () => {
    useEffect(() => {
        drawMoves()
    }, [])

    const plr0skins = {0: plr0skin0, 1: plr0skin1, 2: plr0skin2, 3: plr0skin3, 4: plr0skin4, 5: plr0skin5}
    const plr1skins = {0: plr1skin0, 1: plr1skin1, 2: plr1skin2, 3: plr1skin3, 4: plr1skin4, 5: plr1skin5}

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
                return undefined
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
        return undefined
    }

    async function drawMoves(){
        const res = await Game.getGameMoves(localStorage.getItem("gameId"))
        console.log(res)
        if (res.length === 0){
            document.getElementById('b4').style.border = '4px solid blue'
        }
        for (let i = 0; i < res.length; i++){
            const PrevBox = document.getElementById('b'+res[i][1]);
            const NextBox = document.getElementById('b'+res[i][3]);
            const block = document.getElementById(res[i])
            if (block != undefined){
                if (i % 2 === 0){
                    block.style.backgroundImage = "url("+plr0skins[localStorage.getItem("skin")]+")"                    
                }
                else{
                    block.style.backgroundImage = "url("+plr1skins[(+localStorage.getItem("skin") + 3) % 6]+")"
                    block.style.border = '2px solid black'
                }
                if (i === res.length - 1){
                    NextBox.style.border = '4px solid blue'
                    block.style.border = '2px solid blue'
                    console.log('i === res.length-1', res[i], block)
                }
                if (i === res.length - 2){
                    PrevBox.style.border = '4px solid black'
                    console.log('i === res.length-2', res[i], block)
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