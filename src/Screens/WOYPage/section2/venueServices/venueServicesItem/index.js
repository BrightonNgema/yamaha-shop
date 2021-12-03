import React from "react";
import { Grid } from "@material-ui/core";
import { isMobile, isTablet } from "react-device-detect";

const BenefitItem = ({ data }) => {
    return (
        <Grid item xs={12} sm={5} md={4} lg={4}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={5} md={4} lg={3}>
                    <div
                        style={{
                            minHeight: isMobile && !isTablet ? 150 : 100,
                            minWidth: 100,
                            width: "100%",
                            borderRadius: 10,
                            backgroundImage: `url(${process.env.REACT_APP_URL+data.venue_img})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={8}
                    lg={8}
                    style={{
                        textAlign: "left",
                        margin: "0px auto"
                    }}
                >
                    <div
                        style={{
                            fontSize: "1rem",
                            color: "#1E1E1E",
                            textTransform: "capitalize",
                            fontWeight: "400",
                            marginBottom: 10
                        }}
                    >
                        {data.title}
                    </div>
                    <div
                        style={{
                            fontSize: "0.7rem",
                            color: "#56585A",
                            fontWeight: "400",
                            textTransform:"none",
                        }}
                    >
                        {data.content}
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default BenefitItem;
