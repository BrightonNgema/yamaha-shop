import React from "react";
import { Button } from "components";
import "./index.css";
import { withRouter } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { scroller } from "react-scroll";

const anchor = id => {
    scroller.scrollTo(id, {
        duration: 500,
        hashSpy: true,
        delay: 100,
        smooth: true,
        offset: -100
    });
};

const CatergoryButtons = ({ activeData }) => {
    const isHide =
        activeData.title.toLowerCase() === "yamaha" ||
        activeData.title.toLowerCase() === "racing" ||
        activeData.title.toLowerCase() === "club yamaha";
    return (
        <div style={{ flexGrow: 1, marginBottom: 50 }}>
            <ul className="category-buttons-container">
                <li className="getInTouch">
                    <Button
                        title={`LEARN MORE`}
                        onClick={() => anchor("about-intro")}
                        type="yamaha-btn yamaha-btn-primary"
                    />
                </li>
                {!isHide && (
                    <li style={{ margin: "0px 10px" }}>
                        <Button
                            title={`JOIN ${activeData.title}`}
                            onClick={() => anchor("about-contact-form")}
                            type={`yamaha-btn yamaha-btn-${
                                isMobile ? "primary" : "outline"
                            }`}
                        />
                    </li>
                )}
            </ul>
        </div>
    );
};

export default withRouter(CatergoryButtons);
