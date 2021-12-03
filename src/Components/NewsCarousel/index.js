import React, { Component } from "react";
import DesktopNewsCarousel from "./DesktopNewsCarousel";
import { isMobile, isTablet } from "react-device-detect";
import MobileNewsCarousel from "./MobileNewsCarousel";
import { PropTypes } from "prop-types";

export default class NewsCarousel extends Component {
    render() {
        const { navbar, footer, children, data, activeData } = this.props;
        if (isMobile || isTablet) {
            return (
                <MobileNewsCarousel
                    navbar={navbar}
                    footer={footer}
                    children={children}
                    data={data}
                    activeData={activeData}
                    next={this.props.next}
                    prev={this.props.previous}
                    onStepper={this.props.onStepper}
                />
            );
        }
        return (
            <DesktopNewsCarousel
                navbar={navbar}
                footer={footer}
                children={children}
                activeData={activeData}
                data={data}
                next={this.props.next}
                prev={this.props.previous}
            />
        );
    }
}

NewsCarousel.propTypes = {
    navbar: PropTypes.any.isRequired,
    footer: PropTypes.any,
    children: PropTypes.any,
    data: PropTypes.array.isRequired,
    activeData: PropTypes.object.isRequired,
    next: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired,
};

NewsCarousel.defaultProps = {
    footer: undefined,
    children: undefined
};
