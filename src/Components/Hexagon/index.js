import React, { Component } from "react";
import { isTablet, isMobileOnly, isBrowser, } from "react-device-detect";
import HexagonTablet from "./HexagonTablet";
import HexagonDesktop from "./HexagonDesktop";
import HexagonMobile from "./HexagonMobile";
import HexagonTabletDesktop from "./HexagonTabletDesktop";

class CustomHexagon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenOrientation: 'portrait'
        };
    }

    componentDidMount() {
        
        window.addEventListener("orientationchange", this.setScreenOrientation);
        window.addEventListener("resize", this.setScreenOrientation);
        this.setScreenOrientation()
    }

    componentWillUnmount() {
        window.removeEventListener("orientationchange", this.setScreenOrientation);
        window.removeEventListener("resize", this.setScreenOrientation);
    }


    setScreenOrientation = () => {
        if (window.matchMedia("(orientation: portrait)").matches) {
           
            this.setState({
                screenOrientation: 'portrait'
            });
        }

        if (window.matchMedia("(orientation: landscape)").matches) {
           
            this.setState({
                screenOrientation: 'landscape'
            });
        }
    } 

    tabletCondtion = () => {
        if (this.state.screenOrientation === 'portrait') {
            return (
                <HexagonTablet
                    home={this.props.home ? true : false}
                    warranty={this.props.warranty ? true : false}
                    hover={this.props.hover ? true : false}
                />
            )
        }
        return (
            <HexagonTabletDesktop
                home={this.props.home ? true : false}
                warranty={this.props.warranty ? true : false}
                hover={this.props.hover ? true : false}
            />
        )
    }

    render() {
        return (
            <div className="yamaha-hexagon-grid">
                {isBrowser ? (
                    <HexagonDesktop
                        home={this.props.home ? true : false}
                        warranty={this.props.warranty ? true : false}
                        hover={this.props.hover ? true : false}
                    />
                ) : null}
                {isMobileOnly ? (
                    <HexagonMobile
                        home={this.props.home ? true : false}
                        warranty={this.props.warranty ? true : false}
                        hover={this.props.hover ? true : false}
                    />
                ) : null}
                {isTablet && this.tabletCondtion()}
            </div>
        );
    }
}

export default CustomHexagon;
