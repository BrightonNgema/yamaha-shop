import React, { Component } from "react";
import { NavBar, Footer, YamahaMap } from "components";
import { colors, regex } from "theme";
import ContactForm from "./ContactForm";
import {
    TopHeader,
    // BottomHeader
} from "./Headers";
import Toastr from "components/Toastr";
import "./index.css";
// import BranchList from "./BranchList";
// import { Grid } from "@material-ui/core";
import { animateScroll } from "react-scroll";
import { Helmet } from "react-helmet";
import { isIE } from 'react-device-detect';

const axios = require("axios");
const defaultState = {
    fullname: "",
    phone: "",
    email: "",
    province: null,
    city: "",
    comments: ""
};
export default class ContactPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...defaultState,
            loading: false,
            open: false,
            message: ""
        };
    }

    componentDidMount() {
        animateScroll.scrollToTop();
    }

    onChangeHandler = (name, value) => this.setState({ [name]: value });
    formHandler = () => {
        const baseUrl = process.env.REACT_APP_API_URL;
        const { fullname, phone, email, city, province, comments } = this.state;
        this.setState({ loading: true });
        axios
            .post(baseUrl + "contact", {
                fullname: fullname,
                phone: phone,
                email: email,
                address: city + ', ' + province,
                comments: comments
            })
            .then(response => {
            
                const {
                    data: { message }
                } = response;
                this.setState({
                    ...defaultState,
                    message,
                    loading: false,
                    open: true
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
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
            },
            {
                title: "Find My Dealer",
                link: "/dealer"
            }
        ];
        const fullnamevalid = regex.fullname.test(this.state.fullname);
        const emailvalid = regex.email.test(this.state.email);
        const phonenumbervalid = regex.cellnumber.test(this.state.phone);
        const cityValid = this.state.city.length > 1;
        const inputValid =
            fullnamevalid && emailvalid && phonenumbervalid && cityValid && this.state.province;
        const buttonType = inputValid ? "primary" : "disabled";

        return (
            <div style={{ background: colors.light, overflow: "hidden" }}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Yamaha South Africa | Contact Us</title>
                    <link
                        rel="canonical"
                        href="https://www.yamaha.co.za/contact"
                    />
                    <meta
                        name="description"
                        content="Enter your details and we’ll get back to you."
                    />
                    <meta name="keywords" content="" />
                </Helmet>
                <NavBar
                    topColor={isIE ? "#FFF" : "rgba(255,255,255,96%)"}
                    bottomColor={isIE ? "#FFF" : "rgba(255,255,255,90%)"}
                    search
                    menuDrawerInfo={footerMenu}
                    menuColor="black"
                    logoColor="black"
                />
                <div className="contact-heading-container">
                    <TopHeader />
                    <ContactForm
                        state={this.state}
                        onChangeHandler={this.onChangeHandler}
                        buttonType={buttonType}
                        formHandler={this.formHandler}
                        onCancel={() => this.setState({ address: "" })}
                    />
                    <Toastr
                        open={this.state.open}
                        message={this.state.message}
                        onClose={() => this.setState({ open: false })}
                    />
                    {/* <BottomHeader />
                    <div style={{ padding: "40px 0px", flexGrow: 1 }}>
                        <Grid container spacing={10}>
                            <Grid item xs={12} sm={12}>
                                <BranchList />
                            </Grid>
                        </Grid>
                    </div> */}
                </div>
                <YamahaMap />
                <Footer mainFooter />
            </div>
        );
    }
}
