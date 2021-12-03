import React from "react";
import { Grid } from "@material-ui/core";

const Intro = ({ activeData }) => {
    const textArray = activeData.intros[0].description.split("\n");
    return (
        <Grid
            id="about-intro"
            item
            sm={11}
            xs={11}
            md={11}
            lg={10}
            style={{ margin: "auto" }}
        >
            <div
                style={{
                    minHeight: 50,
                    padding: "40px 0px",
                    textAlign: "center",
                    color: "#000"
                }}
            >
                <Grid
                    item
                    xs={11}
                    sm={10}
                    md={11}
                    lg={11}
                    style={{ margin: "auto" }}
                >
                    <p
                        className="section-large-heading"
                        style={{
                            margin: "10px auto",
                            textAlign: "center"
                        }}
                    >
                        {activeData.intros[0].title}
                    </p>
                    {textArray.map((item, i) => {
                        if (item.length < 4) return null;
                        return (
                            <p
                                style={{
                                    fontSize: "1em",
                                    color: "#56585A",
                                    textTransform: "initial",
                                    textAlign: "left"
                                }}
                                key={i}
                            >
                                {item}
                            </p>
                        );
                    })}
                </Grid>
            </div>
        </Grid>
    );
};

export default Intro;
