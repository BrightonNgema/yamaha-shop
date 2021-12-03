import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { NavBar, Button } from "components";
import { isIE } from "react-device-detect";

class NotFound extends Component {
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
            <Grid
                container
                style={{ height: "100vh", backgroundColor: "#fff" }}
            >
                <div>
                    <NavBar
                        topColor={isIE ? "#FFF" : "rgba(255,255,255,96%)"}
                        bottomColor={isIE ? "#FFF" : "rgba(255,255,255,90%)"}
                        search
                        menuDrawerInfo={footerMenu}
                        menuColor="black"
                        logoColor="black"
                    />
                </div>
                <Grid item md={8} style={{ margin: "auto" }}>
                    <p
                        style={{
                            fontSize: "10rem",
                            color: "#000",
                            fontFamily: "rift",
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: 0,
                            marginTop: -40
                        }}
                    >
                        Error 404
                    </p>
                    <p
                        style={{
                            marginTop: -20,
                            fontSize: "2.2rem",
                            color: "#000",
                            fontFamily: "rift",
                            fontWeight: "bold",
                            textAlign: "center"
                        }}
                    >
                        Oops, it seems you’re at the end of the road.
                    </p>
                    <p
                        style={{
                            marginTop: 0,
                            marginBottom: 20,
                            fontSize: "1.2rem",
                            color: "#56585A",
                            fontWeight: "bold",
                            textAlign: "center",
                            textTransform: 'initial'
                        }}
                    >
                        Let’s help find your way back
                    </p>
                    <Grid container spacing={1}>
                        <Grid item style={{ marginLeft: "auto" }}>
                            <Button
                                title="Go Home"
                                link="/"
                                type="yamaha-btn-sm yamaha-btn-secondary"
                            />
                        </Grid>
                        <Grid item style={{ marginRight: "auto" }}>
                            <Button
                                title="Go to Support"
                                link="/support"
                                type="yamaha-btn-sm yamaha-btn-secondary"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
export default NotFound;
