import React, { Component } from "react";
import { ShareDialog, Page, Button, SeoTag } from "components";
import {
    Grid,
    Typography,
    Divider,
    GridList,
    GridListTile
} from "@material-ui/core";
import MaterialButton from "@material-ui/core/Button";
// import moment from "moment";
import axios from "axios";
import ContentItem from "../ContentItem";
import { isMobile, isIE } from "react-device-detect";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { animateScroll } from "react-scroll";

export class AmbassadorPage extends Component {
    state = {
        loadingEvents: true,
        ambassador: {},
        otherAmbassadors: [],
        shareDialogVisible: false,
        shareUrl: "",
        maxMusicItems: 4,
        maxMotoItems: 4
    };

    componentDidMount = () => {
        this.fetchEvents();
        animateScroll.scrollToTop();
    };

    fetchEvents = () => {
        axios
            .get(
                "https://api.yamaha.co.za/api/ambassadors"
            )
            .then(response => {
                this.setState({
                    loadingEvents: false,
                    otherAmbassadors: this.filterCurrentEvent(
                        response.data.data
                    ),
                    ambassador: this.getCurrentEvent(response.data.data)
                });
            })
            .catch(error => console.warn(error))
            .then(() => {
                this.setState({ loadingEvents: false });
            });
    };

    filterCurrentEvent = ambassadors => {
        return ambassadors.filter(
            ambassador => ambassador.slug !== this.props.match.params.slug
        );
    };

    getCurrentEvent = ambassadors => {
        const amb = ambassadors.find(
            ambassador => ambassador.slug === this.props.match.params.slug
        );
        if (!amb) return this.props.history.push("/ambassadors");
        return amb;
    };

    componentWillReceiveProps = () => {
        this.fetchEvents();
        animateScroll.scrollToTop();
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
        return this.state.otherAmbassadors.filter(
            data => data.division.toLowerCase() === division
        );
    };

    render() {
        const {
            loadingEvents,
            otherAmbassadors,
            maxMusicItems,
            maxMotoItems,
            ambassador,
            shareDialogVisible,
            shareUrl
        } = this.state;
        const descriptionArray = ambassador.biography
            ? ambassador.biography.split("\n")
            : [];
        return (
            <div style={{ backgroundColor: "#111" }}>
                {!loadingEvents && <SeoTag
                    title={`Yamaha South Africa | Ambassadors | ${ambassador.name}`}
                    url={`https://www.yamaha.co.za/ambassadors/${this.props.match.params.slug}`}
                    description={ambassador.biography.slice(0, 320)}
                    keywords=""
                />}
                <Page
                    loading={loadingEvents}
                    footerProps={{
                        mainFooter: true
                    }}
                    navBarProps={{
                        topColor: isIE ? "#000" : "rgba(0,0,0,96%)",
                        bottomColor: isIE ? "#000" : "rgba(0,0,0,90%)",
                        search: true,
                        menuColor: "white",
                        menuDrawerInfo: [],
                        logoColor: "white"
                    }}
                >
                    <Grid item xs={12}>
                        <Typography variant="h2" color="primary">
                            {ambassador.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <img
                            alt={ambassador.name}
                            src={`${process.env.REACT_APP_URL}${ambassador.img}`}
                            style={{ maxHeight: 300 }}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 16 }}>
                        <Typography align="left" variant="h5" color="primary">
                            Biography
                        </Typography>
                        {descriptionArray.map((item, i) => {
                            if (item.length < 4) return <br key={i} />;
                            return (
                                <Typography
                                    variant="body1"
                                    style={{ color: "#fff" }}
                                    key={i}
                                >
                                    {item.replace(/\n/g, "")}
                                </Typography>
                            );
                        })}
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 16 }}>
                        <Typography align="left" variant="h5" color="primary">
                            Testimonial
                        </Typography>
                        <Typography variant="body1" style={{ color: "#fff" }}>
                            {ambassador.testinomial}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 16 }}>
                        <Typography align="left" variant="h5" color="primary">
                            Product Used
                        </Typography>
                        <Typography variant="body1" style={{ color: "#fff" }}>
                            {ambassador.product_used}
                        </Typography>
                    </Grid>
                    <Grid container style={{ marginTop: 24, marginBottom: 24 }}>
                        <Grid item xs="auto" md="auto">
                            {ambassador.link && (
                                <Button
                                    type="yamaha-btn-lg yamaha-btn-primary"
                                    title="More Info"
                                    onClick={() => window.open(ambassador.link)}
                                />
                            )}
                        </Grid>
                        {/* <Grid
                            item
                            xs="auto"
                            md="auto"
                            style={{ marginLeft: 10 }}
                        >
                            {ambassador.link && (
                                <Button
                                    type="yamaha-btn-lg yamaha-btn-outline"
                                    title="More Info"
                                    onClick={() => window.open(ambassador.link)}
                                />
                            )}
                        </Grid> */}
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Divider variant="middle" />
                    </Grid>
                    {this.categorizeAmbassadors("music").length > 0 && (
                        <Grid
                            container
                            style={{ paddingBottom: 100, marginTop: 30 }}
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
                                    {this.categorizeAmbassadors("music")
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
                                        .map(item => {
                                            return (
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
                                            );
                                        })}
                                </GridList>
                            </Grid>
                            <Grid
                                className="more-btn-container"
                                item
                                xs={12}
                                align="center"
                                style={{ marginTop: 50 }}
                            >
                                <MaterialButton
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
                                </MaterialButton>
                            </Grid>
                        </Grid>
                    )}
                    {this.categorizeAmbassadors("motorcycles").length > 0 && (
                        <Grid
                            container
                            style={{ paddingBottom: 100, marginTop: 30 }}
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
                                                otherAmbassadors.length
                                            )
                                            : 4
                                    }
                                    style={{
                                        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
                                        transform: "translateZ(0)"
                                    }}
                                >
                                    {this.categorizeAmbassadors("motorcycles")
                                        .slice(
                                            0,
                                            isMobile
                                                ? Math.max(
                                                    maxMotoItems,
                                                    otherAmbassadors.length
                                                )
                                                : maxMotoItems
                                        )
                                        .map(item => {
                                            return (
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
                                            );
                                        })}
                                </GridList>
                            </Grid>
                            <Grid
                                className="more-btn-container"
                                item
                                xs={12}
                                align="center"
                                style={{ marginTop: 50 }}
                            >
                                <MaterialButton
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
                                </MaterialButton>
                            </Grid>
                        </Grid>
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

export default AmbassadorPage;
