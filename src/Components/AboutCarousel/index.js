import React, { Component } from "react";
import DesktopCategoryCarousel from "./DesktopCategoryCarousel";
import { isMobile, isTablet } from "react-device-detect";
import MobileCategoryCarousel from "./MobileCategoryCarousel";
import { PropTypes } from "prop-types";

export default class AboutCarousel extends Component {
    render() {
        const { navbar, footer, children, data, activeData } = this.props;
        if (isMobile || isTablet) {
            return (
                <MobileCategoryCarousel
                    navbar={navbar}
                    footer={footer}
                    children={children}
                    data={data}
                    activeData={activeData}
                    next={this.props.nextAbout}
                    prev={this.props.previousAbout}
                    onStepper={this.props.onStepper}
                />
            );
        }
        return (
            <DesktopCategoryCarousel
                navbar={navbar}
                footer={footer}
                children={children}
                activeData={activeData}
                data={data}
                next={this.props.nextAbout}
                prev={this.props.previousAbout}
            />
        );
    }
}

AboutCarousel.propTypes = {
    navbar: PropTypes.any.isRequired,
    footer: PropTypes.any,
    children: PropTypes.any,
    data: PropTypes.array.isRequired,
    activeAbout: PropTypes.func.isRequired
};

AboutCarousel.defaultProps = {
    footer: undefined,
    children: undefined
};
