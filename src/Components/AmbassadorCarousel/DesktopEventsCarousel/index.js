import React, { Component } from "react";
import SideInfo from "../SideInfo";
import { PropTypes } from "prop-types";

class DesktopEventsCarousel extends Component {
    render() {
        const { navbar, footer, children, activeData, next, prev } = this.props;
        const image = process.env.REACT_APP_URL + activeData.bg_img;
        return (
            <div style={{ backgroundColor: "#000" }}>
                <div
                    className="categoryCarouselcontainer"
                    style={{
                        backgroundImage: `linear-gradient(rgba(25, 25, 25, 0.3), rgba(8, 8, 8, 0.3)),url(${image})`
                    }}
                >
                    {navbar}
                    {children}
                    <SideInfo
                        activeData={activeData}
                        next={next}
                        previous={prev}
                    />
                    {footer}
                </div>
            </div>
        );
    }
}

export default DesktopEventsCarousel;
DesktopEventsCarousel.propTypes = {
    navbar: PropTypes.any.isRequired,
    footer: PropTypes.any,
    children: PropTypes.any,
    activeData: PropTypes.object.isRequired,
    next: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired
};

DesktopEventsCarousel.defaultProps = {
    footer: undefined,
    children: undefined
};
