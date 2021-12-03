import React from "react";
import { colors, font } from "theme";
import { Grid } from "@material-ui/core";
import { isMobile } from "react-device-detect";
// import { icons } from "assets";

function TipCard({ icon, title, info }) {
    return (
        <Grid
            container
            spacing={2}
            style={{
                padding: "5px 10px",
                marginBottom: 23,
                marginLeft: isMobile ? null : 5,
                height: "auto",
                backgroundColor: "#F4F4F4"
            }}
        >
            <Grid item md="auto">
                <img
                    alt="information_icon"
                    src={icon}
                    style={{
                        width: "100%",
                        maxWidth: 45,
                        maxHeight: 45
                    }}
                />
            </Grid>
            <Grid item md={10} style={{ margin: "auto 0px" }}>
                <Grid container spacing={2} style={{ margin: "auto 0px" }}>
                    <Grid item md={8}>
                        <div
                            style={{
                                fontFamily: font.secondary,
                                fontSize: "1.5rem",
                                color: "#1e1e1e",
                                fontWeight: "bold"
                            }}
                        >
                            {title}
                        </div>
                    </Grid>
                    <Grid item style={{ margin: "auto 0px" }}>
                        <div
                            style={{
                                fontSize: "0.8rem",
                                color: colors.primary,
                                fontWeight: "bold",
                                alignSelf: ""
                            }}
                        >
                            {info}
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default TipCard;
