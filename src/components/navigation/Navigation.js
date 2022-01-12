import React from "react";
import Logo from "../logo/Logo";
import './navigation.css'

const Navigation = ({onRouteChange})=>{
    return(
        <nav className="nav">
            <Logo/>
            <p 
                className="fs3 link dim underlined pa3 pointer black"
                onClick={()=> onRouteChange('signin')}
                >Signout</p>
        </nav>
    )
}

export default Navigation;