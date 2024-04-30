import React, { useEffect, useState } from "react";
import classes from "./settings.module.css";
import "./settings.css";
import { Link } from "react-router-dom";
import { moveToLocalStore } from "../../../features/store";
import UserReg from "../../../API/RegUser";
import skin0  from "./../img/skin0.png";
import skin1  from "./../img/skin1.png";
import skin2  from "./../img/skin2.png";
import skin3  from "./../img/skin3.png";
import skin4  from "./../img/skin4.png";
import skin5  from "./../img/skin5.png";

const SettingsPage = () => {
    useEffect(() => {
        const CurrentTile = document.getElementById("skin-"+localStorage.getItem("skin"));
        CurrentTile.className = "selected";
    }, [])
    const [newLogin, setNewLogin] = useState('');
    async function changeName(){
        if (!(newLogin.login.trim() === '')){
            const res = await UserReg.ChangeLogin(newLogin);
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
        if (localStorage.getItem("skin") != newSkin){
            const res = await UserReg.ChangeSkin(newSkin);
            if (!res.result){
                alert("Error: " + res.result);
            }
            else{
                localStorage.setItem("skin",newSkin);
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
            console.log(newSkin)
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
            <Link to="/">
                <button className={classes.btnBack}>Back</button>
            </Link>
        </div>
    )
}

export default SettingsPage;