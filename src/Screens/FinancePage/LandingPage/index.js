import React, { Component } from "react";
import "./finance.css";
import { Hexagon, Footer, NavBar, InfoCard } from "components";
import { images } from "assets";
import { BrowserView } from "react-device-detect";
import { Helmet } from "react-helmet";

class Finance extends Component {
    render() {
        let text = <span>WELCOME TO YAMAHA FINANCE</span>;
        let copytext = (
            <span>
                Yamaha finance is a product of
                <br />
                Wesbank that offers four
                <br />
                different finance options for
                <br />
                both individuals and <br />
                organisations.
            </span>
        );
        if (window.innerWidth < 900 && window.innerHeight < 900) {
            copytext = "";
        }
        let subtext = (
            <span
                style={{
                    color: "#008D99",
                    fontSize: 14,
                    fontFamily: "Ubuntu, sans-serif",
                    fontWeight: "500"
                }}
            >
                HOVER OVER A HEXAGON
                <br />
                TO PICK YOUR OPTION →
            </span>
        );
        if (window.innerWidth < 900 && window.innerHeight < 900) {
            copytext = "";
            subtext = "";
        }
        return (
            <div className="main-container">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Yamaha South Africa | Finance</title>
                    <link
                        rel="canonical"
                        href="https://www.yamaha.co.za/finance"
                    />
                    <meta
                        name="description"
                        content="A product of Wesbank, Yamaha Finance offers four different finance options for both individuals and organisations."
                    />
                    <meta name="keywords" content="" />
                </Helmet>
                <NavBar finance logoColor="white" />
                <InfoCard
                    text={text}
                    copytext={copytext}
                    subtext={subtext}
                    logo={images.wesbank_logo}
                />
                <Hexagon hover />
                <BrowserView>
                    <Footer />
                </BrowserView>
            </div>
        );
    }
}

export default Finance;
