import React from "react";
import { withRouter } from "react-router-dom";
import "./index.css";
import { Button } from "components";
import { scroller } from "react-scroll";

const anchor = (id) => {
    scroller.scrollTo(id, {
        duration: 500,
        hashSpy: true,
        delay: 100,
        smooth: true,
        offset: -100,
    });
};
const Info = ({ product, catId }) => {
    let price = product.price ? product.price : "";
    price = price.length === 0 ? "TBA" : price.toUpperCase();
    const isFrom =
        !price.toLowerCase().includes("tba") &&
            !price.toLowerCase().includes("price")
            ? "FROM " + price + " Incl. VAT"
            : price;


    return (
        <div className="product-landing-info-main">
            <div
                style={{
                    padding: 5,
                    width: "max-content",
                    margin: "auto",
                    backgroundColor: " rgba(47, 47, 47, 0.53)",
                    borderRadius: 10,
                }}
            >
                <span className="subcategory-text">{product.code}</span>
            </div>
            <p
                style={{
                    textTransform: "initial",
                    fontSize: "1.5rem",
                    color: "#BCBDBC",
                    fontWeight: "bold",
                    fontFamily: "rift",
                    textShadow: "2px 2px rgba(0,0,0,1)",
                }}
            >
                {isFrom}
            </p>
            <p
                className="section-large-heading"
                style={{
                    maxWidth: "50%",
                    width: 350,
                    margin: "-10px auto 20px",
                }}
            >
                {product.heading}
            </p>
            <div
                style={{
                    maxWidth: "95%",
                    width: 600,
                    margin: "auto",
                    textTransform: "initial",
                }}
            >
                {product.description}
            </div>
            <div>
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        display: "inline-flex",
                    }}
                >
                    {/* <li style={{ marginRight: 10 }}>
                        <Button
                            onClick={() => anchor("branches")}
                            title="BOOK A TEST RIDE"
                            type="yamaha-btn-sm yamaha-btn-primary"
                        />
                    </li> */}
                    <li>
                        <Button
                            title="SPECIFICATIONS"
                            onClick={() => anchor("specification")}
                            type="yamaha-btn-sm yamaha-btn-outline"
                        />
                        <span style={{ padding: 5 }}></span>
                        {/* TODO: Added add to cart button */}
                        {catId === 4 ? (
                            <Button
                                title="Make Selection"
                                link={`${product.code}/add-to-cart`}
                                type="primary yamaha-btn-md"
                            />
                        ) : (
                                <></>
                            )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default withRouter(Info);
