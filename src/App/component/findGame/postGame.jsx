import React from "react";
import classes from "./findGame.module.css";

const PostGame = (props) =>{
    const id = props.game.id
    return(
        <div className={classes.post}>
            <p className={classes.postName}>{props.game.name}</p> 
        </div>
    );
}

export default PostGame;