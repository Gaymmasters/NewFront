import React from "react";

const Block = (props) => {
    return(
        <div id = {props.boxId + props.blockId} onClick={() => {props.getId(props.blockId, props.boxId)}}
        style={{
            width: "50px",
            height: "50px",
            border: "solid 2px black",
            display: "inline-block",
            margin: "2px" ,
            borderRadius: "5px"
        }}>
        </div>
    )
}

export default Block;