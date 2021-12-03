import React, { Component } from "react";
import { NavBar, Footer, YamahaMap } from "components";
import { colors } from "theme";
import { BottomHeader } from "./Headers";
import "./index.css";
import BranchList from "./BranchList";
import { Grid } from "@material-ui/core";
import { animateScroll } from "react-scroll";
import { Helmet } from "react-helmet";
import { isIE } from 'react-device-detect';

export default class DealerPage extends Component {
    componentDidMount() {
        animateScroll.scrollToTop();
    }
    render() {
        const footerMenu = [
            {
                title: "Home",
                link: "/"
            },
            {
                title: "Warranty",
                link: "/warranty"
            },
            {
                title: "Yamaha Finance",
                link: "/finance"
            },
            {
                title: "Find My Dealer",
                link: "/dealer"
            }
        ];

        return (
            <div style={{ background: colors.light, overflow: "hidden" }}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Yamaha South Africa | Find a Dealer</title>
                    <link
                        rel="canonical"
                        href="https://www.yamaha.co.za/dealer"
                    />
                    <meta
                        name="description"
                        content="Find a convenient Yamaha dealer near you."
                    />
                    <meta name="keywords" content="" />
                </Helmet>
                <NavBar
                    topColor={isIE ? "#FFF" : "rgba(255,255,255,96%)"}
                    bottomColor={isIE ? "#FFF" : "rgba(255,255,255,90%)"}
                    search
                    menuDrawerInfo={footerMenu}
                    menuColor="black"
                    logoColor="black"
                />
                <div className="contact-heading-container">
                    <BottomHeader />
                    <div style={{ padding: "40px 0px", flexGrow: 1 }}>
                        <Grid container spacing={10}>
                            <Grid item xs={12} sm={12}>
                                <BranchList />
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <YamahaMap />
                <Footer mainFooter />
            </div>
        );
    }
}
