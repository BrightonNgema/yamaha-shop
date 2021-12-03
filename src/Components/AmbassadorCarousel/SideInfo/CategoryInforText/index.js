import React from "react";
import "./index.css";
import { PropTypes } from "prop-types";

export default function CategoryInforText({ activeData }) {
    return (
        <div>
            <div className="subcategory-container">
                <span className="subcategory-text">
                    {activeData.division}
                </span>
            </div>
            <div className="slogan-container">
                <span className="slogan-text">{activeData.title}</span>
            </div>
            {/* <div className="desc-container">
                <span className="desc-text">{activeData.description}</span>
            </div> */}
        </div>
    );
}

CategoryInforText.propTypes = {
    activeData: PropTypes.object.isRequired
};
