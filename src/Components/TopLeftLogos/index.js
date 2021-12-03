import React, { Component } from "react";
import "./index.css";
import { images } from "assets";
import { withRouter } from "react-router-dom";
class TopLeftLogos extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onLogo = () => this.props.history.push("/");

    categoryLogos = navLogoProps => {
        const { category, logoColor } = navLogoProps;
        const cat = category && category.toLowerCase();
        const music = cat.includes("music") || cat.includes("audio");
        const catCond = music ? "music" : "motor";
        return (
            <img
                onClick={this.onLogo}
                style={{ pointerEvents: "all", cursor:'pointer' }}
                className="logo individual-logo"
                src={images[catCond + "_default_logo_" + logoColor]}
                alt="logo"
            />
        );
    };

    normalLogos = navLogoProps => {
        const { finance, logoColor } = navLogoProps;
        const activePage = finance ? "finance" : "default";

        const logo = images["yamaha_" + activePage + "_logo_" + logoColor];

        return (
            <img
                onClick={this.onLogo}
                className="logo"
                src={logo}
                alt="logo"
                style={{ pointerEvents: "all", cursor:'pointer' }}
            />
        );
    };

    render() {
        const { navLogoProps } = this.props;
        return (
            <div style={{ flexGrow: 1 }}>
                {navLogoProps.category
                    ? this.categoryLogos(navLogoProps)
                    : this.normalLogos(navLogoProps)
                }
            </div>
        )
    }
}

export default withRouter(TopLeftLogos);
