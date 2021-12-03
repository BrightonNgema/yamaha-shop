import React, { Component } from "react";
import { NavBar, Footer, SeoTag, ShareDialog, ActivityLoader } from "components";
import { colors } from "theme";
import { Button, Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import BackToTheFuture from "../../../Assets/images/2018_yam_wandw_eu_all_sta_004-61331.jpg";
import "./index.css";
import { animateScroll } from "react-scroll";
import ContentItem from "./ContentItem";
import { isMobile } from 'react-device-detect';
// import { moment } from 'moment';

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { withTheme } from "@material-ui/styles";
import { vacancies } from "./vancancies.data";
import { isIE } from 'react-device-detect';
const jobs = vacancies

const sortEvents = items => {
    // return items.sort((a, b) => {
    //     const aPublishedDate = moment(a.event_start_date);
    //     const bPublishedDate = moment(b.event_start_date);
    //     return bPublishedDate.diff(aPublishedDate);
    // });
    return items
};

class VacanciesPage extends Component {


    state = {
        active: 0,
        maxItem: 4,
        shareUrl: "",
        shareDialogVisible: false,
        loading: true
    }
    componentDidMount() {
        animateScroll.scrollToTop();
        this.setState({ loading: false });

    }

    toggleMaxItems = (value) => {
        this.setState(prevState => ({
            [value]: prevState[value] === 4 ? 100 : 4
        }));
    };
    onShare = url => {
        this.setState({ shareUrl: url, shareDialogVisible: true });
    };

    closeShareDialog = () => {
        this.setState({ shareDialogVisible: false });
    };

    render() {
        const { maxItem, shareDialogVisible, shareUrl, loading } = this.state
        return (
            <ActivityLoader loading={loading}>
                <div style={{ background: colors.light, overflow: "hidden" }}>
                    <SeoTag
                        title="Yamaha South Africa | Recruitment"
                        description="Join the Yamaha family."
                        keywords="Job search, find a job, vacancies, available jobs"
                    />
                    <NavBar
                        topColor={isIE ? "#000" : "rgba(0,0,0,96%)"}
                        bottomColor={isIE ? "#000" : "rgba(0,0,0,88%)"}
                        search
                        menuColor="white"
                        logoColor="white"
                    />
                    <div className="recruit-header-bg">
                        <Container>
                            <h1>
                                Join the <br />
                            yamaha family
                        </h1>
                            <p>
                                But in order to do this, we need passionate
                            <br />
                            people who believe in what we do. Is that you?
                        </p>
                            {/* <Button
                            variant="contained"
                            color="primary"
                            className="yamaha-btn yamaha-btn-primary"
                        >
                            Send us your cv
                        </Button> */}
                        </Container>
                    </div>

                    <div className="section">
                        <Container>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <img src={BackToTheFuture} alt="" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <h1 className="kando">
                                        AT YAMAHA, WE ARE <br /> THE “
                                    <span>KANDO</span>” CREATING
                                    <br /> COMPANY
                                </h1>
                                    <p style={{ textTransform: "initial" }}>
                                        What is Kando you ask? Quite simply, Kando
                                        is an emotion that is best described as the
                                        feeling of deep satisfaction and intense
                                        excitement that we experience when we
                                    encounter something of exceptional value.{" "}
                                        <br />
                                        <br />
                                    We create Kando for our customers by
                                    offering them the most exciting and highest
                                    quality products in our industry. But in
                                    order to do this, we need passionate people
                                    who believe in what we do. <br />
                                        <br /> Is that you?
                                </p>
                                </Grid>
                            </Grid>
                            <hr />
                        </Container>
                    </div>
                    <div>
                        <Container style={{ paddingBottom: 100 }}>
                            <Grid container style={{ flexGrow: 1 }} spacing={2}>
                                <Grid item xs={12}>
                                    {jobs.length < 1 && <h1 style={{ color: '#000' }}>No vacancies currently available</h1>}
                                    {jobs.length > 0 && <h1 style={{ color: '#000', textAlign: 'center', marginBottom: 40 }}>AVAILABLE VACANCIES</h1>}
                                    {/* <Grid container justify="center" spacing={1}>
                                    {["Marketing","Developemnt","Design","PR"].map((i, index) => {
                                        const activeClass = this.state.active === index ? "yamaha-btn-primary" : "yamaha-btn-unselected"
                                        return (
                                            <Grid item >
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className={`yamaha-btn ${activeClass}`}
                                                >
                                                    {i}
                                                </Button>
                                            </Grid>
                                        )
                                    })}
                                </Grid> */}

                                    {jobs.length > 0 && <Grid item xs={12}>
                                        <Grid container justify="center" spacing={2}>
                                            {sortEvents(jobs)
                                                .slice(
                                                    0,
                                                    isMobile
                                                        ? Math.max(maxItem, jobs.length)
                                                        : maxItem
                                                )
                                                .map((item, i) => (
                                                    <Grid key={i} item xs={12} md={3}>
                                                        <ContentItem
                                                            item={item}
                                                            onShare={url =>
                                                                this.onShare(url)
                                                            }
                                                        />
                                                    </Grid>
                                                ))}
                                        </Grid>
                                        {jobs.length > 4 && <Grid
                                            className="more-btn-container"
                                            item
                                            xs={12}
                                            align="center"
                                            style={{ marginTop: 50 }}
                                        >
                                            <Button
                                                variant="outlined"
                                                onClick={() => this.toggleMaxItems("maxItem")}
                                            >
                                                SHOW {maxItem === 4 ? "MORE" : "LESS"}
                                                {maxItem === 4 ? <AddIcon /> : <RemoveIcon />}
                                            </Button>
                                        </Grid>}
                                    </Grid>}
                                </Grid>
                            </Grid>
                        </Container>
                        <ShareDialog
                            url={shareUrl}
                            visible={shareDialogVisible}
                            close={this.closeShareDialog}
                        />
                    </div>
                    <Footer mainFooter />
                </div>
            </ActivityLoader>
        );
    }
}

export default withTheme(VacanciesPage);;
