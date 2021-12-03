import React from "react";
import { Button } from "components";
import { Grid } from "@material-ui/core";
import Gallery from "./Gallery";
import NavTabs from "./Tab";
import SpecAccordian from "./SpecAccordian";
import { withRouter } from "react-router-dom";
import { images } from "assets";

const downloadSpecSheet = pdf =>
    window.open(process.env.REACT_APP_URL + pdf, "_blank");

function Section2({ product, match }) {
const isVideo = product.video ? { backgroundImage: `url(${images.red_lines})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}

    return (
        <div
            id="specification"
            style={{
                backgroundColor: "#1E1E1E",
                minHeight: "100vh",
                height: "auto",
                paddingBottom: 40,
                width: "100%",
                marginTop: -1,
                paddingTop: 40
            }}
        >
            <div style={{ textAlign: "center" }}>
                <p
                    className="section-large-heading"
                    style={{ marginBottom: 30 }}
                >
                    SPECIFICATIONS
                </p>
                <Button
                    title="Download full spec sheet"
                    onClick={() => downloadSpecSheet(product.spec_sheet)}
                    type="yamaha-btn-sm yamaha-btn-outline"
                />
            </div>
            <Grid
                item
                xs={12}
                sm={10}
                md={11}
                style={{ margin: "auto", marginTop: 30 }}
            >
                <SpecAccordian product={product} />
            </Grid>

            <div style={{ textAlign: "center",...isVideo}}>
                <p
                    className="section-large-heading"
                    style={{ marginBottom: 30 }}
                >
                    FEATURES
                </p>
                {product.video && (
                    <Grid
                        container
                        xs={11}
                        sm={11}
                        md={9}
                        style={{ margin: "auto", height: product.video ? '100vh': null}}
                    >
                        <div className="video-container">
                            <iframe
                                title="video"
                                width="100%"
                                height="100%"
                                src={product.video}
                            />
                        </div>
                    </Grid>
                )}
            </div>
            {product.features.length > 1 && <NavTabs product={product} />}
            <Gallery product={product} />
        </div>
    );
}
export default withRouter(Section2);
