import React from "react";
import { Button } from "components";
import "./index.css";
import { withRouter } from "react-router-dom";


import { scroller } from 'react-scroll';


const anchor = section => {

    scroller.scrollTo(section, {
        duration: 500,
        hashSpy: true,
        delay: 100,
        smooth: true,
        offset: -100
    });
};


const CatergoryButtons = ({ activeData }) => {
    return (
        <div style={{ flexGrow: 1, marginBottom: 50 }}>
            <ul className="category-buttons-container">
                <li >
                    <Button
                        title={`CONTACT US`}
                        onClick={() => anchor('contact')}
                        type="yamaha-btn yamaha-btn-primary"
                    />
                </li>
                {/* <li style={{ margin: "0px 10px" }}>
                    <Button
                        title={`CONTACT US`}
                        onClick={() => anchor('contact')}
                        type={`yamaha-btn yamaha-btn-${
                            isMobile ? "primary" : "outline"
                        }`}
                    />
                </li> */}
            </ul>
        </div>
    );
};

export default withRouter(CatergoryButtons);
