import React, { Component } from "react";
import "./index.css";
import { Hexagon, Footer, NavBar, InfoCard } from "components";
import { Helmet } from "react-helmet";

class Warranty extends Component {
    render() {
        // const test = this.props.match.path.replace("/", "");
        let text = <span>REGISTER YOUR YAMAHA</span>;
        let footerMenu = [
            {
                title: "Home",
                link: "/"
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
        let copytext = <span>PICK YOUR CATEGORY →</span>;
        // let btnText = <span>FIND YOUR WARRANTY</span>;
        return (
            <div className="main-container warranty ">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Yamaha South Africa | Warranty Registration</title>
                    <link
                        rel="canonical"
                        href="https://www.yamaha.co.za/warranty"
                    />
                    <meta
                        name="description"
                        content="Register your Yamaha here."
                    />
                    <meta name="keywords" content="" />
                </Helmet>
                <NavBar logoColor={"white"} menuDrawerInfo={footerMenu} />
                <InfoCard
                    text={text}
                    copytext={copytext}
                    // btnText={btnText}
                    // btnType="primary"
                />
                <Hexagon home warranty />
                <Footer mainFooter />
            </div>
        );
    }
}

export default Warranty;
