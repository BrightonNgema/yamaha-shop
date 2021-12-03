import React from "react";
import { Button } from "components";
import { Grid } from "@material-ui/core";

const ResultsCard = ({ last, data, onProduct }) => {
    return (
        <Grid item md={12} style={{ marginTop: 20 }}>
            <Grid container spacing={2}>
                <Grid item md={2} xs={4} sm={4}>
                    <img
                        alt="prod"
                        src={`${process.env.REACT_APP_URL}${data.prod_img}`}
                        style={{
                            height: 140,
                            width: 180,
                            margin: "auto"
                        }}
                    />
                </Grid>
                <Grid
                    item
                    md={10}
                    sm={8}
                    style={{
                        margin: "auto 0px",
                        color: ""
                    }}
                >
                    <div style={{ color: "#1e1e1e", fontWeight: "500" }}>
                        {data.prod_code}
                    </div>
                    <div
                        style={{
                            color: "#56585A",
                            fontSize: "0.8rem",
                            textTransform: "initial",
                            margin: "10px 0px"
                        }}
                    >
                        {data.prod_desc}
                    </div>
                    <Grid item>
                        <Grid container spacing={1}>
                            <Grid item xs="auto">
                                <Button
                                    type="secondary"
                                    title="Spec Sheet"
                                    onClick={() =>
                                        window.open(
                                            process.env.REACT_APP_URL +
                                                data.spec_sheet
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <Button
                                    type="secondary"
                                    title="REGISTER WARRANTY"
                                    link={"/warranty"}
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <Button
                                    type="primary"
                                    title="VIEW"
                                    onClick={() => onProduct(data)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {!last && (
                <div
                    style={{
                        height: 1,
                        backgroundColor: "#BCBDBC",
                        width: "100%",
                        marginTop: 20
                    }}
                />
            )}
        </Grid>
    );
};

export default ResultsCard;
