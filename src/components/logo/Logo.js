import React from "react";
import logo from './brain.png'
import './logo.css'

const Logo = ()=>{
    return(
        <div className="logo link pointer">
           <img src={logo} width={80} alt="logo"/>
        </div>
    )
}

export default Logo;