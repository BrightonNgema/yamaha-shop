import React, { Component } from "react";
import DesktopCategoryCarousel from "./DesktopCategoryCarousel";
import { isMobile, isTablet } from "react-device-detect";
import MobileCategoryCarousel from "./MobileCategoryCarousel";
import { PropTypes } from "prop-types";

export default class CategoryCarousel extends Component {
    render() {
        const {
            navbar,
            footer,
            children,
            data,
            activeData,
            onMouseEnter,
            onMouseLeave
        } = this.props;
        if (isMobile || isTablet) {
            return (
                <MobileCategoryCarousel
                    navbar={navbar}
                    footer={footer}
                    children={children}
                    data={data}
                    activeData={activeData}
                    next={this.props.nextSubCategory}
                    prev={this.props.previousSubCategory}
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
                next={this.props.nextSubCategory}
                prev={this.props.previousSubCategory}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
        );
    }
}

CategoryCarousel.propTypes = {
    navbar: PropTypes.any.isRequired,
    footer: PropTypes.any,
    children: PropTypes.any,
    data: PropTypes.array.isRequired,
    activeSub: PropTypes.func.isRequired
};

CategoryCarousel.defaultProps = {
    footer: undefined,
    children: undefined
};
