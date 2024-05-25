import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginReg.css'
import logo from "../img/logo.png";
import UserReg from '../../../API/RegUser';
import * as valid from "email-validator";
import { moveToLocalStore } from '../../../features/store';

const LoginPage = () => {
    useEffect(() => {
        ClearingLocalHost()
    }, [])

    function ClearingLocalHost(){
        const keys = ["gameName","opponentId", "player1Skin", "player2Skin",
        "winFlag", "moves", "player1Login","player2Login","isPrivate", "isBot"]
        for (var k = 0; k < keys.length; k += 1){
            localStorage.removeItem(keys[k])
        }
    } 

    const [data, setData] = useState({});
    const navigate = useNavigate();
        async function logIn(){
        if (valid.validate(data.email)){
            if (data.password.length >= 5 &&  data.password.length <=20){    
                const res = await UserReg.LogIn(data)
                if (!res.result){
                    alert('Error:' + res.message);
                }
                else{
                    moveToLocalStore({...res, isLogin: true});
                    navigate("/", {replace: false});
                }
            }
            else alert("Invalid password");    
        }
        else alert("Invalid e-mail");
        } 

    return(
        <div className='container'>
            <img src= {logo} alt = "logo"></img>
            <h1>Log in</h1>
            <div className='group'>
                <div className='gp' id='gp-in'>  
                    <label>e-mail</label>
                    <input 
                    type='email'
                    className='inp-group'
                    onChange={e => setData({...data,email: e.target.value})}/>
                    <label>Password</label>
                    <input 
                    type='password'
                    className='inp-group' 
                    onChange={e => setData({...data,password: e.target.value})}/>
                </div>
                <div className='bloсk-btn'>
                    <button  className='confirm' style={{marginTop: 69}} onClick={logIn}> Confirm </button>
                </div>
                <div className='bloсk-btn'>
                    <button onClick={()=>{navigate('/reg')}}>Sing up</button>
                </div>
            </div>
        </div>
    );
}


export default LoginPage;