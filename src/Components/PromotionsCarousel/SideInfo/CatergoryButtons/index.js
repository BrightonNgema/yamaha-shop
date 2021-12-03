import React from "react";
import { Button } from "components";
import "./index.css";
import { withRouter } from "react-router-dom";
import { isMobile } from "react-device-detect";

// const anchor = id => {
//     scroller.scrollTo(id, {
//         duration: 500,
//         hashSpy: true,
//         delay: 100,
//         smooth: true,
//         offset: -100
//     });
// };

const CatergoryButtons = ({ activeData }) => {
    const isHide = activeData.btn_two_title;
    return (
        <div style={{ flexGrow: 1, marginBottom: 50 }}>
            <ul className="category-buttons-container">
                <li className="getInTouch">
                    <Button
                        title={activeData.btn_one_title}
                        link={activeData.btn_one_link}
                        type="yamaha-btn yamaha-btn-primary"
                    />
                </li>
                {isHide && (
                    <li style={{ margin: "0px 10px" }}>
                        <Button
                            title={activeData.btn_two_title}
                            link={activeData.btn_two_link}
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
