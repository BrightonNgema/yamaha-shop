import React, { Component } from "react";
import { NavBar, Footer, Button } from "components";
import { colors } from "theme";
import { isIE } from "react-device-detect";
import { Grid } from "@material-ui/core";
import { ThreeSixty } from "@material-ui/icons";
// import '../../../../Assets/styles/global.css'

export default class S3Bucket extends Component {
    state = {
    }


    TopHeader = () => {
        return (
            <div className="heading-main">
                <h1 className="contact-heading">Pages</h1>
            </div>
        );
    };

    Pages = () => {
        return (
            <div style={{ paddingTop: 30, flexGrow: 1 }}>
                <Grid container>
                 
                        <Grid item xs={1} sm={1}>
                            <Button
                                title="Register"
                                type="secondary yamaha-btn-lg"
                                link="/register"
                            />
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <Button
                                title="Cart"
                                type="secondary yamaha-btn-lg"
                                link="/cart"
                            />
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <Button
                                title="Add to Cart"
                                type="secondary yamaha-btn-lg"
                                link="/add-to-cart"
                            />
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <Button
                                title="Delivery"
                                type="secondary yamaha-btn-lg"
                                link="/account/delivery"
                            />
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <Button
                                title="Order return"
                                type="secondary yamaha-btn-lg"
                                link="/account/orders/returns"
                            />
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <Button
                                title="Order"
                                type="secondary yamaha-btn-lg"
                                link="/account/orders"
                            />
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <Button
                                title="Return #2"
                                type="secondary yamaha-btn-lg"
                                link="/account/orders/2"
                            />
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <Button
                                title="Confirmation"
                                type="secondary yamaha-btn-lg"
                                link="/confirmation"
                            />
                        </Grid>
                     
                        <Grid item xs={1} sm={1}>
                            <Button
                                title="Delivery information"
                                type="secondary yamaha-btn-lg"
                                link="/delivery-info"
                            />
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <Button
                                title="Order summmary"
                                type="secondary yamaha-btn-lg"
                                link="/cart/delivery/order-summary"
                            />
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <Button
                                title="additional information"
                                type="secondary yamaha-btn-lg"
                                link="/cart/delivery/additional-info"
                            />
                        </Grid>
                 
                </Grid>
            </div>
        )
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
                        <this.TopHeader />
                        <this.Pages />
                    </div>
                </div>
                <Footer fixed mainFooter />
            </div>
        );
    }
}