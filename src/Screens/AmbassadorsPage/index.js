import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { withTheme } from "@material-ui/styles";
import {
    Button,
    Grid,
    GridList,
    GridListTile,
    Typography
} from "@material-ui/core";
import {
    ShareDialog,
    Page,
    NavBar,
    AmbassadorCarousel,
    Footer,
    SeoTag
} from "components";
import ContentItem from "./ContentItem";
import moment from "moment";

import axios from "axios";
import { isMobile } from "react-device-detect";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
// const ambassador = {
//     id: 1,
//     name: "UPCOMING EVENTS",
//     description: ""
// };

const sortEvents = items => {
    return items.sort((a, b) => {
        const aPublishedDate = moment(a.event_start_date);
        const bPublishedDate = moment(b.event_start_date);
        return bPublishedDate.diff(aPublishedDate);
    });
};

class AmbassadorsPage extends Component {
    static propTypes = {
        // prop: PropTypes
    };

    state = {
        loading: true,
        ambassador: [],
        shareDialogVisible: false,
        shareUrl: "",
        searchQuery: "",
        carouselIndex: 0,
        maxMusicItems: 4,
        maxMotoItems: 4,
        // maxMarineItems: 4,
        maxGolfItems: 4,
    };

    componentDidMount = () => {
        // emulate loading.
        this.fetchEvents();
    };

    fetchEvents = async () => {
        try {
            const resBanner = await axios.get("https://api.yamaha.co.za/api/banners")
            const resAmba = await axios.get("https://api.yamaha.co.za/api/ambassadors")
            this.setState({
                ambassador: resAmba.data.data,
                bannerData: resBanner.data.data,
                loading: false
            });
        } catch (error) {

        }

    };

    getCarouselData = () => {
        return this.state.bannerData;
    };

    next = () => {
        const carouselData = this.getCarouselData();
        if (this.state.carouselIndex >= carouselData.length - 1) {
            this.setState({ carouselIndex: 0 });
        } else {
            this.setState({ carouselIndex: this.state.carouselIndex + 1 });
        }
    };

    previous = () => {
        const carouselData = this.getCarouselData();
        if (this.state.carouselIndex === 0) {
            this.setState({ carouselIndex: carouselData.length - 1 });
        } else {
            this.setState({ carouselIndex: this.state.carouselIndex - 1 });
        }
    };

    onShare = url => {
        this.setState({ shareUrl: url, shareDialogVisible: true });
    };
    closeShareDialog = () => {
        this.setState({ shareDialogVisible: false });
    };

    toggleMaxItems = cat => {
        this.setState(prevState => ({
            [cat]: prevState[cat] === 4 ? 100 : 4
        }));
    };
    categorizeAmbassadors = division => {
        const ambs = this.state.ambassador.filter(
            data => data.division.toLowerCase() === division
        );
        if (ambs) {
            return ambs
        }
        return []
    };

    renderCarousel = () => {
        const carouselData = this.getCarouselData();
        if (!carouselData[this.state.carouselIndex]) return carouselData[0];
        return (
            <AmbassadorCarousel
                navbar={
                    <NavBar
                        topColor="rgba(0,0,0,96%)"
                        bottomColor="rgba(0,0,0,90%)"
                        search
                        logoColor="white"
                        menuDrawerInfo={[]}
                        menuColor="white"
                        categoryMenu={[]}
                    />
                }
                onStepper={({ index }) =>
                    this.setState({ carouselIndex: index })
                }
                activeData={carouselData[this.state.carouselIndex]}
                data={carouselData}
                next={this.next}
                previous={this.previous}
                footer={<Footer mainFooter />}
            />
        );
    };

    render() {
        const {
            loading,
            shareUrl,
            shareDialogVisible,
            maxMusicItems,
            maxMotoItems,
            maxGolfItems,
            // maxMarineItems
        } = this.state;
        return (
            <div style={{ backgroundColor: "#111" }}>
                <SeoTag
                    title="Yamaha South Africa | Ambassadors"
                    url="https://www.yamaha.co.za/ambassadors"
                    description="Our ambassadors embody the appearance, demeanour, values and ethics of Yamaha A positive spokesperson, an opinion leader or a community influencer, appointed as an internal or external agent to boost and create brand awareness."
                    keywords=""
                />
                <Page
                    loading={loading}
                    carousel={!loading ? this.renderCarousel() : null}
                >

                    {/* MUSIC */}
                   {this.categorizeAmbassadors("music").length > 0 && (
                        <Grid
                            container
                            style={{ paddingBottom: 100, marginTop: -100 }}
                            id="music"
                        >
                            <Grid item xs={12} className="grid-list-container">
                                <Grid item xs={12}>
                                    <Typography
                                        align="center"
                                        variant="h2"
                                        color="primary"
                                    >
                                        MUSIC AMBASSADORS
                                    </Typography>
                                </Grid>
                                <GridList
                                    cols={
                                        isMobile
                                            ? Math.max(
                                                  maxMusicItems,
                                                  this.categorizeAmbassadors(
                                                      "music"
                                                  ).length
                                              )
                                            : 4
                                    }
                                    style={{
                                        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
                                        transform: "translateZ(0)"
                                    }}
                                >
                                    {sortEvents(
                                        this.categorizeAmbassadors("music")
                                    )
                                        .slice(
                                            0,
                                            isMobile
                                                ? Math.max(
                                                      maxMusicItems,
                                                      this.categorizeAmbassadors(
                                                          "music"
                                                      ).length
                                                  )
                                                : maxMusicItems
                                        )
                                        .map(item => (
                                            <GridListTile
                                                key={`item_${item.id}`}
                                            >
                                                <ContentItem
                                                    item={item}
                                                    onShare={url =>
                                                        this.onShare(url)
                                                    }
                                                />
                                            </GridListTile>
                                        ))}
                                </GridList>
                            </Grid>
                            <Grid
                                className="more-btn-container"
                                item
                                xs={12}
                                align="center"
                                style={{ marginTop: 50 }}
                            >
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() =>
                                        this.toggleMaxItems("maxMusicItems")
                                    }
                                >
                                    SHOW {maxMusicItems === 4 ? "MORE" : "LESS"}
                                    {maxMusicItems === 4 ? (
                                        <AddIcon />
                                    ) : (
                                        <RemoveIcon />
                                    )}
                                </Button>
                            </Grid>
                        </Grid>
                    )}

                    {/* MOTORCYCLES */}
                    {this.categorizeAmbassadors("motorcycles").length > 0 && (
                        <Grid
                            container
                            style={{ paddingBottom: 100, marginTop: -60 }}
                            id="motorcycles"
                        >
                            <Grid item xs={12} className="grid-list-container">
                                <Grid item xs={12}>
                                    <Typography
                                        align="center"
                                        variant="h2"
                                        color="primary"
                                    >
                                        MOTORCYCLES AMBASSADORS
                                    </Typography>
                                </Grid>
                                <GridList
                                    cols={
                                        isMobile
                                            ? Math.max(
                                                  maxMotoItems,
                                                  this.categorizeAmbassadors(
                                                      "motorcycles"
                                                  ).length
                                              )
                                            : 4
                                    }
                                    style={{
                                        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
                                        transform: "translateZ(0)"
                                    }}
                                >
                                    {sortEvents(
                                        this.categorizeAmbassadors(
                                            "motorcycles"
                                        )
                                    )
                                        .slice(
                                            0,
                                            isMobile
                                                ? Math.max(
                                                      maxMotoItems,
                                                      this.categorizeAmbassadors(
                                                          "motorcycles"
                                                      ).length
                                                  )
                                                : maxMotoItems
                                        )
                                        .map(item => (
                                            <GridListTile
                                                key={`item_${item.id}`}
                                            >
                                                <ContentItem
                                                    item={item}
                                                    onShare={url =>
                                                        this.onShare(url)
                                                    }
                                                />
                                            </GridListTile>
                                        ))}
                                </GridList>
                            </Grid>
                            <Grid
                                className="more-btn-container"
                                item
                                xs={12}
                                align="center"
                                style={{ marginTop: 50 }}
                            >
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() =>
                                        this.toggleMaxItems("maxMotoItems")
                                    }
                                >
                                    SHOW {maxMotoItems === 4 ? "MORE" : "LESS"}
                                    {maxMotoItems === 4 ? (
                                        <AddIcon />
                                    ) : (
                                        <RemoveIcon />
                                    )}
                                </Button>
                            </Grid>
                        </Grid>
                    )}

                    {/* MARINE  */}
                    {/* {this.categorizeAmbassadors("marine").length > 0 && (
                        <Grid
                            container
                            style={{ paddingBottom: 100, marginTop: -60 }}
                            id="marine"
                        >
                            <Grid item xs={12} className="grid-list-container">
                                <Grid item xs={12}>
                                    <Typography
                                        align="center"
                                        variant="h2"
                                        color="primary"
                                    >
                                        MARINE AMBASSADORS
                                    </Typography>
                                </Grid>
                                <GridList
                                    cols={
                                        isMobile
                                            ? Math.max(
                                                maxMusicItems,
                                                this.categorizeAmbassadors(
                                                    "marine"
                                                ).length
                                            )
                                            : 4
                                    }
                                    style={{
                                        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
                                        transform: "translateZ(0)"
                                    }}
                                >
                                    {sortEvents(
                                        this.categorizeAmbassadors("marine")
                                    )
                                        .slice(
                                            0,
                                            isMobile
                                                ? Math.max(
                                                    maxMusicItems,
                                                    this.categorizeAmbassadors(
                                                        "marine"
                                                    ).length
                                                )
                                                : maxMusicItems
                                        )
                                        .map(item => (
                                            <GridListTile
                                                key={`item_${item.id}`}
                                            >
                                                <ContentItem
                                                    item={item}
                                                    onShare={url =>
                                                        this.onShare(url)
                                                    }
                                                />
                                            </GridListTile>
                                        ))}
                                </GridList>
                            </Grid>
                            <Grid
                                className="more-btn-container"
                                item
                                xs={12}
                                align="center"
                                style={{ marginTop: 50 }}
                            >
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() =>
                                        this.toggleMaxItems("maxMusicItems")
                                    }
                                >
                                    SHOW {maxMusicItems === 4 ? "MORE" : "LESS"}
                                    {maxMusicItems === 4 ? (
                                        <AddIcon />
                                    ) : (
                                            <RemoveIcon />
                                        )}
                                </Button>
                            </Grid>
                        </Grid>
                    )} */}

                    {/* GOLF  */}
                    {this.categorizeAmbassadors("golf car").length > 0 && (
                        <Grid
                            container
                            style={{ paddingBottom: 100, marginTop: -60 }}
                            id="golf car"
                        >
                            <Grid item xs={12} className="grid-list-container">
                                <Grid item xs={12}>
                                    <Typography
                                        align="center"
                                        variant="h2"
                                        color="primary"
                                    >
                                        GOLF CAR AMBASSADORS
                                    </Typography>
                                </Grid>
                                <GridList
                                    cols={
                                        isMobile
                                            ? Math.max(
                                                maxGolfItems,
                                                this.categorizeAmbassadors(
                                                    "golf car"
                                                ).length
                                            )
                                            : 4
                                    }
                                    style={{
                                        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
                                        transform: "translateZ(0)"
                                    }}
                                >
                                    {sortEvents(
                                        this.categorizeAmbassadors("golf car")
                                    )
                                        .slice(
                                            0,
                                            isMobile
                                                ? Math.max(
                                                    maxGolfItems,
                                                    this.categorizeAmbassadors(
                                                        "golf car"
                                                    ).length
                                                )
                                                : maxGolfItems
                                        )
                                        .map(item => (
                                            <GridListTile
                                                key={`item_${item.id}`}
                                            >
                                                <ContentItem
                                                    item={item}
                                                    onShare={url =>
                                                        this.onShare(url)
                                                    }
                                                />
                                            </GridListTile>
                                        ))}
                                </GridList>
                            </Grid>
                            <Grid
                                className="more-btn-container"
                                item
                                xs={12}
                                align="center"
                                style={{ marginTop: 50 }}
                            >
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() =>
                                        this.toggleMaxItems("maxGolfItems")
                                    }
                                >
                                    SHOW {maxGolfItems === 4 ? "MORE" : "LESS"}
                                    {maxGolfItems === 4 ? (
                                        <AddIcon />
                                    ) : (
                                            <RemoveIcon />
                                        )}
                                </Button>
                            </Grid>}
                        </Grid>
                    )}

                    {/* power products */}
                    {/* {this.categorizeAmbassadors("power_products").length > 0 && (
                        <Grid
                            container
                            style={{ paddingBottom: 100, marginTop: -60 }}
                            id="power_products"
                        >
                            <Grid item xs={12} className="grid-list-container">
                                <Grid item xs={12}>
                                    <Typography
                                        align="center"
                                        variant="h2"
                                        color="primary"
                                    >
                                        POWER PRODUCTS AMBASSADORS
                                    </Typography>
                                </Grid>
                                <GridList
                                    cols={
                                        isMobile
                                            ? Math.max(
                                                maxMusicItems,
                                                this.categorizeAmbassadors(
                                                    "power_products"
                                                ).length
                                            )
                                            : 4
                                    }
                                    style={{
                                        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
                                        transform: "translateZ(0)"
                                    }}
                                >
                                    {sortEvents(
                                        this.categorizeAmbassadors("power_products")
                                    )
                                        .slice(
                                            0,
                                            isMobile
                                                ? Math.max(
                                                    maxMusicItems,
                                                    this.categorizeAmbassadors(
                                                        "power_products"
                                                    ).length
                                                )
                                                : maxMusicItems
                                        )
                                        .map(item => (
                                            <GridListTile
                                                key={`item_${item.id}`}
                                            >
                                                <ContentItem
                                                    item={item}
                                                    onShare={url =>
                                                        this.onShare(url)
                                                    }
                                                />
                                            </GridListTile>
                                        ))}
                                </GridList>
                            </Grid>
                            <Grid
                                className="more-btn-container"
                                item
                                xs={12}
                                align="center"
                                style={{ marginTop: 50 }}
                            >
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() =>
                                        this.toggleMaxItems("maxMusicItems")
                                    }
                                >
                                    SHOW {maxMusicItems === 4 ? "MORE" : "LESS"}
                                    {maxMusicItems === 4 ? (
                                        <AddIcon />
                                    ) : (
                                            <RemoveIcon />
                                        )}
                                </Button>
                            </Grid>
                        </Grid> */}
                    )}
                    
                    <ShareDialog
                        url={shareUrl}
                        visible={shareDialogVisible}
                        close={this.closeShareDialog}
                    />
                </Page>
            </div>
        );
    }
}

export default withTheme(AmbassadorsPage);
