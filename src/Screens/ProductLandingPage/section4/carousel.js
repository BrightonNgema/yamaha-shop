import React from "react";
import { makeStyles } from "@material-ui/styles";
import { CardMedia, Grid } from "@material-ui/core";
// import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core";
import Carousel from "nuka-carousel";

import { isMobile, isTablet } from "react-device-detect";
import { font } from "theme";
import { withRouter } from "react-router-dom";
import { Button } from "components";
import  TextTruncate  from "react-text-truncate";

const styles = {
    heading: {
        fontSize: "1.9rem",
        color: "#1E1E1E",
        // textAlign: "left",
        fontFamily: font.secondary,
        fontWeight: "bold",
        marginBottom: 0
    },
    price: {
        fontSize: "1rem",
        color: "#BCBDBC",
        // textAlign: "left",
        fontFamily: font.primary,
        margin: 0,
        textTransform: "initial"
    },
    desc: {
        fontSize: "0.875rem",
        color: "#616365",
        // textAlign: "left",
        fontFamily: font.primary,
        textTransform: "initial",
        width: isMobile ? "95%" : "80%",
        display: "-webkit-inline-box"
    },
    textButton: {
        fontSize: "0.75rem",
        fontFamily: font.primary,
        width: isMobile ? "95%" : "80%",
        display: "-webkit-inline-box",
        marginTop: -20,
        marginBottom: -20,
        pointerEvents: "all",
        textDecoration: "none"
    }
};
const useStyles = makeStyles(theme => ({
    GalleryContainer: {
        paddingTop: 0.5 * 9,
        paddingBottom: 0.5 * 10,
        height:'auto'
    },
    Card: {
        minWidth: "200px",
        marginLeft: window.innerWidth > 768 ? 50 : 0,
        paddingBottom:40
    },
    CardMedia: {
        width: isMobile ? "100%" : "80%",
        // marginLeft:isMobile ? 0: -50
        minHeight: 250,
        backgroundSize: "contain",
        marginBottom: -30
    },
    CardTitle: {
        color: "#000"
    }
}));
const firstLetterUpper = newDesc => {
    var ProdDesc = newDesc.replace(/(^\s*\w|[.!?;:]\s*\w)/g, description => {
        return description.toUpperCase();
    });
    return ProdDesc;
};
const MyCarousel = ({ data, match }) => {

    const classes = useStyles();
    const displaySlides = isTablet ? 2 : isMobile ? 1 : 4;
    return (
        <section className={classes.GalleryContainer}>
            <Grid
                item
                xs={12}
                sm={12}
                md={10}
                lg={9}
                style={{ margin: "auto" }}
            >
                <Carousel
                    className="product-landing"
                    slidesToShow={displaySlides}
                    // swiping
                    // wrapAround
                    cellAlign="left"
                    // cellSpacing={20}
                >
                    {data.map((item, index) => {
                        let prodDesc = item.description
                            ? firstLetterUpper(item.description)
                            : item.description;
                        
                        return (
                            <div key={index} className={classes.Card}>
                                <CardMedia
                                    className={classes.CardMedia}
                                    image={
                                        process.env.REACT_APP_URL + item.image
                                    }
                                />
                                <div className="another-model-infor-container">
                                    <p style={styles.heading}>{item.title}</p>
                                    <div className="product-desc">
                                        <TextTruncate
                                            containerClassName="product-desc"
                                            line={5}
                                            element="div"
                                            truncateText="…"
                                            text={prodDesc}
                                            // textTruncateChild={<a href="#">Read on</a>}
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            title="Enquire"
                                            link="/contact"
                                            type="yamaha-btn-sm yamaha-btn-secondary"
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Carousel>
            </Grid>
        </section>
    );
};

export default withRouter(MyCarousel);
