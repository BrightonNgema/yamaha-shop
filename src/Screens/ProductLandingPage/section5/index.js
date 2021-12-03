import React from "react";
import { font } from "theme";
import { Grid } from "@material-ui/core";
import Carousel from "nuka-carousel";
import './section5.css'
import Testimonial from './Testimonial';
export default function Section5({ product }) {
    if (product.testimonials.length < 1) return null
    return (
        <div
            style={{
                backgroundColor: "red",
                width: "100%",
                overflow: "hidden",
                minHeight: 150,
                marginTop: -1,
                paddingTop: 30,
                paddingBottom: 30
            }}
        >
            <div
                style={{
                    backgroundColor: "#1e1e1e",
                    width: "100%",
                    minHeight: 200,
                    paddingTop: 50,
                    paddingBottom: 100,
                    transform: "skewY(3deg)"
                }}
            >
                <div style={{ transform: "skewY(-3deg)" }}>
                    <div style={{ textAlign: "center" }}>
                        <p
                            style={{
                                fontSize: "2.6rem",
                                fontWeight: "bold",
                                fontFamily: font.secondary,
                                lineHeight: 0.8,
                                color: "#fff",
                                marginBottom: 30
                            }}
                        >
                            TESTIMONIALS
                        </p>

                        <Grid container spacing={2} xs={12} sm={11}
                              md={9} style={{ minHeight: 150, margin: "auto" }} >
                            <Carousel className="testimonial" slidesToShow={1} wrapAround>
                                {product.testimonials.map((testimonial) => <Testimonial testimonial={testimonial} />)}
                            </Carousel>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
}
