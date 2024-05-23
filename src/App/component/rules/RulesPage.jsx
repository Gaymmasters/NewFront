import React from "react";
import classes from "./rulesPage.module.css";
import rule1 from "../img/rules/rule1.png";
import rule2 from "../img/rules/rule2.png";
import rule3 from "../img/rules/rule3.png";
import { useNavigate } from "react-router-dom";
const RulesPage = () => {
    const navigate = useNavigate()
    return(
        <div className={classes.container}>
            <h1>Rules</h1>
            <div className={classes.flex}>
                <div className={classes.rules} id={classes.r1}>
                    <h2>1</h2>
                    <div className={classes.backdrop}>
                        <img className={classes.photo} src= {rule1} alt = "rule1"></img>
                        <p>You make a move in a lighted field.</p>
                    </div>
                        
                </div>
                <div className={classes.rules} id={classes.r2}>
                    <h2>2</h2>
                    <div className={classes.backdrop}>
                        <img className={classes.photo} src= {rule2} alt = "rule2"></img>
                        <p>The opponent moves after you in the field corresponding to your turn.</p>
                    </div>   
                </div>
                <div className={classes.rules} id={classes.r3}>
                    <h2>3</h2>
                    <div className={classes.backdrop}>
                        <img className={classes.photo} src= {rule3} alt = "rule3"></img>
                        <p>The game continues until one of the players builds a line a fields.</p>
                    </div>    
                    
                </div>
            </div>
            <button className={classes.btn} onClick={()=>{navigate('/')}}>Back</button>
        </div>
    )
}

export default RulesPage;