import React, { Component } from "react";
import { animateScroll } from 'react-scroll';
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


export class EventPage extends Component {
    state = {
        loadingEvents: true,
        event: {},
        otherEvents: [],
        shareDialogVisible: false,
        shareUrl: "",
        maxItems: 4
    };

    componentDidMount = () => {
        this.fetchEvents();
    };

    fetchEvents = () => {
        axios
            .get("https://api.yamaha.co.za/api/events")
            .then(response => {
                this.setState({
                    loadingEvents: false,
                    otherEvents: this.filterCurrentEvent(response.data.data),
                    event: this.getCurrentEvent(response.data.data),
                });
            })
            .catch(error => console.warn(error))
            .then(() => {
                this.setState({ loadingEvents: false });
            });
    };

    filterCurrentEvent = events => {
        const AllEvents = events.upcoming_events.concat(events.past_events);
        const otherEvents = AllEvents.filter((event) => {
                console.log(event.title.replace(/ /g,"_").toLowerCase())
                return event.title.replace(/ /g,"_").toLowerCase() !== this.props.match.params.slug
        });
        return otherEvents;
    };

    getCurrentEvent = events => {
        const AllEvents = events.upcoming_events.concat(events.past_events);
        const currentEvent = AllEvents.find(
            event => event.title.replace(/ /g,"_").toLowerCase() === this.props.match.params.slug
        );
        if (!currentEvent) return this.props.history.push("/events");
        return currentEvent;
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
    toggleMaxItems = () => {
        this.setState(prevState => ({
            maxItems: prevState.maxItems === 4 ? 100 : 4
        }));
    };

    render() {
        const {
            loadingEvents,
            otherEvents,
            maxItems,
            event,
            shareDialogVisible,
            shareUrl
        } = this.state;
        const descriptionArray = event.content ? event.content.split("\n") : [];
        return (
            <div>
                <SeoTag
                    title={`Yamaha South Africa | Events | ${event.title}`}
                    description="Keep track of all the Yamaha events, across all divisions as well as at World of Yamaha."
                    keywords="Events, find an event, book an event, world of Yamaha"
                />
                <Page
                    loading={loadingEvents}
                    usePrimaryTheme
                    footerProps={{
                        mainFooter: true
                    }}
                    navBarProps={{
                        topColor: isIE ? "#FFF" : "rgba(255,255,255,96%)",
                        bottomColor: isIE ? "#FFF" : "rgba(255,255,255,88%)",
                        search: true,
                        menuColor: "black",
                        menuDrawerInfo: [],
                        logoColor: "black"
                    }}
                >
                    <Grid container>
                        <Grid item xs={12} md={12}>
                            <Typography variant="h2">{event.title}</Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <img
                                alt={event.title}
                                src={`${process.env.REACT_APP_URL}${event.event_img}`}
                                style={{ maxHeight: 300, maxWidth:'100%' }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="subtitle2"
                            style={{ marginTop: 8, marginBottom: 8 }}
                        >
                            Event Date: {event.event_date}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {descriptionArray.map((item, i) => {
                            if (item.length < 4) return null;
                            return (
                                <Typography
                                    key={i}
                                    variant="body1"
                                    style={{ marginTop: 16 }}
                                >
                                    {item.replace(/\n/g, "")}
                                </Typography>
                            );
                        })}
                    </Grid>
                    <Grid container style={{ marginTop: 24, marginBottom: 24 }}>
                        <Grid item xs="auto" md="auto">
                            <Button
                                type="yamaha-btn-lg yamaha-btn-primary"
                                title="Contact Us"
                                link="/contact"
                            />
                        </Grid>
                        {/* <Grid item xs="auto" md="auto" style={{ marginLeft: 10 }}>
                        <Button
                            type="yamaha-btn-lg yamaha-btn-secondary"
                            title="BOOK EVENT "
                            onClick={() => {
                                // const mail = "mailto:web@yamaha.co.za";
                                const mail = "google.co.za";
                                window.location.assign(mail);
                            }}
                        />
                    </Grid> */}
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Divider variant="middle" />
                    </Grid>
                    {/* <Grid
                    container
                    spacing={2}
                    style={{ paddingBottom: 100, marginTop: 30 }}
                >
                    {otherEvents.map((item, index) => (
                        <Grid item xs={4} md={4} key={index}>
                            <ContentItem
                                item={item}
                                onShare={url => this.onShare(url)}
                            />
                        </Grid>
                    ))}
                </Grid> */}
                    <Grid item xs={12}>
                        <Typography align="center" variant="h2">
                            OTHER EVENTS
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        style={{ paddingBottom: 100, marginTop: 30 }}
                    >
                        <Grid item xs={12} className="grid-list-container">
                            <GridList
                                cols={
                                    isMobile
                                        ? Math.max(maxItems, otherEvents.length)
                                        : 4
                                }
                                style={{
                                    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
                                    transform: "translateZ(0)"
                                }}
                            >
                                {otherEvents
                                    .slice(
                                        0,
                                        isMobile
                                            ? Math.max(
                                                maxItems,
                                                otherEvents.length
                                            )
                                            : maxItems
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
                            <MaterialButton
                                variant="outlined"
                                onClick={this.toggleMaxItems}
                            >
                                SHOW {maxItems === 4 ? "MORE" : "LESS"}
                                {maxItems === 4 ? <AddIcon /> : <RemoveIcon />}
                            </MaterialButton>
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

export default EventPage;
