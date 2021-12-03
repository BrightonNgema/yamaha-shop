import React, { Component } from "react";
import {
    ActivityLoader,
    Footer,
    AboutCarousel,
    NavBar,
    Toastr,
    SeoTag
} from "components";
import "./index.css";
import { Grid } from "@material-ui/core";
import ContactForm from "./ContactForm";
import Benefits from "./Benefits";
import Intro from "./Intro";
import { aboutSeoData } from "./about-seo-data";
import { animateScroll } from "react-scroll";
import { isMobile, isTablet, isIE } from "react-device-detect";
import AboutMenuList from "./AboutMenuList";
const axios = require("axios");

const defaultState = {
    fullname: "",
    phone: "",
    email: "",
    comments: ""
};
export default class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            buttonloading: false,
            ...defaultState,
            open: false,
            data: [],
            active: 0
        };
    }

    componentDidMount = async () => {
        animateScroll.scrollToTop();
        const query = this.props.location.query;
        const baseUrl = process.env.REACT_APP_API_URL;
        let res = await axios.get(baseUrl + "about-us");
        const data = res.data.data.filter((item) => item.title !== "club Yamaha")
        if (query) {
            const activeIndex = query.aboutIndex;

            if (activeIndex > data)
                return this.setState({ active: 0 });
            return this.setState({
                active: activeIndex,
                loading: false,
                data: data
            });
        }
        return this.setState({ loading: false, data: data });
    };

    nextAbout = () => {
        if (this.state.active >= this.state.data.length - 1) {
            this.setState({ active: 0 });
        } else {
            this.setState({ active: this.state.active + 1 });
        }
    };

    previousAbout = () => {
        if (this.state.active === 0) {
            this.setState({ active: this.state.data.length - 1 });
        } else {
            this.setState({ active: this.state.active - 1 });
        }
    };

    onActiveAbout = data => {
        this.setState({ active: data.index });
    };

    componentWillReceiveProps = nextProps => {
        const query = nextProps.location.query;
        if (query) {
            let activeIndex = query.aboutIndex;
            if (activeIndex > this.state.data)
                return this.setState({ active: 0 });

            return this.setState({
                active: activeIndex,
                loading: false
            });
        }
        return this.setState({ loading: false });
    };

    onChangeHandler = (text, value) => {
        this.setState({ [text]: value });
    };

    formHandler = () => {
        const baseUrl = process.env.REACT_APP_API_URL;
        const { fullname, phone, email, comments, data, active } = this.state;

        this.setState({ buttonloading: true });
        const formData = new FormData();
        const type = data[active].name;
        formData.append("fullname", fullname);
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append("type", type);
        formData.append("comments", comments);
        axios
            .post(`${baseUrl}about`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                const {
                    data: { message }
                } = response;
                this.setState({
                    ...defaultState,
                    message,
                    buttonloading: false,
                    open: true
                });
            })
            .catch(error => {
                this.setState({
                    buttonloading: false,
                    open: true,
                    ...defaultState
                });
            });
    };

    render() {
        const footerMenu = [
            {
                title: "Home",
                link: "/"
            },
            {
                title: "Warranty",
                link: "/warranty"
            },
            {
                title: "Yamaha Finance",
                link: "/finance"
            }
        ];
        return (
            <ActivityLoader loading={this.state.loading}>
                <SeoTag
                    title={aboutSeoData[this.state.active].title}
                    url={aboutSeoData[this.state.active].url}
                    description={aboutSeoData[this.state.active].description}
                    keywords={aboutSeoData[this.state.active].keywords}
                />
                <div style={{ paddingBottom: 100 }}>
                    <AboutCarousel
                        navbar={
                            <NavBar
                                topColor={isIE ? "#000" : "rgba(0,0,0,96%)"}
                                bottomColor={isIE ? "#000" : "rgba(0,0,0,88%)"}
                                search
                                // category={params.cat}
                                logoColor="white"
                                menuDrawerInfo={footerMenu}
                                categoryMenu={this.state.data}
                                activeAbout={this.state.active}
                            />
                        }
                        activeAbout={this.onActiveAbout}
                        onStepper={this.onActiveAbout}
                        activeData={this.state.data[this.state.active]}
                        data={this.state.data}
                        nextAbout={this.nextAbout}
                        previousAbout={this.previousAbout}
                        footer={<Footer mainFooter />}
                    />
                    <Grid container>
                        <Intro
                            activeData={this.state.data[this.state.active]}
                        />
                        <Benefits
                            activeData={this.state.data[this.state.active]}
                        />
                        <ContactForm
                            activeData={this.state.data[this.state.active]}
                            state={this.state}
                            onChangeHandler={this.onChangeHandler}
                            buttonType={"primary"}
                            formHandler={this.formHandler}
                            onCancel={() => this.setState({ address: "" })}
                        />
                    </Grid>
                    <Toastr
                        open={this.state.open}
                        message={this.state.message}
                        onClose={() => this.setState({ open: false })}
                    />
                    <Footer mainFooter />
                </div>
                {!(isMobile || isTablet) && (
                    <div className="menu-list-container">
                        <AboutMenuList
                            category={{
                                name: this.props.match.params.cat,
                                id: 1
                            }}
                            onActive={this.onActiveAbout}
                            data={this.state.data}
                            index={this.state.active}
                        />
                    </div>
                )}
            </ActivityLoader>
        );
    }
}
