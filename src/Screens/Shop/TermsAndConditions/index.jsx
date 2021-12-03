import React, { Component } from "react";
import { NavBar, Footer, Button, privacyPolicy, returnsPolicy, termsAndConditions, deliveryInfo } from "components";
import { colors } from "theme";
import { isIE } from "react-device-detect";
import { Grid } from "@material-ui/core";

export default class TermsAndConditionsPage extends Component {
    state = {
        route: null,
        title: ""
    }
    componentDidMount() {

        let title = "";
        switch (this.props.match.url) {
            case "/terms and conditions":
                title = "Terms and Conditions"
                break;
            case "/privacy policy":
                title = "Privacy Policy"
                break;
            case "/returns":
                title = "Returns Policy"
                break;
            case "/delivery-info":
                title = "Delivery Information"
                break;
            default:
                break;
        }
        this.setState({
            route: this.props.match.url,
            title: title
        });
    }
    TopHeader = () => {
        return (
            <div className="heading-main">
                <h1 className="contact-heading">{this.state.title}</h1>
            </div>
        );
    };
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
                <NavBar
                    topColor={isIE ? "#FFF" : "rgba(255,255,255,96%)"}
                    bottomColor={isIE ? "#FFF" : "rgba(255,255,255,90%)"}
                    search
                    warranty
                    menuColor="black"
                    menuDrawerInfo={footerMenu}
                    logoColor="black"
                />
                <div className="generic-container">
                    <div style={{ padding: "40px 0px", flexGrow: 1 }}>
                        {this.TopHeader()}
                        <div style={{ color: "black" }}>
                            {this.state.route == "/terms and conditions" ? <>
                                <h1 style={{ paddingTop: 20 }}>Terms and Conditions</h1>
                                {termsAndConditions()}
                            </> : (<>

                            </>)}
                            {this.state.route == "/privacy policy" ? <>

                                <h1 style={{ paddingTop: 20 }}>Privacy Policy</h1>
                                {privacyPolicy()}
                            </> : (<>

                            </>)}
                            {this.state.route == "/returns" ? <>

                                <h1 style={{ paddingTop: 20 }}>Returns Policy</h1>
                                {returnsPolicy()}</> : (<>

                                </>)}
                            {this.state.route == "/delivery-info" ? <>

                                <h1 style={{ paddingTop: 20 }}>Delivery Information</h1>
                                {deliveryInfo()}</> : (<>

                                </>)}


                        </div>
                    </div>
                </div>
                <Footer fixed mainFooter />
            </div>
        );
    }
}