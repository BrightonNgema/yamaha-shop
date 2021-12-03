import React from "react";
import "./index.css";
import { PropTypes } from "prop-types";

export default function CategoryInforText({ data }) {
    return (
        <div>
            {/*<div className="subcategory-container">
                 <span className="subcategory-text"></span> 
            </div>*/}
            <div className="slogan-container about">
                <span className="slogan-text">World of<br/>Yamaha venue</span>
            </div>
            <div className="desc-container">
                <span className="desc-text">
                  {data.title}
                </span>
            </div>
        </div>
    );
}

CategoryInforText.propTypes = {
    data: PropTypes.object.isRequired
};
