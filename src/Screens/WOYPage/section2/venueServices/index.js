import React from "react";
import { Grid } from "@material-ui/core";
import VenueServicesItem from "./venueServicesItem";
import { isMobile, isTablet } from "react-device-detect";
import Carousel from "nuka-carousel";

const styles = {
    VenueServicesContainer: {
        padding: "60px 0px 80px",
        textAlign: "center",
        backgroundColor: "#FFFFFF",
        color: "#1E1E1E",
        marginTop: isMobile || isTablet ? -56 : null
    },
    VenueServicesheader: {
        textAlign: isMobile && !isTablet ? "left" : "center",
        marginLeft: isMobile && !isTablet ? 15 : "",
        marginBottom: 30,
        fontSize: "2.2rem",
        fontFamily: "rift",
        fontWeight: "bold"
    }
};

const VenueServices = ({ data }) => {
    return (
        <Grid
            item
            xs={12}
            md={12}
            lg={12}
            style={styles.VenueServicesContainer}
        >
            <div>
                <Grid
                    item
                    xs={11}
                    sm={10}
                    md={11}
                    lg={11}
                    style={{ margin: "auto" }}
                >
                    <p style={styles.VenueServicesheader}>VENUE SERVICES</p>
                    {(!isMobile || isTablet) && (
                        <Grid container spacing={2} style={{ margin: "auto" }}>
                            {data.map((x, index) => (
                                <VenueServicesItem key={index} data={x} />
                            ))}
                        </Grid>
                    )}
                    {(isMobile && !isTablet) && (
                        <Carousel
                            className="product-landing top"
                            wrapAround
                            slidesToShow={2}
                            cellSpacing={15}
                            cellAlign="center"
                        >
                            {data.map((x, index) => (
                                <VenueServicesItem key={index} data={x} />
                            ))}
                        </Carousel>
                    )}
                </Grid>
            </div>
        </Grid>
    );
};

export default VenueServices;
