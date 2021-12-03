import React from "react";
import "../index.css";

const typeNames = {
    golf_cars: "GOLF CARS",
    home_audio: "HOME AUDIO EQUIPMENT",
    pro_audio: "PRO AUDIO EQUIPMENT",
    power_products: "POWER PRODUCTS",
    music: "MUSICAL INSTRUMENTS",
    marine: "MARINE",
    motorcycles: "MOTORCYCLES"
};

export const TopHeader = ({ type }) => {
    return (
        <div>
            <h1 className="warranty-heading">
                {`${typeNames[type]} WARRANTY REGISTRATION`}
            </h1>
            {type === "home_audio" && (
                <span className="warranty-subheading">
                    Extended 2 Year Guarantee<br/>
                    Extend your 1 year guarantee by registering online
                </span>)}
        </div>
    );
};
