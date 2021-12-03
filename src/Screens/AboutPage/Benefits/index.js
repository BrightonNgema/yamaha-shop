import React from "react";
import { Grid } from "@material-ui/core";
import BenefitItem from "./BenefitItem";

const styles = {
    benefitsConatiner: {
        padding: "0px 0px 40px",
        textAlign: "center",
        backgroundColor: "#F8F8F8",
        color: "#1E1E1E"
    },
    Benefitsheader: {
        marginBottom: 30,
        fontSize: "2.2rem",
        fontFamily: "rift",
        fontWeight: "bold"
    }
};
const Benefits = ({ activeData }) => {
    if (activeData.benefits === null || activeData.benefits.length < 1)
        return null;
    return (
        <Grid item xs={12} md={12} lg={12} style={styles.benefitsConatiner}>
            <div>
                <Grid
                    item
                    xs={11}
                    sm={10}
                    md={11}
                    lg={11}
                    style={{ margin: "auto" }}
                >
                    <p style={styles.Benefitsheader}>THE BENEFITS</p>
                    <Grid container spacing={2}>
                        {activeData.benefits.map((x, index) => (
                            <BenefitItem
                                key={index}
                                title={x.name}
                                aboutName={activeData.title}
                            />
                        ))}
                    </Grid>
                </Grid>
            </div>
        </Grid>
    );
};

export default Benefits;
