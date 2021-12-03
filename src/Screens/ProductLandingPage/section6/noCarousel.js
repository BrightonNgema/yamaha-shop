import React from "react";
import { makeStyles } from "@material-ui/styles";
import { CardMedia, Grid } from "@material-ui/core";
// import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core";

import { isMobile } from "react-device-detect";
import { font, colors } from "theme";
import { withRouter, Link } from "react-router-dom";
import { AddToCompare } from "components";

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
        textTransform: "initial",
        fontFamily: font.primary,
        margin: 0
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
        paddingBottom: 0.5 * 10
    },
    Card: {
        minWidth: "300px",
        marginLeft: window.innerWidth > 768 ? 50 : 0
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
const NoCarousel = ({ data, match }) => {
    const {
        params: { cat, subcat }
    } = match;
    const classes = useStyles();
    return (
        <section className={classes.GalleryContainer}>
            <Grid
                item
                xs={12}
                sm={12}
                md={3 * data.length}
                lg={3 * data.length}
                style={{ margin: "auto" }}
            >
                <Grid container style={{ margin: "auto" }}>
                    {data.map((item, index) => {
                        let prodDesc = item.description
                            ? firstLetterUpper(item.description)
                            : item.description;

                        let price = item.price ? item.price : "";
                        price = price.length === 0 ? "TBA" : price;
                        const isFrom =
                            !price.toLowerCase().includes("tba") &&
                            !price.toLowerCase().includes("price")
                                ? "FROM " + price.toUpperCase() + " Incl. VAT"
                                : price.toUpperCase();
                        return (
                            <Grid item md={12 / data.length} key={index}>
                                <div key={index} className={classes.Card}>
                                    <CardMedia
                                        className={classes.CardMedia}
                                        image={
                                            process.env.REACT_APP_URL +
                                            item.prod_img
                                        }
                                    />
                                    <div className="another-model-infor-container">
                                        <p style={styles.heading}>
                                            {item.code}
                                        </p>
                                        <p style={styles.price}>{isFrom}</p>
                                        <div
                                            className="product-desc"
                                            style={styles.desc}
                                        >
                                            {prodDesc}
                                        </div>
                                        <div>
                                            <Link
                                                to={`/category/${cat}/${subcat}/${item.code}`}
                                                style={{
                                                    ...styles.textButton,
                                                    color: colors.primary
                                                }}
                                            >
                                                VIEW →
                                            </Link>
                                        </div>
                                        <AddToCompare product={item}>
                                            <div>
                                                <p
                                                    style={{
                                                        ...styles.textButton,
                                                        color: colors.grey
                                                    }}
                                                >
                                                    ADD TO COMPARE →
                                                </p>
                                            </div>
                                        </AddToCompare>

                                        {/* <div>
                                            <Link
                                                to={`/category/${cat}/${subcat}/${item.prod_code}`}
                                                style={{
                                                    ...styles.textButton,
                                                    color: colors.grey
                                                }}
                                            >
                                                ADD TO WISHLIST →
                                            </Link>
                                        </div> */}
                                    </div>
                                </div>
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
        </section>
    );
};

export default withRouter(NoCarousel);
