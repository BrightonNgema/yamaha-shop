import React, { Component } from "react";
import { SeoTag, Page, Button, ShareDialog, Toastr } from "components";
import { colors, regex } from "theme";
import { Grid, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import axios from "axios";
import MaterialButton from "@material-ui/core/Button";
import "./index.css";
import { animateScroll, scroller } from "react-scroll";
import ContentItem from "./ContentItem";
import { isMobile } from 'react-device-detect';
// import { moment } from 'moment';

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { withTheme } from "@material-ui/styles";
import { vacancies } from "../VacanciesPage/vancancies.data";
import ContactForm from "./ContactForm";
import { isIE } from 'react-device-detect';
const sortEvents = items => {
    // return items.sort((a, b) => {
    //     const aPublishedDate = moment(a.event_start_date);
    //     const bPublishedDate = moment(b.event_start_date);
    //     return bPublishedDate.diff(aPublishedDate);
    // });
    return items
};


const defaultState = {
    fullname: "",
    phone: "",
    email: "",
    cover_letter: "",
    comments: "",
    button_loading: false
};
class VacancyPage extends Component {


    state = {
        active: 0,
        open: false,
        maxItem: 4,
        loading: true,
        vacancy: {},
        otherVacancies: [],
        shareDialogVisible: false,
        shareUrl: "",
        ...defaultState
    }

    componentDidMount() {
        animateScroll.scrollToTop();
        this.fetchEvents();
    }

    fetchEvents = () => {
        axios
            .get(
                "https://api.yamaha.co.za/api/ambassadors"
            )
            .then(response => {
                this.setState({
                    loading: false,
                    otherVacancies: this.filterCurrentEvent(
                        vacancies
                    ),
                    vacancy: this.getCurrentEvent(vacancies)
                });
            })
            .catch(error => console.warn(error))
            .then(() => {
                this.setState({ loading: false });
            });
    };

    filterCurrentEvent = vancancies => {
        return vancancies.filter(
            vacancy => vacancy.slug !== this.props.match.params.slug
        );
    };

    getCurrentEvent = vancancies => {
        const job = vancancies.find(
            vacancy => vacancy.slug === this.props.match.params.slug
        );
        if (!job) return this.props.history.push("/recruitment");
        return job;
    };

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

    onChangeHandler = (name, value) => {
        this.setState({ [name]: value });
    };
    formHandler = () => {
        const baseUrl = process.env.REACT_APP_API_URL;
        const { fullname, phone, email, cover_letter, cv } = this.state;
        const formData = new FormData();
        formData.append(
            "fullname",
            fullname
        );
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append(
            "cover_letter",
            cover_letter
        );
        formData.append(
            "cv",
            cv,
        );
        this.setState({ button_loading: true });
        axios({
            method: 'post',
            url: `${baseUrl}recruitment`,
            headers: { "Content-Type": "multipart/form-data" },
            data: formData
        })
            .then(response => {
                const {
                    data: { message }
                } = response;
                this.setState({
                    ...defaultState,
                    message,
                    button_loading: false,
                    open: true
                });
            })
            .catch(error => {
                this.setState({
                    button_loading: false,
                    ...defaultState
                });
            });
    };
    render() {
        const { maxItem, loading, vacancy, otherVacancies, shareUrl, shareDialogVisible } = this.state
        const fullnamevalid = regex.fullname.test(this.state.fullname);
        const emailvalid = regex.email.test(this.state.email);
        const phonenumbervalid = regex.cellnumber.test(this.state.phone);
        const inputValid = fullnamevalid && emailvalid && phonenumbervalid;
        const buttonType = inputValid ? "primary" : "disabled";
        return (
            <div style={{ background: colors.light, overflow: "hidden" }}>
                {!loading && <SeoTag
                    title={`Yamaha South Africa | Recruitment | ${vacancy.title}`}
                    description={vacancy.spec.slice(0, 320).replace(/<[^>]*>?/gm, '')}
                    keywords="Job search, find a job, vacancies, available jobs"
                />}
                <Page
                    loading={loading}
                    footerProps={{
                        mainFooter: true
                    }}
                    navBarProps={{
                        topColor: isIE ? "#000" : "rgba(0,0,0,96%)",
                        bottomColor: isIE ? "#000" : "rgba(0,0,0,88%)",
                        search: true,
                        menuColor: "white",
                        menuDrawerInfo: [],
                        logoColor: "white"
                    }}
                >
                    <Container style={{ paddingBottom: 50 }}>
                        <Grid item xs={12}>
                            <Typography variant="h2" color="primary" style={{ color: '#1e1e1e' }}>
                                {vacancy.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: -40 }}>
                            <Typography variant="p" color="primary" style={{ color: '#1e1e1e', fontWeight: 'bold' }}>
                                {vacancy.location}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <div style={{ textTransform: 'initial' }} dangerouslySetInnerHTML={{ __html: vacancy.spec }} />
                        </Grid>
                        <Grid container style={{ marginTop: 24, marginBottom: 24 }}>
                            <Grid item xs="auto" md="auto">

                                <Button
                                    type="yamaha-btn-lg yamaha-btn-primary"
                                    title="Submit your cv"
                                    onClick={() => {
                                        scroller.scrollTo("about-contact-form", {
                                            duration: 500,
                                            hashSpy: true,
                                            delay: 100,
                                            smooth: true,
                                            offset: -100
                                        });

                                    }}
                                />

                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <p style={{ color: '#1e1e1e', fontSize: 18, fontWeight: 'bold' }}>

                                {!vacancy.deadline ? "No Deadline Set" : `Deadline: ${vacancy.deadline}`}
                            </p>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: -20, fontSize: 12, color: colors.grey, textTransform: 'initial' }}>
                            <p>
                                <i>
                                    If you have not received a response within two weeks,
                                    your application was most likely unsuccessful.
                                </i>
                            </p>
                        </Grid>
                    </Container>
                    <div className="form_section">
                        <hr />
                        <Container style={{ paddingBottom: 100 }}>
                            <ContactForm
                                state={this.state}
                                onChangeHandler={this.onChangeHandler}
                                buttonType={buttonType}
                                formHandler={this.formHandler}
                                onCancel={() => this.setState({ address: "" })}
                            />
                        </Container>
                        <hr />
                    </div>
                    <div>
                        <Container style={{ paddingBottom: 100 }}>
                            <Grid container style={{ flexGrow: 1 }} spacing={2}>
                                <Grid item xs={12}>
                                    {otherVacancies.length < 1 && <h1 style={{ color: '#000' }}>No Other vacancies currently available</h1>}
                                    {otherVacancies.length > 0 && <h1 style={{ color: '#000', textAlign: 'center', marginBottom: 40 }}>OTHER VACANCIES</h1>}
                                    {otherVacancies.length > 0 &&
                                        <Grid item xs={12}>
                                            <Grid container justify="center" spacing={2}>
                                                {sortEvents(otherVacancies)
                                                    .slice(
                                                        0,
                                                        isMobile
                                                            ? Math.max(maxItem, otherVacancies.length)
                                                            : maxItem
                                                    )
                                                    .map((item, i) => (
                                                        <Grid key={i} item xs={3} md={3}>
                                                            <ContentItem
                                                                item={item}
                                                                onShare={url =>
                                                                    this.onShare(url)
                                                                }
                                                            />
                                                        </Grid>
                                                    ))}
                                            </Grid>
                                            {otherVacancies.length > 4 && <Grid
                                                className="more-btn-container"
                                                item
                                                xs={12}
                                                align="center"
                                                style={{ marginTop: 50 }}
                                            >
                                                <MaterialButton
                                                    variant="outlined"
                                                    onClick={() => this.toggleMaxItems("maxItem")}
                                                >
                                                    SHOW {maxItem === 4 ? "MORE" : "LESS"}
                                                    {maxItem === 4 ? <AddIcon /> : <RemoveIcon />}
                                                </MaterialButton>
                                            </Grid>}
                                        </Grid>}
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                    <ShareDialog
                        url={shareUrl}
                        visible={shareDialogVisible}
                        close={this.closeShareDialog}
                    />
                    <Toastr
                        open={this.state.open}
                        message={`If you have not received a response within two weeks, 
                                    your application was most likely unsuccessful.`}
                        onClose={() => this.setState({ open: false })}
                    />
                </Page>
            </div >

        );
    }
}

export default withTheme(VacancyPage);;
