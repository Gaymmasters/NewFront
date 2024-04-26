import React from "react";
import classes from "./settings.module.css";

const SkinBlock = (props) =>{
    return(
        <div>
            <div className={classes.skins} onClick={() => props.func(props.id)} id={props.id}/>
                {props.state}
        </div>
    );
}

export default SkinBlock;