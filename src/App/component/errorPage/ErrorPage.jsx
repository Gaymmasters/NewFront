import React, { useEffect } from "react";

const ErrorPage = () =>{
    useEffect(() => {
        ClearingLocalHost()
    }, [])

    async function ClearingLocalHost(){
        const keys = ["gameName","opponentId", "player1Skin", "player2Skin",
        "winFlag", "moves", "player1Login","player2Login","isPrivate", "isBot"]
        for (var k = 0; k < keys.length; k += 1){
            localStorage.removeItem(keys[k])
        }
    } 

    return(
        <div style={{
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            margin: "auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "white",
            width: "300px",
            height: "200px",
            borderRadius: "10px"
        }}>
            <h1>This page doesn't exist </h1>
        </div>
    )
}

export default ErrorPage;