import React from "react";
import { Grid } from "@material-ui/core";
import { icons, images } from "assets";

const BenefitItem = ({ title, aboutName }) => {
    const aboutIcon = aboutName.toLowerCase() === 'blu cru' ? images.bLU_cRU : icons.yamaha_benefits;
    return (
        <Grid item xs={12} sm={5} md={3} lg={3}>
            <Grid container spacing={1}>
                <Grid item md={3} lg={3}>
                    <img
                        alt="benefit"
                        style={{
                            minHeight: 50,
                            width: 50
                        }}
                        src={aboutIcon}
                    />
                </Grid>
                <Grid
                    item
                    xs={8}
                    md={9}
                    lg={9}
                    style={{
                        textAlign: "left",
                        margin: "auto"
                    }}
                >
                    <span
                        style={{
                            fontSize: "0.8rem",
                            color: "#56585A",
                            textTransform: "capitalize",
                            fontWeight: "400"
                        }}
                    >
                        {title}
                    </span>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default BenefitItem;
