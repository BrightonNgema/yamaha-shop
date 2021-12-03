import React, { Component } from "react";
import SideInfo from "../SideInfo";
import { PropTypes } from "prop-types";
// import { AnimateOnChange } from "react-animation";
import { colors } from "theme";

class DesktopCategoryCarousel extends Component {
    render() {
        const {
            navbar,
            footer,
            children,
            activeData,
            next,
            prev,
            onMouseEnter,
            onMouseLeave
        } = this.props;
        const image = process.env.REACT_APP_URL + activeData.bg_image;
        return (
            <div style={{ backgroundColor: colors.dark }}>
                {navbar}
                <div>
                    {/* <AnimateOnChange
                        animation="slide"
                        animationIn="fadeIn"
                        animationOut="fadeOut"
                    > */}
                   
                    <div
                        alt="backg"
                        className="categoryCarouselcontainer"
                        style={{
                            backgroundImage: `linear-gradient(rgba(25, 25, 25, 0.3), rgba(8, 8, 8, 0.3)),url(${image})`,
                            width: window.innerWidth,
                            marginBottom: -5
                        }}
                    />
                    {/* </AnimateOnChange> */}
                </div>
                <div>
                    <SideInfo
                        activeData={activeData}
                        next={next}
                        previous={prev}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
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
