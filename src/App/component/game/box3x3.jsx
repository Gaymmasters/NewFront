import React from "react";
import Block from './block';
import classes from "./game.module.css";

const Box3x3 = (props) => {
    return(
        <div id = {props.boxId} style= {{
            margin: "10px",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "4px solid black",}}>
            <div className={classes.lineBlocks3x3}>
                <Block boxId={props.boxId} blockId = "s0" getId={props.getId}/>
                <Block boxId={props.boxId} blockId = "s1" getId={props.getId}/>
                <Block boxId={props.boxId} blockId = "s2" getId={props.getId}/>
            </div>
            <div className={classes.lineBlocks3x3}>
                <Block boxId={props.boxId} blockId = "s3" getId={props.getId}/>
                <Block boxId={props.boxId} blockId = "s4" getId={props.getId}/>
                <Block boxId={props.boxId} blockId = "s5" getId={props.getId}/>
            </div>
            <div className={classes.lineBlocks3x3}>
                <Block boxId={props.boxId} blockId = "s6" getId={props.getId}/>
                <Block boxId={props.boxId} blockId = "s7" getId={props.getId}/>
                <Block boxId={props.boxId} blockId = "s8" getId={props.getId}/>
            </div>
        </div>
    )
}

export default Box3x3;