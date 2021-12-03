import React from "react";
import { font } from "theme";
import MyCarousel from "./carousel";
import { withRouter } from "react-router-dom";

function Section6({ product, match, history }) {
    const { accessories } = product || [];
    const {
        params: { cat }
    } = match;
    if (!accessories) return null;
    if (accessories.length < 1) return null;
    return (
        <div
            style={{
                backgroundColor: "#fff",
                    width: "100%",
                    paddingTop: 30,
                    marginTop: -1,
                    paddingBottom: 90
            }}
        >
            <div style={{ textAlign: "center" }}>
                <p
                    style={{
                        fontSize: "2.6rem",
                        fontWeight: "bold",
                        fontFamily: font.secondary,
                        lineHeight: 0.8,
                        color: "#1E1E1E",
                        marginBottom: 30
                    }}
                >
                    {cat.replace("_", " ")} {product.code} Accessories
                </p>
            </div>
            <MyCarousel data={accessories} />
            {/* <div style={{ marginTop: 10 }}>
                <p
                    style={{
                        fontSize: "1rem",
                        textAlign: "center",
                        color: "#BCBDBC"
                    }}
                >
                    View more accessories →
                </p>
            </div> */}
        </div>
    );
}

export default withRouter(Section6);
