import React, { Component } from "react";
import SideInfo from "../SideInfo";
import { PropTypes } from "prop-types";
// import { AnimateOnChange } from "react-animation";
import { colors } from "theme";

class DesktopCategoryCarousel extends Component {
    render() {
        const { navbar, footer, children, activeData, next, prev } = this.props;
        const image = process.env.REACT_APP_URL + activeData.promo_img;
        return (
            <div style={{ backgroundColor: colors.dark }}>
                {navbar}
                {/* <AnimateOnChange animationIn="fadeIn" animationOut="fadeOut"> */}
                <div
                    alt="backg"
                    className="categoryCarouselcontainer"
                    style={{
                        backgroundImage: `linear-gradient(rgba(25, 25, 25, 0.4), rgba(8, 8, 8, 0.4)),url(${image})`,
                        width: window.innerWidth,
                        marginBottom: -5
                    }}
                />
                {/* </AnimateOnChange> */}
                <div>
                    <SideInfo
                        activeData={activeData}
                        next={next}
                        previous={prev}
                    />
                </div>
                {children}
                {footer}
            </div>
        );
    }
}

export default DesktopCategoryCarousel;
DesktopCategoryCarousel.propTypes = {
    navbar: PropTypes.any.isRequired,
    footer: PropTypes.any,
    children: PropTypes.any,
    activeData: PropTypes.object.isRequired,
    next: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired
};

DesktopCategoryCarousel.defaultProps = {
    footer: undefined,
    children: undefined
};
