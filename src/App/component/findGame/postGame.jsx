import React from "react";
import classes from "./findGame.module.css";
import privateGame from "./../img/privateGame.png"

const PostGame = (props) =>{
    const id = props.post.id
    const gameName = props.post.name
    const isPrivate = props.post.isPrivate
    if (isPrivate){
        return(
            <div className={classes.post}>
                <img className={classes.imagePrivateGame} src = {privateGame} alt = "Private game"/>
                <p className={classes.postName}>{props.post.name}</p> 
            </div>
        );
    }
    else{
        return(
            <div className={classes.post}>
                <p className={classes.postName}>{props.post.name}</p> 
            </div>
        );
    }
}

export default PostGame;