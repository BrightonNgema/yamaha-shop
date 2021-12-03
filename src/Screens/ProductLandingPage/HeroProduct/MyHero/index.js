import React from "react";
import "./index.css";
import { withRouter } from 'react-router-dom';

const HeroContainer = ({ heroImage,isMoto}) => {
    const styling = {
        minHeight: isMoto ? '200vh' : '150vh',
        backgroundColor: "#1E1E1E", 
        margin: "auto", 
        backgroundImage: `url(${heroImage})`, 
        backgroundSize: 'contain', 
        backgroundRepeat: 'no-repeat', 
        backgroundPositionY: 'center',
        backgroundPositionX: isMoto
    }
    return (
        <div>
            <div style={styling}/>
        </div>
    )
};

const MyHero = withRouter(HeroContainer)
export { MyHero };
