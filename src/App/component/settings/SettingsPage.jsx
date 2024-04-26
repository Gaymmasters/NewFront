import React, { useEffect, useState } from "react";
import classes from "./settings.module.css";
import { Link } from "react-router-dom";
import { moveToLocalStore } from "../../../features/store";
import UserReg from "../../../API/RegUser";
import SkinBlock from "./SkinBlock";


const SettingsPage = () => {
    const chosenColor = "rgb(1,1,1)"
    const notChosenColor = "rgba(1,1,1,0.5)"
    useEffect(() => {
        const CurrentBlock = document.getElementById("skin-"+localStorage.getItem("skin"));
        CurrentBlock.style.backgroundColor = chosenColor;
    }, [])
    const [newInf, setNewInf] = useState({login: localStorage.getItem("login"), password: localStorage.getItem("password"), skin: localStorage.getItem("skin")});
    async function ChangeInf(){
        if (!(newInf.login.trim() === '')){
            const res = await UserReg.ChangeInf(newInf);
            if (!res.result){
                alert("Error: " + res.result);
            }
            else{
                moveToLocalStore({...res,});
                setNewInf({login: "", password: localStorage.getItem("password"), skin: localStorage.getItem("skin")})
            }
        }
        else{
            alert("Invalid login")
            setNewInf({login: "", password: localStorage.getItem("password"), skin: localStorage.getItem("skin")})
        }
    } 
    
    function ChangeSkin(id){
        let prevSkinId = localStorage.getItem('skin');
        let Skin = id[5];
        const CurrentBlock = document.getElementById(id);
        CurrentBlock.style.backgroundColor = chosenColor;
        const PrevBlock = document.getElementById("skin-"+prevSkinId);
        if (PrevBlock !== null){
            PrevBlock.style.backgroundColor = notChosenColor;
        }
        localStorage.setItem("skin", Skin);
        console.log(Skin, CurrentBlock, PrevBlock)
    }

    async function sendSkin(){
        
    }

    return(
        <div className={classes.settingsContainer}>
            <h1>Settings</h1>
            <div className={classes.names}>
                <label className={classes.label}>Name</label>
                <input
                value={newInf.login}
                type = "text"
                className={classes.inpName}
                placeholder={localStorage.getItem("login")}
                onChange={e => setNewInf({...newInf, login: e.target.value})}/> 
                <button className={classes.btnChange} onClick={ChangeInf}>Change</button>
            </div>
            <div className={classes.sk}>
                <SkinBlock func={ChangeSkin}  id="skin-0" />
                <SkinBlock func={ChangeSkin}  id="skin-1" />
                <SkinBlock func={ChangeSkin}  id="skin-2" />
                <SkinBlock func={ChangeSkin}  id="skin-3" />
                <SkinBlock func={ChangeSkin}  id="skin-4" />
                <SkinBlock func={ChangeSkin}  id="skin-5" />
                <button className={classes.btnChange}>Change</button>
            </div>
            <Link to="/">
                <button className={classes.bthBack} onClick={sendSkin}>Back</button>
            </Link>
        </div>
    )
}

export default SettingsPage;