import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { font } from "theme";
import DesktopProductList from "./DesktopProductList";
import MobileProductList from "./MobileProductList";
import "./index.css";
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    productContainer: {
        marginRight: window.innerWidth < 768 ? 0 : "auto",
        margin: window.innerWidth < 768 ? "auto" : 0
    }
}));
export default function ProductList({ data }) {


    const sortProducts = (prods) => {
        return prods.sort((a, b) => a.prod_order - b.prod_order );
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {data.map((type, index) => {
                return (
                    <div key={index} id={type.name}>
                        <h1
                            style={{
                                color: "#1E1E1E",
                                fontFamily: font.secondary,
                                fontWeight: "bold",
                                fontSize: "3.0rem",
                                margin: "-10px 0px -10px",
                                textAlign: "left"
                            }}
                        >
                            {type.name}
                        </h1>
                        <Grid n
                            container
                            item
                            spacing={2}
                            xs={12}
                            sm={12}
                            md={10}
                            lg={11}
                            className={classes.productContainer}
                        >
                            {window.innerWidth < 768 ? (
                                <MobileProductList data={sortProducts(type.products)} />
                            ) : (
                                <DesktopProductList data={sortProducts(type.products)} />
                            )}
                        </Grid>
                        {index !== data.length - 1 && (
                            <div className="productlist-break" />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
