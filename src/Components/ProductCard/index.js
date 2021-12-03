import React from "react";
import Grid from "@material-ui/core/Grid";
import { font } from "theme";
import { Button } from "components";
import "./index.css";
import { withRouter } from "react-router-dom";
import { isMobile } from "react-device-detect";
import TextTruncate from "react-text-truncate";
import AddToCompare from "../AddToCompare";

const styles = {
    main: {
        margin: "20px 0",
    },
    heading: {
        fontSize: "1.9rem",
        color: "#1E1E1E",
        textAlign: "left",
        fontFamily: font.secondary,
        fontWeight: "bold",
        marginBottom: 0,
    },
    price: {
        fontSize: "1rem",
        color: "#BCBDBC",
        textAlign: "left",
        fontFamily: font.primary,
        margin: 0,
        textTransform: "initial",
    },
    desc: {
        fontSize: "0.875rem",
        color: "#616365",
        textAlign: "left",
        fontFamily: font.primary,
        textTransform: "initial",
        width: isMobile ? "95%" : "80%",
        display: "-webkit-inline-box",
    },
    image: {
        width: isMobile ? "100%" : "80%",
        // marginLeft:isMobile ? 0: -50
        maxWidth: 350,
    },
    compare: {
        fontSize: "0.75rem",
        color: "#616365",
        textAlign: "left",
        cursor: "pointer",
        textTransform: "uppercase",
    },
};

const firstLetterUpper = (newDesc) => {
    var ProdDesc = newDesc.replace(/(^\s*\w|[.!?;:]\s*\w)/g, (description) => {
        return description.toUpperCase();
    });
    return ProdDesc;
};

const ProductCard = ({ product, match }) => {

    console.log("From the product card --> ", product)

    const {
        params: { cat, subcat },
    } = match;
    const singleProd = `/category/${cat}/${subcat}/${product.prod_code}`;
    let prodDesc = product.description
        ? firstLetterUpper(product.description)
        : product.description;

    let price = product.price ? product.price : "";
    price = price.length === 0 ? "TBA" : price;
    const isFrom =
        !price.toLowerCase().includes("tba") &&
            !price.toLowerCase().includes("price")
            ? "FROM " + price.toUpperCase() + " Incl. VAT"
            : price.toUpperCase();

    return (
        <React.Fragment>
            <Grid item xs={12} sm={6} md={4} style={styles.main}>
                <div
                    style={{
                        margin: "0px 0px -20px",
                        textAlign: "left",
                        minHeight: 200,
                    }}
                >
                    <img
                        alt="product"
                        src={process.env.REACT_APP_URL + product.prod_img}
                        style={styles.image}
                    />
                </div>
                <p style={styles.heading}>{product.prod_code}
                    {product.syspro_discount !== "0.00" && product.syspro_discount !== null ? <span style={{ marginLeft: 5, padding: 5, fontSize: 12, fontFamily: "ubuntu", color: "white", backgroundColor: "#009DD2", display: "inline-block", lineHeight: "normal", verticalAlign: "middle" }}>PROMOTION</span>
                        : <></>}

                </p>
                <p style={styles.price}>{isFrom}
                    {product.discount ?
                        <span style={{ textDecoration: "line-through", fontSize: 12, color: "#d52b1e" }}>{product.price}</span>
                        : <></>}
                </p>
                {/* <div className="product-desc" style={styles.desc}>
                    {prodDesc}
                </div> */}

                <TextTruncate
                    containerClassName="product-desc"
                    line={6}
                    element="div"
                    truncateText="…"
                    text={prodDesc}
                // textTruncateChild={<a href="#">Read on</a>}
                />
                <Grid container spacing={1}>
                    <Grid item xs={3} sm={4} md={4} lg={3}>
                        <Button
                            title="View"
                            link={singleProd}
                            type="yamaha-btn yamaha-btn-primary"
                        />
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={9}>
                        {/* TODO: edit the Add to cart button */}
                        {singleProd ===
                            `/category/home_audio/${subcat}/${product.prod_code}` ? (
                                <Button
                                    title="Make Selection"
                                    link={`${singleProd}/add-to-cart`}
                                    type="yamaha-btn yamaha-btn-secondary"
                                />
                            ) : (
                                <Button
                                    title="GET IN TOUCH"
                                    link="/contact"
                                    type="yamaha-btn yamaha-btn-secondary"
                                />
                            )}
                    </Grid>
                </Grid>
                <AddToCompare product={product}>
                    <p style={styles.compare}>ADD TO COMPARE → {product.id}</p>
                </AddToCompare>
            </Grid>
        </React.Fragment>
    );
};

export default withRouter(ProductCard);
