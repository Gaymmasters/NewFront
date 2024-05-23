import React, { useEffect, useState } from "react";
import classes from "./settings.module.css";
import "./settings.css";
import { useNavigate } from "react-router-dom";
import UserReg from "../../../API/RegUser";
import skin0  from "./../img/settingsSkin/skin0.png";
import skin1  from "./../img/settingsSkin/skin1.png";
import skin2  from "./../img/settingsSkin/skin2.png";
import skin3  from "./../img/settingsSkin/skin3.png";
import skin4  from "./../img/settingsSkin/skin4.png";
import skin5  from "./../img/settingsSkin/skin5.png";

const SettingsPage = () => {
    useEffect(() => {
        const CurrentTile = document.getElementById("skin-"+localStorage.getItem("skin"));
        CurrentTile.className = "selected";
    }, [])
    const [newLogin, setNewLogin] = useState('');
    const navigate = useNavigate()
    async function changeName(){
        if (!(newLogin.trim() === '')){
            const res = await UserReg.ChangeLogin({login: newLogin});
            if (!res.result){
                alert("Error: " + res.result);
            }
            else{
                localStorage.setItem("login", newLogin);
                setNewLogin("")
            }
        }
        else{
            alert("Invalid login")
        }
    } 
    
    const [newSkin, setNewSkin] = useState(+localStorage.getItem("skin"));
    async function changeSkin(){
        if (localStorage.getItem("skin") !== newSkin){
            const res = await UserReg.ChangeSkin({skin: newSkin});
            if (!res.result){
                alert("Error: " + res.result);
            }
            else{
                localStorage.setItem("skin", newSkin);
            }
        } 
    }

    const tiles = [
        {id: 0, image: skin0, alt: "skin0"},
        {id: 1, image: skin1, alt: "skin1"},
        {id: 2, image: skin2, alt: "skin2"},
        {id: 3, image: skin3, alt: "skin3"},
        {id: 4, image: skin4, alt: "skin4"},
        {id: 5, image: skin5, alt: "skin5"},
    ];
    const handleTileClick = (id) => {
        if (id !== newSkin){
            const CurrentTile = document.getElementById("skin-"+id);
            const PrevTile = document.getElementById("skin-"+newSkin);

            CurrentTile.className = "tile selected";
            PrevTile.className = "tile"
            setNewSkin(id)
        };
    };

    return(
        <div className={classes.settingsContainer}>
            <h1>Settings</h1>
            <div className={classes.names}>
                <label className={classes.label}>Name</label>
                <input
                value={newLogin}
                type = "text"
                className={classes.inpName}
                placeholder={localStorage.getItem("login")}
                onChange={e => setNewLogin(e.target.value)}/> 
                <button className={classes.btnChange} onClick={changeName}>Change</button>
            </div>
            <div className={classes.sk}>
                <label className="tile-label">Skin</label>
                <div className="tile-grid">
                    {tiles.map(tile => (
                    <div
                        key={tile.id}
                        id = {"skin-"+tile.id}
                        className="tile"
                        onClick={() => handleTileClick(tile.id)}>
                        <img className="image" src={tile.image} alt={tile.alt} />
                    </div>))}
                </div>
                <button className={classes.btnChange} onClick={changeSkin}>Change</button>
            </div>
            <button className={classes.btnBack} onClick={()=>{navigate('/')}}>Back</button>
        </div>
    )
}

export default SettingsPage;