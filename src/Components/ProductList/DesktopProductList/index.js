import React from "react";
import { ProductCard } from "components";
import { withRouter } from 'react-router-dom';

function DesktopProductList({ data, match}) {
    
    if (data.length < 1) {
        return (
            <div style={{ minHeight: 200, margin: "auto", paddingTop: 50 }}>
                <h1 style={{ color: "red" }}>No Products Yet ....</h1>
            </div>
        );
    }
    
    const isMarine = match.params.cat === "marine"
    const sortBy = isMarine ? "prod_order" :"price" 
    // sorting by price
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

    return data.map((product, index) => {
        return <ProductCard key={index} product={product} />;
    });
}
export default withRouter(DesktopProductList)