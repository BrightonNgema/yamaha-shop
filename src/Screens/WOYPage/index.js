import React, { Component } from "react";
import { ActivityLoader, NavBar, Footer, Toastr } from "components";
import { colors } from "theme";
import "./index.css";
import Section1 from "./section1";
import Section2 from "./section2";
import Section3 from "./section3";
import Section4 from "./section4";
import Section5 from "./section5";
import { animateScroll } from "react-scroll";
import { Helmet } from 'react-helmet';
import axios from 'axios'
import { isIE } from 'react-device-detect';
export default class WOYPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            open: false,
            message: "",
            data: {}
        };
    }

    componentDidMount() {
        animateScroll.scrollToTop();
        return this.onLoad();
    }
    componentWillReceiveProps() {
        return this.onLoad();
    }

    onLoad = async () => {
        this.setState({ loading: true });
        try {
            const baseUrl = process.env.REACT_APP_API_URL;
            let res = await axios.get(baseUrl + `world-of-yamaha`);
            let {
                data: { data }

            } = res;
            this.setState({
                data: data[0],
                loading: false,
            })
        } catch (error) {

        }
    };

    render() {
        // const fullnamevalid = regex.fullname.test(this.state.fullname);
        // const emailvalid = regex.email.test(this.state.email);
        // const phonenumbervalid = regex.cellnumber.test(this.state.phone);
        // const addressValid = this.state.address.length > 10;
        // const inputValid =
        //     fullnamevalid && emailvalid && phonenumbervalid && addressValid;
        // const buttonType = inputValid ? "primary" : "disabled";

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
        return (
            <ActivityLoader loading={this.state.loading}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Yamaha South Africa | World Of Yamaha</title>
                    <link
                        rel="canonical"
                        href="https://www.yamaha.co.za/woy"
                    />
                    <meta
                        name="description"
                        content=" "
                    />
                    <meta name="keywords" content="" />
                </Helmet>
                <div style={{ background: colors.dark, overflow: "hidden" }}>
                    <NavBar
                        topColor={isIE ? "#000" : "rgba(0,0,0,96%)"}
                        bottomColor={isIE ? "#000" : "rgba(0,0,0,88%)"}
                        search
                        menuDrawerInfo={footerMenu}
                        menuColor="white"
                        logoColor="white"
                    />
                    <Section1 data={this.state.data} />
                    <Section2 data={this.state.data} />
                    <Section3 data={this.state.data} />
                    <Section4 data={this.state.data} />
                    <Section5 onForm={() => this.setState({ open: true })} />
                    <Toastr
                        open={this.state.open}
                        message={this.state.message}
                        onClose={() => this.setState({ open: false })}
                    />
                    {/* <TopHeader />
                        <ContactForm
                            state={this.state}
                            onChangeHandler={this.onChangeHandler}
                            buttonType={buttonType}
                            formHandler={this.formHandler}
                            onCancel={() => this.setState({ address: "" })}
                        />
                       
                        <BottomHeader />
                        <div style={{ padding: "40px 0px", flexGrow: 1 }}>
                            <Grid container spacing={10}>
                                <Grid item xs={12} sm={12}>
                                    <BranchList
                                        category={this.props.match.params.cat}
                                    />
                                </Grid>
                            </Grid>
                        </div>*/}
                    <Footer mainFooter />
                </div>
            </ActivityLoader>
        );
    }
}
