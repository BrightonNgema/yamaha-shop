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
    EventsCarousel,
    Footer,
    SeoTag
} from "components";
import ContentItem from "./ContentItem";
import moment from "moment";

import axios from "axios";
import { isMobile } from "react-device-detect";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { colors } from 'theme';
// const events = {
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

class EventsPage extends Component {
    static propTypes = {
        // prop: PropTypes
    };

    state = {
        loading: true,
        events: {},
        pastevents: [],
        upcomingevents: [],
        shareDialogVisible: false,
        shareUrl: "",
        searchQuery: "",
        carouselIndex: 0,
        maxUpcomingItems: 4,
        maxPastItems: 4
    };

    componentDidMount = () => {
        // emulate loading.
        this.fetchEvents();
    };

    fetchEvents = () => {
        axios
            .get("https://api.yamaha.co.za/api/events")
            .then(response => {
                this.setState({
                    events: response.data.data,
                    pastevents: response.data.data.past_events,
                    upcomingevents: response.data.data.upcoming_events.reverse(),
                });
            })
            .catch(error => console.warn(error))
            .then(() => {
                this.setState({ loading: false });
            });
    };

    getCarouselData = () => {
        const { pastevents, upcomingevents } =  this.state
        const carouselData = upcomingevents.concat(pastevents);
        return carouselData
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

    toggleMaxItems = (value) => {
        this.setState(prevState => ({
            [value]: prevState[value] === 4 ? 100 : 4
        }));
    };

    renderCarousel = () => {
        const carouselData = this.getCarouselData();
        if (!carouselData[this.state.carouselIndex]) return null;
        return (
            <EventsCarousel
                navbar={
                    <NavBar
                        topColor="rgba(0,0,0,96%)"
                        bottomColor="rgba(0,0,0,90%)"
                        search
                        logoColor="white"
                        menuDrawerInfo={[]}
                        menuColor="black"
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
            pastevents,
            upcomingevents,
            shareUrl,
            shareDialogVisible,
            maxUpcomingItems,
            maxPastItems
        } = this.state;
        return (
            <div>
                <SeoTag
                    title="Yamaha South Africa | Events"
                    description="Keep track of all the Yamaha events, across all divisions as well as at World of Yamaha."
                    keywords="Events, find an event, book an event, world of Yamaha"
                />
                <Page
                    loading={loading}
                    carousel={!loading ? this.renderCarousel() : null}
                >
                    <Grid
                        container
                        style={{ paddingBottom: 100, marginTop: 30 }}
                    >
                        <Grid item xs={12}>
                            <Typography align="center" variant="h2">
                                UPCOMING EVENTS
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <h1 style={{textAlign:'center', color:colors.primary}}>No upcoming events currently available</h1>
                        </Grid>
                        {upcomingevents.length > 0 &&
                            <Grid item xs={12} className="grid-list-container">
                                <GridList
                                    cols={
                                        isMobile
                                            ? Math.max(maxUpcomingItems, upcomingevents.length)
                                            : 4
                                    }
                                    style={{
                                        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
                                        transform: "translateZ(0)"
                                    }}
                                >
                                    {sortEvents(upcomingevents)
                                        .slice(
                                            0,
                                            isMobile
                                                ? Math.max(maxUpcomingItems, upcomingevents.length)
                                                : maxUpcomingItems
                                        )
                                        .map(item => (
                                            <GridListTile key={`item_${item.id}`}>
                                                <ContentItem
                                                    item={item}
                                                    onShare={url =>
                                                        this.onShare(url)
                                                    }
                                                />
                                            </GridListTile>
                                        ))}
                                </GridList>
                            </Grid>}
                        {upcomingevents.length > 4 &&<Grid
                            className="more-btn-container"
                            item
                            xs={12}
                            align="center"
                            style={{ marginTop: 50 }}
                        >
                            <Button
                                variant="outlined"
                                onClick={() => this.toggleMaxItems("maxUpcomingItems")}
                            >
                                SHOW {maxUpcomingItems === 4 ? "MORE" : "LESS"}
                                {maxUpcomingItems === 4 ? <AddIcon /> : <RemoveIcon />}
                            </Button>
                        </Grid>}
                    </Grid>
                        
                    <Grid
                        container
                        style={{ paddingBottom: 100 }}
                    >
                        <Grid item xs={12}>
                            <Typography align="center" variant="h2">
                                PAST EVENTS
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className="grid-list-container">
                            <GridList
                                cols={
                                    isMobile
                                        ? Math.max(maxPastItems, pastevents.length)
                                        : 4
                                }
                                style={{
                                    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
                                    transform: "translateZ(0)"
                                }}
                            >
                                {sortEvents(pastevents)
                                    .slice(
                                        0,
                                        isMobile
                                            ? Math.max(maxPastItems, pastevents.length)
                                            : maxPastItems
                                    )
                                    .map(item => (
                                        <GridListTile key={`item_${item.id}`}>
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
                                onClick={() => this.toggleMaxItems("maxPastItems")}
                            >
                                SHOW {maxPastItems === 4 ? "MORE" : "LESS"}
                                {maxPastItems === 4 ? <AddIcon /> : <RemoveIcon />}
                            </Button>
                        </Grid>
                    </Grid>
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

export default withTheme(EventsPage);
