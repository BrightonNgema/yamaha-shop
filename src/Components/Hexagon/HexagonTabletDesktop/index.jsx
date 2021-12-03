import React, { Component } from "react";
import { TabletView, isSafari } from "react-device-detect";
import { withRouter } from "react-router-dom";
import { HexGrid, Layout, Hexagon } from "react-hexgrid";
import "./HexagonDesktop.css";
import HexagonButton from "../HexagonButton";
import HexagonText from "../HexagonText";
import Patterns from "../Patterns";

class HexagonTabletDesktop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: this.determineHexagonSize(),
            viewBox: this.determineViewBox(),
            powerProductHover: false,
            powerProductHoverFill: "power2",
            powerProductTitle: "POWER PRODUCTS",
            proAudioHover: false,
            proAudioHoverFill: "proaudio2",
            proAudioTitle: "PRO AUDIO",
            motorbikeHover: false,
            motorbikeHoverFill: "motorbike2",
            motorbikeTitle: "MOTORCYCLES",
            homeAudioHover: false,
            homeAudioHoverFill: "homeaudio2",
            homeAudioTitle: "HOME AUDIO",
            musicHover: false,
            musicHoverFill: "music2",
            musicTitle: "MUSIC",
            marineHover: false,
            marineHoverFill: "marine2",
            marineTitle: "MARINE",
            golfCartsHover: false,
            golfCartsHoverFill: "golf2",
            golfCartsTitle: "GOLF CARS",
            worldHover: false,
            worldHoverFill: "world2",
            worldTitle: "WORLD OF YAMAHA",
            shopHover: false,
            shopHoverFill: "shop2",
            shopTitle: "YAMAHA SHOP"
        };
        this.displayHover = this.displayHover.bind(this);
        this.removeDisplayHover = this.removeDisplayHover.bind(this);
    }

    determineViewBox() {
        if (window.innerWidth >= 1400 && window.innerHeight >= 750) {
            return "-50 -30 200 200";
        } else if (window.innerWidth >= 1200 && window.innerHeight >= 900) {
            return "-50 -50 200 200";
        } else if (window.innerWidth < 900 && window.innerHeight < 900) {
            return "-50 -100 200 200";
        } else if (window.innerWidth < 1400 && window.innerHeight < 800) {
            return `${isSafari ? "-65  -40" : "-65 -35"} 200 200`;
        } else {
            return "-50 -25 200 200";
        }
    }

    determineHexagonSize() {
        if (window.innerWidth >= 1400 && window.innerHeight >= 700) {
            return { x: 20, y: 20 };
        } else if (window.innerWidth >= 1200 && window.innerHeight >= 900) {
            return { x: 20, y: 20 };
        } else if (window.innerWidth < 900 && window.innerHeight < 900) {
            return { x: 20, y: 20 };
        } else if (window.innerWidth < 1400 && window.innerHeight < 900) {
            return { x: 17, y: 17 };
        }
    }

    displayHover(e, fill) {
        let hover = e + "Hover";
        let fillValue = e + "HoverFill";
        let title = e + "Title";
        let x = fill + "1";
        if (this.props.hover) {
            this.setState({ [hover]: true, [fillValue]: x });
        } else if (e === "shop") {
            this.setState({ [title]: "Coming Soon" });
        } else {
            return null;
        }
    }

    removeDisplayHover(e, fill, text) {
        let hover = e + "Hover";
        let fillValue = e + "HoverFill";
        let titles = e + "Title";
        let x = fill + "2";
        if (this.props.hover) {
            this.setState({ [hover]: false, [fillValue]: x });
        } else {
            this.setState({ [titles]: text });
        }
    }

    navigate = navlink => {
        if (!this.props.hover) {
            if (this.props.warranty) {
                return this.props.history.push({
                    pathname: `/warranty/${navlink}`
                });
            } else if (this.props.home) {
                return this.props.history.push({
                    pathname: `/category/${navlink}`
                });
            }
        }
    };

    render() {
        return (
            <TabletView viewClassName="yamaha-hexagon-grid">
                <HexGrid viewBox={this.determineViewBox()}>
                    {/* Main grid with bit hexagons, all manual */}
                    <Layout
                        size={this.determineHexagonSize()}
                        flat={true}
                        spacing={1}
                        origin={{ x: 0, y: 0 }}
                    >
                        {/* {First Column from the right} */}
                        <Hexagon
                            s={0}
                            q={5.1}
                            r={-3.3}
                            className="defaultHexagon"
                        />
                        <Hexagon
                            s={0}
                            q={5.1}
                            r={-2.3}
                            className="defaultHexagon"
                        />
                        <Hexagon
                            s={0}
                            q={5.1}
                            r={-1.2998}
                            className="defaultHexagon"
                        />
                        <Hexagon
                            s={0}
                            q={5.1}
                            r={-0.3}
                            className="defaultHexagon"
                        />

                        {/* {Second Column from the right} */}
                        <Hexagon
                            s={0}
                            q={4.1}
                            r={-3.3}
                            className="defaultHexagon"
                        />
                        {this.props.hover ? (
                            <Hexagon
                                s={0}
                                q={4.1}
                                r={-2.3}
                                className="defaultHexagon"
                            />
                        ) : (
                                <Hexagon
                                    s={0}
                                    q={4.1}
                                    r={-2.3}
                                    name="powerProductHover"
                                    className="hexagon-standard-style power-product"
                                    fill={this.state.powerProductHoverFill}
                                    onMouseEnter={() =>
                                        this.displayHover("powerProduct", "power")
                                    }
                                    onClick={() =>
                                        this.navigate("power_products", 7)
                                    }
                                    onMouseLeave={() =>
                                        this.removeDisplayHover(
                                            "powerProduct",
                                            "power",
                                            "POWER PRODUCTS"
                                        )
                                    }
                                >
                                    <HexagonText
                                        title={this.state.powerProductTitle}
                                    />
                                </Hexagon>
                            )}

                        <Hexagon
                            s={0}
                            q={4.1}
                            r={-1.3}
                            className="hexagon-standard-style pro-audio"
                            fill={this.state.proAudioHoverFill}
                            onClick={() => this.navigate("pro_audio", 5)}
                            onMouseEnter={() =>
                                this.displayHover("proAudio", "proaudio")
                            }
                            onMouseLeave={() =>
                                this.removeDisplayHover(
                                    "proAudio",
                                    "proaudio",
                                    "PRO AUDIO"
                                )
                            }
                        >
                            {this.state.proAudioHover ? (
                                <HexagonButton
                                    title={this.state.proAudioTitle}
                                    firstLink="https://financeapps.wesbank.co.za/financeApps/individual/asset/index.xhtml?siteID=yamaha&appType=LSR&appSrc=yamahacoza"
                                    firstText="Individual application"
                                    secondLink="https://financeapps.wesbank.co.za/financeApps/company/asset/index.xhtml?siteID=yamahacorp&appType=CPY&appSrc=yamahacoza"
                                    secondText="organisation application"
                                />
                            ) : (
                                    <HexagonText title={this.state.proAudioTitle} />
                                )}
                        </Hexagon>
                        {/* {!this.props.home ? ( */}
                        <Hexagon
                            s={0}
                            q={4.1}
                            r={-0.3}
                            className="defaultHexagon"
                        />
                        {/* ) : ( */}
                        {/* <Hexagon
                                className="hexagon-standard-style shop"
                                s={0}
                                q={4.1}
                                r={-0.3}
                                fill={this.state.shopHoverFill}
                                // onClick={() => this.props.history.push("/shop")}
                                onMouseEnter={() =>
                                    this.displayHover("shop", "shop")
                                }
                                onMouseLeave={() =>
                                    this.removeDisplayHover(
                                        "shop",
                                        "shop",
                                        "YAMAHA SHOP"
                                    )
                                }
                            >
                                {this.state.shopHover ? (
                                    <HexagonButton
                                        title={this.state.shopTitle}
                                        firstLink="https://financeapps.wesbank.co.za/financeApps/individual/asset/index.xhtml?siteID=yamaha&appType=LSR&appSrc=yamahacoza"
                                        firstText="Individual application"
                                        secondLink="https://financeapps.wesbank.co.za/financeApps/company/asset/index.xhtml?siteID=yamahacorp&appType=CPY&appSrc=yamahacoza"
                                        secondText="organisation application"
                                    />
                                ) : (
                                    <HexagonText title={this.state.shopTitle} />
                                )}
                            </Hexagon>
                        )} */}

                        {/* {Third Column from the right} */}
                        {/* <Hexagon s={0} q={3.1} r={-3.3} fill='red' /> */}
                        <Hexagon
                            s={0}
                            q={3.1}
                            r={-2.3}
                            className="defaultHexagon"
                        />
                        <Hexagon
                            className="hexagon-standard-style motorbike"
                            fill={this.state.motorbikeHoverFill}
                            q={3.1}
                            r={-1.3}
                            s={0}
                            onClick={() => this.navigate("motorcycles", 1)}
                            onMouseEnter={() =>
                                this.displayHover("motorbike", "motorbike")
                            }
                            onMouseLeave={() =>
                                this.removeDisplayHover(
                                    "motorbike",
                                    "motorbike",
                                    "MOTORCYCLES"
                                )
                            }
                        >
                            {this.state.motorbikeHover ? (
                                <HexagonButton
                                    title={this.state.motorbikeTitle}
                                    firstLink="https://financeapps.wesbank.co.za/financeApps/individual/asset/index.xhtml?siteID=yamaha&appType=LSR&appSrc=yamahacoza"
                                    firstText="Individual application"
                                    secondLink="https://financeapps.wesbank.co.za/financeApps/company/asset/index.xhtml?siteID=yamahacorp&appType=CPY&appSrc=yamahacoza"
                                    secondText="organisation application"
                                />
                            ) : (
                                    <HexagonText
                                        title={this.state.motorbikeTitle}
                                    />
                                )}
                        </Hexagon>
                        <Hexagon
                            className="hexagon-standard-style homeaudio"
                            fill={this.state.homeAudioHoverFill}
                            q={3.1}
                            r={-0.3}
                            s={1}
                            onClick={() => this.navigate("home_audio", 4)}
                            onMouseEnter={() =>
                                this.displayHover("homeAudio", "homeaudio")
                            }
                            onMouseLeave={() =>
                                this.removeDisplayHover(
                                    "homeAudio",
                                    "homeaudio",
                                    "HOME AUDIO"
                                )
                            }
                        >
                            {this.state.homeAudioHover ? (
                                <HexagonButton
                                    title={this.state.homeAudioTitle}
                                    firstLink="https://financeapps.wesbank.co.za/financeApps/individual/asset/index.xhtml?siteID=yamaha&appType=LSR&appSrc=yamahacoza"
                                    firstText="Individual application"
                                    secondLink="https://financeapps.wesbank.co.za/financeApps/company/asset/index.xhtml?siteID=yamahacorp&appType=CPY&appSrc=yamahacoza"
                                    secondText="organisation application"
                                />
                            ) : (
                                    <HexagonText
                                        title={this.state.homeAudioTitle}
                                    />
                                )}
                        </Hexagon>
                        <Hexagon
                            s={0}
                            q={3.1}
                            r={0.7}
                            className="defaultHexagon"
                        />

                        {/* {Forth Column from the right} */}
                        <Hexagon
                            s={0}
                            q={2.1}
                            r={-1.3}
                            className="hexagon-standard-style music"
                            fill={this.state.musicHoverFill}
                            onClick={() => this.navigate("music", 6)}
                            onMouseEnter={() =>
                                this.displayHover("music", "music")
                            }
                            onMouseLeave={() =>
                                this.removeDisplayHover(
                                    "music",
                                    "music",
                                    "Music"
                                )
                            }
                        >
                            {this.state.musicHover ? (
                                <HexagonButton
                                    title={this.state.musicTitle}
                                    firstLink="https://financeapps.wesbank.co.za/financeApps/individual/asset/index.xhtml?siteID=yamaha&appType=LSR&appSrc=yamahacoza"
                                    firstText="Individual application"
                                    secondLink="https://financeapps.wesbank.co.za/financeApps/company/asset/index.xhtml?siteID=yamahacorp&appType=CPY&appSrc=yamahacoza"
                                    secondText="organisation application"
                                />
                            ) : (
                                    <HexagonText title={this.state.musicTitle} />
                                )}
                        </Hexagon>
                        <Hexagon
                            s={0}
                            q={2.1}
                            r={-0.3}
                            fill={this.state.marineHoverFill}
                            className="hexagon-standard-style marine"
                            onClick={() => this.navigate("marine", 3)}
                            onMouseEnter={() =>
                                this.displayHover("marine", "marine")
                            }
                            onMouseLeave={() =>
                                this.removeDisplayHover(
                                    "marine",

                                    "marine",
                                    "MARINE"
                                )
                            }
                        >
                            {this.state.marineHover ? (
                                <HexagonButton
                                    title={this.state.marineTitle}
                                    firstLink="https://financeapps.wesbank.co.za/financeApps/individual/asset/index.xhtml?siteID=yamaha&appType=LSR&appSrc=yamahacoza"
                                    firstText="Individual application"
                                    secondLink="https://financeapps.wesbank.co.za/financeApps/company/asset/index.xhtml?siteID=yamahacorp&appType=CPY&appSrc=yamahacoza"
                                    secondText="organisation application"
                                />
                            ) : (
                                    <HexagonText title={this.state.marineTitle} />
                                )}
                        </Hexagon>
                        {!this.props.home || this.props.warranty ? (
                            <Hexagon
                                s={0}
                                q={2.1}
                                r={0.7}
                                className="defaultHexagon"
                            />


                        ) : (
                                <Hexagon
                                    s={0}
                                    q={2.1}
                                    r={0.7}
                                    fill={this.state.worldHoverFill}
                                    className="hexagon-standard-style world"
                                    onClick={() =>
                                        this.props.history.push("/world_of_yamaha")
                                    }
                                    onMouseEnter={() =>
                                        this.displayHover("world", "world")
                                    }
                                    onMouseLeave={() =>
                                        this.removeDisplayHover(
                                            "world",
                                            "world",
                                            "WORLD OF YAMAHA"
                                        )
                                    }
                                >
                                    <HexagonText
                                        title={this.state.worldTitle}
                                    />
                                </Hexagon>
                            )}


                        {/* {Last Column from the right} */}
                        <Hexagon
                            s={0}
                            q={1.1}
                            r={0.7}
                            className="hexagon-standard-style golfcarts"
                            fill={this.state.golfCartsHoverFill}
                            onClick={() => this.navigate("golf_cars", 2)}
                            onMouseEnter={() =>
                                this.displayHover("golfCarts", "golf")
                            }
                            onMouseLeave={() =>
                                this.removeDisplayHover(
                                    "golfCarts",
                                    "golf",
                                    "GOLF CARS"
                                )
                            }
                        >
                            {this.state.golfCartsHover ? (
                                <HexagonButton
                                    title={this.state.golfCartsTitle}
                                    firstLink="https://financeapps.wesbank.co.za/financeApps/individual/asset/index.xhtml?siteID=yamaha&appType=LSR&appSrc=yamahacoza"
                                    firstText="Individual application"
                                    secondLink="https://financeapps.wesbank.co.za/financeApps/company/asset/index.xhtml?siteID=yamahacorp&appType=CPY&appSrc=yamahacoza"
                                    secondText="organisation application"
                                />
                            ) : (
                                    <HexagonText
                                        title={this.state.golfCartsTitle}
                                    />
                                )}
                        </Hexagon>
                        <Hexagon
                            s={0}
                            q={1.1}
                            r={1.7}
                            className="defaultHexagon"
                        />
                    </Layout>
                    <Patterns size={this.state.size} />
                </HexGrid>
            </TabletView>
        );
    }
}

export default withRouter(HexagonTabletDesktop);
