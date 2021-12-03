import React from "react";
import { Grid } from "@material-ui/core";
import { isMobile } from "react-device-detect";
import { icons } from "assets";
import { Button } from "components";

const mailTo = () => {
    window.open("mailto:web@yamaha.co.za");
};
export default function WorldOfYamaha() {
    return (
        <Grid
            container
            style={isMobile ? {} : { paddingLeft: 10, paddingRight: 10 }}
        >
            <Grid item xs={12} md={7}>
                <div className="woy-banner" />
            </Grid>
            <Grid item xs={12} md={5}>
                <div className="need-service-main">
                    <div className="need-service-inner-view">
                        <p className="need-service-header">
                            NEED TO SERVICE A PRODUCT?
                        </p>
                        <p className="branch subtext white">
                            Reach out to World of Yamaha to help you out.
                        </p>
                        <p className="branch address white">
                            {!isMobile && (
                                <span
                                    style={{
                                        position: "relative",
                                        bottom: -5,
                                        left: -3
                                    }}
                                >
                                    <img
                                        alt="directions"
                                        src={icons.direction}
                                        style={{ height: "1rem" }}
                                    />
                                </span>
                            )}
                            19 Eastern Service Rd, Kelvin, Sandton, 2054
                            {isMobile && (
                                <span
                                    style={{
                                        position: "relative",
                                        bottom: -5,
                                        left: 3
                                    }}
                                >
                                    <img
                                        alt="directions"
                                        src={icons.direction}
                                        style={{ height: "1rem" }}
                                    />
                                </span>
                            )}
                        </p>
                        <p className="branch telephone white">011 259 7850</p>
                        <Button
                            type="primary"
                            title="E-MAIL WORLD OF YAMAHA"
                            onClick={mailTo}
                        />
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}
