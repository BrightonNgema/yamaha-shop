import React from "react";
import { Grid } from "@material-ui/core";
import { isMobile, isTablet } from "react-device-detect";
import { Button } from "components";

const styles = {
    heading: {
        textAlign: isMobile && !isTablet ? "left" : "center",
        marginLeft: isMobile && !isTablet ? 15 : "",
        marginBottom: 30,
        fontSize: "2.2rem",
        fontFamily: "rift",
        fontWeight: "bold",
        color: "#1e1e1e"
    }
};

const Section4 = ({data}) => {
    const [isShow, hideContent] = React.useState(false);

    const toggleContent = () => hideContent(!isShow);

    const content = data.content.replace(/\n/g, '</br>')
    return (
        <div
            style={{
                backgroundColor: "#fff",
                padding: "40px 0px 10px",
                marginTop: 0
            }}
        >
            <p style={styles.heading}>About world of yamaha</p>
            <Grid
                item
                xs={11}
                sm={11}
                md={11}
                lg={11}
                style={{ margin: "0px auto" }}
            >
                <Grid container spacing={2}>
                    <Grid item md={7}>
                        <p
                            style={{
                                marginTop: 0,
                                fontSize: isMobile ? "" : "1.5rem",
                                color:isMobile ?"#1e1e1e" :"#56585A",
                                textTransform: "initial"
                            }}
                        >
                            {data.title}
                        </p>
                        {/* <p
                            style={{
                                marginTop: 0,
                                color: "#1e1e1e",
                                textTransform: "initial"
                            }}
                        >
                            It combines an excitingly, innovative architectural
                            design and facilities which boast world class
                            technological advancement.
                            <br />
                            <br />
                            {(!isMobile || isShow) && (
                                <span>
                                   
                                </span>
                            )}
                        </p> */}

                         <div
                            style={{
                                marginTop: 0,
                                color: "#1e1e1e",
                                textTransform: "initial"
                            }}
                            dangerouslySetInnerHTML={{ __html: content.replace('roxanner@yamaha.co.za', '<a href="mailto:roxanner@yamaha.co.za" style="text-decoration:none">roxanner@yamaha.co.za</a>')}}
                        >
                        </div>
                    </Grid>
                    {(!isMobile || isShow) && (
                        <Grid item md={5}>
                            <img
                                alt="venue_image"
                                src={process.env.REACT_APP_URL+data.about_img}
                                style={{ width: "100%", maxHeight: 300 }}
                            />
                        </Grid>
                    )}
                    {(isMobile && !isShow) && (
                        <div style={{marginLeft:5}}>
                            <Button
                                title="Show more +"
                                onClick={toggleContent}
                                type="yamaha-btn-xs yamaha-btn-secondary"
                            />
                        </div>
                    )}
                </Grid>
                <hr />
            </Grid>
        </div>
    );
};

export default Section4;
