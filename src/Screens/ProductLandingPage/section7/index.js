import React from "react";
import { Grid } from "@material-ui/core";
import "./section7.css";
import WorldOfYamaha from "./WorldOfYamaha";
import LearnMoreCard from "./LearnMoreCard";
// import AnyQuestions from "./AnyQuestions";
import { withRouter } from "react-router-dom";
import { images } from "assets";

function Section7({ match }) {
    const isMusic =
        match.params.cat.includes("music") ||
        match.params.cat.includes("power");
    const isHidden = isMusic || match.params.cat.includes("audio");

    const styles = {
        mainView: {
            backgroundColor: "#1E1E1E",
            width: "100%",
            marginTop: -1,
            paddingTop: isHidden ? 10 : 40
        },
        gridContainer: { flexGrow: 1, marginTop: isHidden ? 10 : 50 },
        grid: {
            paddingLeft: 10,
            paddingRight: 10,
            marginBottom: 10
        }
    };

    const catImage = isMusic ? "music" : "motor";
    return (
        <div style={styles.mainView}>
            {/* <AnyQuestions /> */}
            <div style={styles.gridContainer}>
                {!isHidden && (
                    <Grid container spacing={1} style={styles.grid}>
                        <LearnMoreCard
                            imageClass="biker-turning"
                            image={images[catImage + "_default_logo_black"]}
                            desc="Yamaha has been designed with the YZ/WR range as its focus and the specific needs of the motocross, enduro and off road segment in mind."
                            linkTitle="LEARN MORE"
                            to={{
                                pathname: "/contact",
                                // query: { aboutIndex: 0 }
                            }}
                        />
                        <LearnMoreCard
                            imageClass="bikers"
                            title="bLU cRU"
                            desc="Nationwide membership programme for all Yamaha YZ, WR, and FX customers"
                            linkTitle=" LEARN MORE"
                            to={{
                                pathname: "/about",
                                query: { aboutIndex: 1 }
                            }}
                        />
                    </Grid>
                )}
                <WorldOfYamaha />
            </div>
        </div>
    );
}

export default withRouter(Section7);
