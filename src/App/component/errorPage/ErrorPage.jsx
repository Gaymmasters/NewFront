import React from "react";

const ErrorPage = () =>{
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