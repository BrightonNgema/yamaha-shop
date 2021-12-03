import React, { Component } from "react";
import { PropTypes } from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
    TopLeftLogos,
    Breadcrumb,
    TopRightButtons,
    BottomRightButtons
} from "components";
import "./index.css";
import { withRouter } from "react-router-dom";
import { isMobile, isTablet } from "react-device-detect";
import { connect } from 'react-redux';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTop: true
        };
    }

    handleScroll = () => {
        if (window.scrollY === 0) {
            this.setState({ isTop: true });
        } else {
            this.setState({ isTop: false });
        }
    };

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
    render() {
        const {
            finance,
            logoColor,
            home,
            signin,
            menuOnly,
            category,
            menuDrawerInfo,
            menuColor,
            topColor,
            bottomColor,
            showBreadcrumbs,
            additional,
            match,
            categoryMenu,
            activeAbout,
            onPageEmail,
            onPageDownload,
            prodFromCart
        } = this.props;

        let topNav = this.state.isTop ? {} : { marginTop: -15 };
        let bottomNav = this.state.isTop
            ? {}
            : { height: 30, minHeight: 30, marginTop: -5 };
        bottomNav = isMobile || isTablet ? {} : bottomNav;
        topNav = isMobile || isTablet ? {} : topNav;
        const isShow =
            match.path.includes("/category/") || match.path.includes("/about") || match.path.includes("/compare");
        return (
            <div className="yamaha-navbar">
                <AppBar
                    position="fixed"
                    className="yamaha-navbar-appbar"
                    style={{ pointerEvents: "none", transition: '0.3s' }}
                >
                    <Toolbar
                        className="yamaha-navbar-toolbar"
                        style={{ backgroundColor: topColor, ...topNav, transition: '0.3s' }}
                    >
                        <TopLeftLogos
                            navLogoProps={{
                                finance,
                                home,
                                logoColor,
                                category
                            }}
                        />
                        <TopRightButtons
                            navButtonProps={{
                                signin,
                                menuOnly,
                                menuDrawerInfo,
                                menuColor,
                                additional,
                                match,
                                category,
                                prodFromCart
                            }}
                            style={{ pointerEvents: "all" }}
                        />
                    </Toolbar>
                    <div className="menu-break" />
                    {showBreadcrumbs && (
                        <Toolbar
                            style={{
                                backgroundColor: bottomColor,
                                ...bottomNav, transition: '0.3s'
                            }}
                            className="yamaha-navbar-breadcrumb"
                        >
                            <Breadcrumb logoColor={logoColor} />
                            {isShow && (
                                <BottomRightButtons
                                    navButtonProps={{
                                        signin,
                                        menuOnly,
                                        categoryMenu,
                                        menuColor,
                                        match,
                                        category,
                                        activeAbout,
                                        onPageEmail,
                                        onPageDownload
                                    }}
                                    style={{ pointerEvents: "all" }}
                                />
                            )}
                        </Toolbar>

                    )}
                </AppBar>
            </div>
        );
    }
}
NavBar.propTypes = {
    finance: PropTypes.bool,
    logoColor: PropTypes.string,
    home: PropTypes.bool,
    search: PropTypes.bool,
    category: PropTypes.string,
    topColor: PropTypes.string,
    bottomColor: PropTypes.string,
    signin: PropTypes.bool,
    menuOnly: PropTypes.bool,
    showBreadcrumbs: PropTypes.bool,
    Breadcrumb: PropTypes.any,
    menuDrawerInfo: PropTypes.any,
    menuColor: PropTypes.string,
    additional: PropTypes.any
};

NavBar.defaultProps = {
    finance: false,
    logoColor: "white",
    home: true,
    signin: false,
    menuOnly: false,
    category: undefined,
    topColor: "transparent",
    bottomColor: "transparent",
    Breadcrumb: null,
    showBreadcrumbs: true,
    menuDrawerInfo: null,
    menuColor: "white",
    additional: null
};

const mapStateToProps = (state) => {
    return {
        prodFromCart: state.cartReducer.cart,
    }
}

export default connect(mapStateToProps)(withRouter(NavBar));
