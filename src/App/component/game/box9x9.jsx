import React from "react";
import Box3x3 from "./box3x3";
import classes from "./game.module.css";

const Box9x9 = (props) => {
    return(
        <div>
            <div className={classes.gameFieldBox3x3}>
                <Box3x3 boxId = "b0" getId={props.getId}/>
                <Box3x3 boxId = "b1" getId={props.getId}/>
                <Box3x3 boxId = "b2" getId={props.getId}/>
            </div>
            <div className={classes.gameFieldBox3x3}>
                <Box3x3 boxId = "b3" getId={props.getId}/>
                <Box3x3 boxId = "b4" getId={props.getId}/>
                <Box3x3 boxId = "b5" getId={props.getId}/>
            </div>
            <div className={classes.gameFieldBox3x3}>
                <Box3x3 boxId = "b6" getId={props.getId}/>
                <Box3x3 boxId = "b7" getId={props.getId}/>
                <Box3x3 boxId = "b8" getId={props.getId}/>
            </div>
        </div>
    )
}

export default Box9x9;