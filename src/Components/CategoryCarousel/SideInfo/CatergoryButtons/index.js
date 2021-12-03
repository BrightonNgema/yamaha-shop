import React from "react";
import { Button } from "components";
import "./index.css";
import { withRouter } from "react-router-dom";

const CatergoryButtons = ({
    activeData,
    match,
    onMouseEnter,
    onMouseLeave
}) => {
    const music = activeData.name.toLowerCase() === "music";
    const category = music ? "instruments" : activeData.name;
    return (
        <div
            style={{ flexGrow: 1, marginBottom: 50 }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <ul className="category-buttons-container">
                <li>
                    <Button
                        title={`EXPLORE ${category}`}
                        link={`/category/${match.params.cat}/${activeData.name}`}
                        type="yamaha-btn yamaha-btn-primary"
                    />
                </li>
                <li style={{ margin: "0px 10px" }} className="getInTouch">
                    <Button
                        title="GET IN TOUCH"
                        link="/contact"
                        type="yamaha-btn yamaha-btn-outline"
                    />
                </li>
            </ul>
        </div>
    );
};

export default withRouter(CatergoryButtons);
