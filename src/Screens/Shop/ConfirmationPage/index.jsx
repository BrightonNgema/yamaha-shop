import React, { Component } from "react";
import { NavBar, Footer, Button } from "components";
import { colors } from "theme";
import { isIE } from "react-device-detect";
import { Helmet } from "react-helmet";
import { animateScroll } from "react-scroll";
import { Grid } from "@material-ui/core";
import "./confirmation.css";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import '../../../Assets/styles/global.css'
import { Link } from 'react-router-dom';
import { images } from "assets";
import { connect } from 'react-redux';
import { deleteCart } from '../../../Redux/Actions/cart';

export class ConfirmationPage extends Component {
    state = {
        orderNum: "#0003",
        email: "",
    };

    componentDidMount() {
        animateScroll.scrollToTop();
        //console.log(this.props.history.location.search)
        this.setState({
            orderNum: this.props.history.location.search.replace("?order_number=", "")
        })

        if (this.props.match.params.id === "thank you") {
            this.props.dispatch(deleteCart());
            localStorage.removeItem("cart_id");
        }

    }

    render() {
        const TopHeader = () => {
            return (
                <div
                    className="heading-main"
                    style={{ paddingTop: 30, flexGrow: 1 }}
                >
                    <Grid container style={{ position: "relative" }}>
                        <Grid item xs={6} sm={6}>
                            {this.props.match.params.id === "return-authorization" ?
                                <h1 className="contact-heading">
                                    WE'LL GET BACK TO YOU
                                </h1>
                                :
                                this.props.match.params.id === "return-confirmation" ?
                                    <h1 className="contact-heading">
                                        RETURN SCHEDULED
                                    </h1>
                                    :
                                    <h1 className="contact-heading">
                                        Purchase confirmed -  THANK YOU
                                    </h1>
                            }
                        </Grid>
                        <Grid item xs={6} md={6}>

                        </Grid>
                    </Grid>
                </div>
            );
        };

        const BodyMessage = () => {
            return (
                <>
                    {this.props.match.params.id === "return-authorization" ?
                        <div className="color">
                            We will contact you within 48hrs to go through our returns process with you.
                            <br />
                            You can see your return status on your <Link to="/account/orders">Orders Page</Link>.
                        </div>
                        :
                        this.props.match.params.id === "return-confirmation" ?
                            <div className="color">
                                For item returns, please include all product accessories and/or manuals in their original packaging.
                                <br /><br />
                                You can see your return status on your <Link to="/account/orders">Orders Page</Link>.
                            </div>
                            :
                            <div className="color">
                                Purchase confirmed - Your order number is {this.state.orderNum}.
                                <br />
                                Purchase confirmed - You will receive an order confirmation email shorty.
                            </div>
                    }
                </>
            );
        };

        const viewInvoice = () => {
            //console.log("View the Invoice");
        };
        const downloadInvoice = () => {
            //console.log("Download the Invoice");
        };

        const Buttons = () => {
            return (
                <>
                    {
                        this.props.match.params.id === "return-authorization" || this.props.match.params.id === "return-confirmation" ?
                            <div
                                style={{
                                    display: "flex",
                                    marginTop: 50,
                                }}
                            >
                                <div style={{ marginRight: 20 }}>
                                    <Button
                                        title="HOME"
                                        type="yamaha-btn-sm yamaha-btn-primary"
                                        link="/account/orders/"
                                    />
                                </div>
                            </div>
                            :
                            <div
                                style={{
                                    display: "flex",
                                    marginTop: 50,
                                }}
                            >
                                <div style={{ marginRight: 20 }}>
                                    <Button
                                        title="VIEW INVOICE"
                                        type="yamaha-btn-sm yamaha-btn-primary"
                                        link={"/account/orders/" + this.state.orderNum}
                                    />
                                </div>

                            </div>
                    }

                </>
            );
        };

        const OtherProducts = () => {
            return (
                <div>
                    <hr />
                    <h3 className="contact-heading colorh3">
                        WOULD YOU LIKE TO BROWSE OUR OTHER PREMIUM PRODUCTS?
                    </h3>
                    <div style={{ paddingTop: 30, flexGrow: 1 }}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <Link to="/category/music">
                                    <div className="browse">
                                        <img
                                            src={images.Music}
                                            alt=""
                                        // className="responsive"
                                        />
                                        <div className="text">
                                            <h3>
                                                Music
                                                        <ArrowRightAltIcon />
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Link to="/category/home_audio">
                                    <div className="browse">
                                        <img
                                            src={images.Homeaudio}
                                            alt=""
                                        // className="responsive"
                                        />
                                        <div className="text">
                                            <h3>
                                                Home Audio
                                                        <ArrowRightAltIcon />
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            );
        };

        const footerMenu = [
            {
                title: "Home",
                link: "/",
            },
            {
                title: "Warranty",
                link: "/warranty",
            },
            {
                title: "Yamaha Finance",
                link: "/finance",
            },
            {
                title: "Find My Dealer",
                link: "/dealer",
            },
        ];

        return (
            <div style={{ background: colors.light, overflow: "hidden" }}>


                <NavBar
                    topColor={isIE ? "#FFF" : "rgba(255,255,255,96%)"}
                    bottomColor={isIE ? "#FFF" : "rgba(255,255,255,90%)"}
                    search
                    menuDrawerInfo={footerMenu}
                    menuColor="black"
                    logoColor="black"
                />
                <div className="generic-container">
                    <TopHeader />
                    <BodyMessage />
                    <Buttons />
                    <OtherProducts />
                </div>
                <Footer mainFooter />
            </div>
        );
    }
}

export default connect()(ConfirmationPage);
