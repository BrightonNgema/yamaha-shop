import React from "react";
import { Grid } from "@material-ui/core";
import { Button } from "components";
import { font } from "theme";
const styles = {
    main: {
        margin: "20px auto"
    },
    heading: {
        fontSize: "1.9rem",
        color: "#1E1E1E",
        textAlign: "left",
        fontFamily: font.secondary,
        fontWeight: "bold",
        marginBottom: 0
    },
    price: {
        fontSize: "1rem",
        color: "#BCBDBC",
        textAlign: "left",
        fontFamily: font.primary,
        margin: 0,
        marginBottom: 10,
        textTransform: "initial"
    },
    desc: {
        fontSize: "0.875rem",
        color: "#616365",
        textAlign: "left",
        fontFamily: font.primary,
        textTransform: "initial",
        width: "80%",
        display: "-webkit-inline-box"
    },
    image: {
        width: "80%",
        // marginLeft:isMobile ? 0: -50
        height: 280,
        maxWidth: 350
    },
    compare: {
        fontSize: "0.75rem",
        color: "#616365",
        textAlign: "left",
        cursor: "pointer",
        textTransform: "uppercase"
    }
};

export default function ProductInfo({ products, onRemove }) {
    return products.map(prod => {
        let price = prod.price ? prod.price : "";
        price = price.length === 0 ? "TBA" : price.toUpperCase();
        const isFrom =
            !price.toLowerCase().includes("tba") &&
            !price.toLowerCase().includes("price")
                ? "FROM " + price + " Incl. VAT"
                : price;
        return (
            <React.Fragment key={prod.prodID}>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={8 / products.length}
                    style={styles.main}
                >
                    <div style={{ marginBottom: 10 }}>
                        <Button
                            type="yamaha-btn-lg yamaha-btn-secondary"
                            title="X Remove"
                            onClick={() => onRemove(prod.prodID)}
                        />
                    </div>
                    <div
                        style={{
                            margin: "0px 0px -20px",
                            textAlign: "left"
                        }}
                    >
                        <img
                            alt="product"
                            src={process.env.REACT_APP_URL + prod.prod_img}
                            style={styles.image}
                        />
                    </div>
                    <p style={styles.heading}>{prod.code}</p>
                    <p style={styles.price}>{isFrom}</p>

                    <Grid container spacing={3}>
                        <Grid item md="auto">
                            <Button
                                title="View"
                                link={`/category/${prod.cat}/${prod.subcat}/${prod.code}`}
                                type="yamaha-btn yamaha-btn-primary"
                            />
                        </Grid>
                        <Grid item md="auto">
                            <Button
                                title="GET IN TOUCH"
                                link="/contact"
                                type="yamaha-btn yamaha-btn-secondary"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    });
}
