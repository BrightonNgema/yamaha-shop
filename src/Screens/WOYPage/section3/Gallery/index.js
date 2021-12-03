import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { Button } from "components";
import { isMobile, isTablet } from "react-device-detect";
import Carousel from "nuka-carousel";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const styles = {
    VenueServicesheader: {
        textAlign: isMobile && !isTablet ? "left" : "center",
        marginLeft: isMobile && !isTablet ? 15 : "",
        marginBottom: 30,
        fontSize: "2.2rem",
        fontFamily: "rift",
        fontWeight: "bold",
        color: "#1e1e1e"
    }
};

export default class Gallery extends Component {
    state = {
        limit: 4,
        isOpen: false,
        photoIndex: 0
    };

    showMore = () => this.setState({ limit: 999 });

    render() {
        return (
            <div
                style={{
                    textAlign: "center",
                    paddingTop: 40,
                    paddingBottom: 60,
                    backgroundColor: "#F4F4F4",
                    marginTop: -36
                }}
            >
                {this.state.isOpen && (
                    <Lightbox
                        enableZoom={false}
                        animationDuration={100}
                        mainSrc={
                            this.props.data.img[this.state.photoIndex]
                        }
                        nextSrc={
                            this.props.data.img[
                                (this.state.photoIndex + 1) %
                                    this.props.data.img.length
                            ]
                        }
                        prevSrc={
                            this.props.data.img[
                                (this.state.photoIndex +
                                    this.props.data.img.length -
                                    1) %
                                    this.props.data.img.length
                            ]
                        }
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex:
                                    (this.state.photoIndex +
                                        this.props.data.img.length -
                                        1) %
                                    this.props.data.img.length
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex:
                                    (this.state.photoIndex + 1) %
                                    this.props.data.img.length
                            })
                        }
                    />
                )}
                <p style={styles.VenueServicesheader}>Gallery</p>
                {isMobile ? (
                    <Grid container spacing={2} style={{ margin: "auto",paddingLeft:15, paddingRight:15}}>
                        <Carousel
                            className="product-landing top"
                            wrapAround
                            slidesToShow={2}
                            cellSpacing={15}
                            cellAlign="center"
                        >
                            {this.props.data.img.map((x, index) => {
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
                                                backgroundImage: `url(${process.env.REACT_APP_URL+x})`
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
                            md={11}
                            lg={11}
                            style={{ margin: "auto" }}
                        >
                            <Grid
                                container
                                spacing={2}
                                style={{ margin: "auto" }}
                            >
                                {this.props.data.img.map((x, index) => {
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
                                                    // maxWidth: 300,
                                                    height: 200,
                                                    borderRadius: 5,
                                                    backgroundSize: "cover",
                                                    backgroundPosition:
                                                        "center",
                                                    backgroundImage: `url(${process.env.REACT_APP_URL + x})`
                                                }}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                        {this.state.limit <
                            this.props.data.img.length && (
                            <div style={{ marginTop: 20 }}>
                                <Button
                                    title="Show more +"
                                    onClick={this.showMore}
                                    type="yamaha-btn-xs yamaha-btn-secondary"
                                />
                            </div>
                        )}
                    </React.Fragment>
                )}
            </div>
        );
    }
}
