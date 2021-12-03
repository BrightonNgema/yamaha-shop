import React from "react";
import "./index.css";

import LoadingIMage from './sprite_60fps.svg'
const ActivityLoader = ({ loading, children }) => {
    if (loading) {
        return (
            <div className="spinnerContainer">
                {/* <div style={{ width: "50%", top: "40%" }}>
                    <img
                        alt="logo"
                        src={images.yamaha_default_logo_white}
                        style={{ width: "100%" }}
                    />
                </div>
                <div>
                    <Loader
                        type="RevolvingDot"
                        color={colors.primary}
                        height={35}
                        width={35}
                    />
                </div> */}
                <div className="shapeshifter play" style={{ backgroundImage:`url(${LoadingIMage})`, marginTop:'auto', marginBottom:'auto' }}></div>

            </div>
        );
    }
    return children
};

export default ActivityLoader;
