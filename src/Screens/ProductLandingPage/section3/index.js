import React from "react";
import { font } from "theme";
import { Button } from "components";
import { Link } from "react-router-dom";
import { scroller } from "react-scroll";

const anchor = id => {
    scroller.scrollTo(id, {
        duration: 500,
        hashSpy: true,
        delay: 100,
        smooth: true,
        offset: -100
    });
};
const Section3 = ({ product }) => {
    let price = product.price ? product.price : "";
    price = price.length === 0 ? "TBA" : price.toUpperCase();
    const isFrom =
        !price.toLowerCase().includes("tba") &&
        !price.toLowerCase().includes("price")
            ? "FROM " + price + " Incl. VAT"
            : price;
    return (
        <div
            style={{
                backgroundColor: "#000",
                width: "100%",
                marginTop: -1,
                paddingTop: 30,
                paddingBottom: 90
            }}
        >
            <div style={{ textAlign: "center" }}>
                <p
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        fontFamily: font.secondary,
                        lineHeight: 0.8,
                        marginBottom: -40
                    }}
                >
                    {isFrom}
                </p>
                <p className="section-large-heading">Interested in buying?</p>
                <p
                    style={{
                        color: "#BCBDBC",
                        marginBottom: 30,
                        textTransform: "initial"
                    }}
                >
                    Get in touch or find a dealer near you to view this product
                </p>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 30
                    }}
                >
                    <div style={{ marginRight: 10 }}>
                        <Button
                            title="find a dealer"
                            onClick={() => anchor("branches")}
                            type="yamaha-btn-sm yamaha-btn-primary"
                        />
                    </div>
                    <div>
                        <Button
                            title="get in touch"
                            link="/contact"
                            type="yamaha-btn-sm yamaha-btn-primary"
                        />
                    </div>
                </div>
                <Link
                    to="/finance/types_of_finance"
                    style={{
                        textDecoration: "none",
                        fontSize: "0.8rem",
                        color: "#BCBDBC"
                    }}
                >
                    learn about finance →
                </Link>
            </div>
        </div>
    );
};

export default Section3;
