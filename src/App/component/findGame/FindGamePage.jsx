import React, { useEffect, useState } from "react";
import PostGame from "./postGame";
import { Await, Link } from "react-router-dom";
import classes from "./findGame.module.css";
import UserReg from "../../../API/RegUser";


const FindGamePage = () =>{
    // useEffect
    const [games,setGame] = useState()
    async function getList(){
        const res = await UserReg.GamesList()
        return res
    }
    const res = getList()
    return(
        <div className={classes.fgpContainer}>
            <h1>Games</h1>
            <div className={classes.fgpPosts}>
                {res.map(game =>
                    <PostGame game={game} key={game.name}/>
                )}
            </div>
            <Link to="/">
                <button className={classes.fgpBtn}>Back</button>
            </Link>
        </div>
    );
}

export default FindGamePage;