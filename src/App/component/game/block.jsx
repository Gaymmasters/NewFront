import React from "react";

const Block = (props) => {
    return(
        <div id = {props.boxId + props.blockId} onClick={() => {props.getId(props.blockId, props.boxId)}}
        style={{
            border: "solid 2px black",
            display: "inline-block",
            padding: "20px 20px",
            margin: "2px" 
        }}>
        </div>
    )
}

export default Block;