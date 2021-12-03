import React, { Component } from "react";
import { NavBar, Footer, SeoTag } from "components";
import MusicInstrumentsInd from "./MusicInstrumentsInd";
import MusicInstrumentsCop from "./MusicInstrumentsCop";
import Marine from "./Marine";
import Motobike from "./Motobike";
import "./index.css";
import { animateScroll } from "react-scroll";
import { isIE } from 'react-device-detect';
export default class TypeOfFinance extends Component {
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
            <div>
                <SeoTag
                    title="Yamaha South Africa | Finance | Types of finance"
                    url="https://www.yamaha.co.za/finance/types_of_finance"
                    description="We’re putting the world’s finest craftsmanship within everybody’s reach. Whether it’s the
                                musical instrument you’ve always dreamed of owning, the boat or motorcycle to take your
                                passion to the next level, or the power equipment to fuel your business’s growth, Yamaha
                    offers a range of flexible financing options."
                    keywords="Yamaha finance, finance, financial product, finance options"
                />
                <NavBar
                    topColor={isIE ? "#FFF" : "rgba(255,255,255,96%)"}
                    bottomColor={isIE ? "#FFF" : "rgba(255,255,255,90%)"}
                    finance
                    logoColor="black"
                    menuDrawerInfo={footerMenu}
                    menuColor="black"
                />
                <div className="type-main">
                    <div className="type-heading-container">
                        <h1 className="type-heading">TYPES OF FINANCE</h1>
                        <span className="type-subheading">
                            We’re putting the world’s finest craftsmanship
                            within everybody’s reach. Whether it’s the musical
                            instrument you’ve always dreamed of owning, the boat
                            or motorcycle to take your passion to the next
                            level, or the power equipment to fuel your
                            business’s growth, Yamaha offers a range of flexible
                            financing options.
                        </span>
                    </div>
                    <div className="accordian-main">
                        <MusicInstrumentsInd />
                        <MusicInstrumentsCop />
                        <Motobike />
                        <Marine />
                    </div>
                </div>
                <Footer fixed />
            </div>
        );
    }
}
