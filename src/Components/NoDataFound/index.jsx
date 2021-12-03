import React from 'react';
import { Grid, Button } from "@material-ui/core";
import { NavBar, Footer, Button as BTN } from "components";

const ItemNotFound = ({ mainHeader, otherHeader, buttonName1, buttonName2, linkTo, onClick }) => {
    return (
        <Grid
            container
            style={{ height: "50vh", backgroundColor: "#fff" }}
        >
            <Grid item md={8} style={{ margin: "auto" }}>
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
                    {mainHeader}
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
                    {otherHeader}
                </p>
                <Grid container spacing={1}>
                    <Grid item style={buttonName2 === '' ? { margin: "auto", } : { marginLeft: "auto", }}>
                        <BTN
                            title={buttonName1}
                            link={linkTo}
                            type="yamaha-btn-sm yamaha-btn-secondary"
                        />
                    </Grid>
                    {buttonName2 === '' ?
                        <></> :
                        <Grid item style={{ marginRight: "auto " }}>
                            <BTN
                                title="Go Back"
                                onClick={onClick}
                                type="yamaha-btn-sm yamaha-btn-secondary"
                            />
                        </Grid>
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ItemNotFound;