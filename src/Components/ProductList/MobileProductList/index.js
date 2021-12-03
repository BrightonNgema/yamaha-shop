import React from "react";
import "./index.css";
import { ProductCard } from "components";
import Carousel from "nuka-carousel";
import { withRouter } from 'react-router-dom';

function MobileProductList({ data, match }) {
    if (data.length < 1) {
        return (
            <div style={{ margin: "auto", paddingTop: 25, paddingBottom: 0 }}>
                <h3 style={{ color: "red" }}>No Products Yet ....</h3>
            </div>
        );
    }

    const isMarine = match.params.cat === "marine"
    // sort by price
    // const sortBy = isMarine ? "prod_order" : "price"
    // data.sort(function (a, b) {

    //     a = a[sortBy]
    //         .replace("r", "")
    //         .replace(/,/g, "")
    //         .replace(".", "");
    //     b = b[sortBy]
    //         .replace("r", "")
    //         .replace(/,/g, "")
    //         .replace(".", "");

    //     return isMarine ? Number(a) - Number(b) : Number(b) - Number(a);
    // });
    return (
        <Carousel
            style={{ paddingTop: 30, height: "100%" }}
            heightMode="max"
            showArrows={true}
            showNextPrev={false}
            cellAlign="right"
        >
            {data.map((x, index) => (
                <ProductCard key={index} product={x} />
            ))}
        </Carousel>
    );
}

export default withRouter(MobileProductList)