import React from "react";

export const TopHeader = () => {
    return (
        <div className="heading-main">
            <h1 className="contact-heading">GET IN TOUCH</h1>
            <span className="contact-subheading">
                Enter your details below, after submitting we will contact you
                as soon as possible.
            </span>
        </div>
    );
};

export const BottomHeader = () => {
    return (
        <div className="heading-main">
            <h1 className="contact-heading">
                locate your nearest Yamaha dealer
            </h1>
            <span className="contact-subheading">
                Enter your address to find your nearest dealer.
            </span>
        </div>
    );
};
