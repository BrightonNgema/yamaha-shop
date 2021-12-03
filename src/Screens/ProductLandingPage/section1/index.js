import React from "react";
import Info from "./Info";

const Section1 = ({ product, catId }) => {
    return (
        <div
            style={{
                backgroundImage: `linear-gradient(rgba(25, 25, 25,0.3), rgba(8, 8, 8,0.3)),url(${
                    process.env.REACT_APP_URL + product.header_image
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "105vh",
                width: "100%",
                marginTop: 120,
            }}
        >
            <Info product={product} catId={catId} />
        </div>
    );
};
export default Section1;
