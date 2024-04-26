import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import "./loginReg.css";
import LoginPage from './LoginPage';
import logo from "../img/logo.png";
import * as valid from "email-validator";
import UserReg from '../../../API/RegUser';
import { moveToLocalStore } from '../../../features/store';

const RegPage = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    async function reg(){
        if (valid.validate(data.email)){
            if (data.password.length >= 5 && data.password.length <= 20){
                const res = await UserReg.Reg(data)
                if (!res.result){
                    alert("Error:" + res.message);
                }
                else{
                    moveToLocalStore({...res, isLogin: true});
                    navigate('/', {replace: false})
                }
            }
            else alert("Invalid password length");
        }
        else alert("Invalid e-mail");
    }

    return(
        <div className='container'>
            <img src= {logo} alt = "logo"></img>
            <h1>Sing up</h1>
            <div className='group'>
                <div className='gp' id='gp-in'>  
                    <label>e-mail</label>
                    <input 
                    type='email'
                    className='inp-group'
                    onChange={e => setData({...data,email: e.target.value})} />
                    <label>Login</label>
                    <input
                    type='login'
                    className='inp-group' 
                    onChange={e => setData({...data,login: e.target.value})} />
                    <label>Password</label>
                    <input 
                    type='password'
                    className='inp-group' 
                    onChange={e => setData({...data,password: e.target.value})} />
                </div>
                <div className='gp' id='gp-btn'>
                    <button className='confirm'onClick={reg} id='reg'> Confirm </button>
                <Link to="/login">
                    <button>Log in</button>
                </Link>
                </div>
            </div>
        </div>
    );
}

export default RegPage;