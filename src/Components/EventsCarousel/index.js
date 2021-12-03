import React, { Component } from "react";
import DesktopEventsCarousel from "./DesktopEventsCarousel";
import { isMobile, isTablet } from "react-device-detect";
import MobileEventsCarousel from "./MobileEventsCarousel";
import { PropTypes } from "prop-types";

export default class EventsCarousel extends Component {
    render() {
        const { navbar, footer, children, data, activeData } = this.props;
        if (isMobile || isTablet) {
            return (
                <MobileEventsCarousel
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
            <DesktopEventsCarousel
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

EventsCarousel.propTypes = {
    navbar: PropTypes.any.isRequired,
    footer: PropTypes.any,
    children: PropTypes.any,
    data: PropTypes.array.isRequired,
    activeData: PropTypes.object.isRequired,
    next: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired
};

EventsCarousel.defaultProps = {
    footer: undefined,
    children: undefined
};
