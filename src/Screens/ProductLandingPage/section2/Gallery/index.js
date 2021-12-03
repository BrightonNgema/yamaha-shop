import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { Button } from "components";
import { isMobile } from "react-device-detect";
import Carousel from "nuka-carousel";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default class Gallery extends Component {
    state = {
        limit: 4,
        isOpen: false,
        photoIndex: 0
    };

    showMore = () => this.setState({ limit:999 });

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                {this.state.isOpen && (
                    <Lightbox
                        enableZoom={false}
                        animationDuration={100}
                        discourageDownloads={false}
                        mainSrc={
                            process.env.REACT_APP_URL +
                            this.props.product.gallery[this.state.photoIndex]
                        }
                        nextSrc={
                            this.props.product.gallery[
                                (this.state.photoIndex + 1) %
                                    this.props.product.gallery.length
                            ]
                        }
                        prevSrc={
                            this.props.product.gallery[
                                (this.state.photoIndex +
                                    this.props.product.gallery.length -
                                    1) %
                                    this.props.product.gallery.length
                            ]
                        }
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex:
                                    (this.state.photoIndex +
                                        this.props.product.gallery.length -
                                        1) %
                                    this.props.product.gallery.length
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex:
                                    (this.state.photoIndex + 1) %
                                    this.props.product.gallery.length
                            })
                        }
                    />
                )}
                <div
                    style={{
                        padding: 5,
                        width: "max-content",
                        margin: "auto",
                        backgroundColor: "white",
                        marginTop: 50
                    }}
                >
                    <span className="subcategory-text">
                        {this.props.product.code}
                    </span>
                </div>
                <p
                    className="section-large-heading"
                    style={{ marginBottom: 30, marginTop: 10 }}
                >
                    GALLERY
                </p>
                {isMobile ? (
                    <Grid container spacing={2} style={{ margin: "auto" }}>
                        <Carousel
                            className="product-landing top"
                            wrapAround
                            slidesToShow={2}
                            cellSpacing={15}
                            cellAlign="center"
                        >
                            {this.props.product.gallery.map((x, index) => {
                                return (
                                    <Grid
                                        item
                                        key={index}
                                        style={{ pointerEvents: "all" }}
                                        onClick={() =>
                                            this.setState({
                                                isOpen: true,
                                                photoIndex: index
                                            })
                                        }
                                    >
                                        <div
                                            style={{
                                                width: "100%",
                                                maxWidth: 200,
                                                height: 200,
                                                borderRadius: 5,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                backgroundImage: `url(${process
                                                    .env.REACT_APP_URL + x})`
                                            }}
                                        />
                                    </Grid>
                                );
                            })}
                        </Carousel>
                    </Grid>
                ) : (
                    <React.Fragment>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={9}
                            lg={9}
                            style={{ margin: "auto" }}
                        >
                            <Grid
                                container
                                spacing={2}
                                style={{ margin: "auto" }}
                            >
                                {this.props.product.gallery.map((x, index) => {
                                    if (index >= this.state.limit) return null;
                                    return (
                                        <Grid
                                            key={index}
                                            item
                                            xs={6}
                                            sm={6}
                                            md={3}
                                            lg={3}
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                this.setState({
                                                    isOpen: true,
                                                    photoIndex: index
                                                })
                                            }
                                        >
                                            <div
                                                style={{
                                                    width: "100%",
                                                    maxWidth: 300,
                                                    height: 200,
                                                    borderRadius: 5,
                                                    backgroundSize: "cover",
                                                    backgroundPosition:
                                                        "center",
                                                    backgroundImage: `url(${process
                                                        .env.REACT_APP_URL +
                                                        x})`
                                                }}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                            {this.state.limit < this.props.product.gallery.length &&
                                <div style={{ marginTop: 20 }}>
                                    <Button
                                        title="Show more +"
                                        onClick={this.showMore}
                                        type="yamaha-btn-xs yamaha-btn-outline"
                                    />
                                </div>}
                    </React.Fragment>
                )}
            </div>
        );
    }
}
