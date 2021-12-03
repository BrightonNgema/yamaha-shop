import React, { Component } from "react";
import { NavBar, Footer, Toastr } from "components";
import { colors } from "theme";
import { isIE } from "react-device-detect";
import { Helmet } from "react-helmet";
import PersonalDetailsForm from "./PersonalDetailsForm";
import Schema from "validate";
import './../../../Assets/styles/global.css'
import { connect } from 'react-redux'
import { CircularProgress, Grid } from '@material-ui/core';
import { getUser, profileSet, null_status } from '../../../Redux/Actions/user';
import { withRouter } from "react-router-dom";

class PersonalDetailsPage extends Component {
    state = {
        reduxSet: false,
        loading: true,
        fields: {}, //Fields is the checkbox list items
        errors: {},
        yamahaProducts: [
            {
                label: "Audio Visual Products",
                key: "audio_visual_products",
            },
            {
                label: "Motorcycle/ATV Products",
                key: "motorcycle_atv_products",
            },
            {
                label: "Power Products",
                key: "power_products",
            },
            {
                label: "Music Products",
                key: "music_products",
            },
            {
                label: "Pro Audio Products",
                key: "pro_audio_products",
            },
        ],
        form: {
            name: "",
            surname: "",
            phone: "",
            email: "",
            retype_email: "",
            password: "",
            c_password: "",
            company: "",
            tax_number: "",
        },
        openAlert: false,
        variant: ""
    };
    constructor(props) {
        super(props)

    }
    formValidator = new Schema({
        name: { type: String, required: true, message: "Name is required" },
        surname: {
            type: String,
            required: true,
            message: "Surname is required",
        },
        phone: { type: String, required: true, message: "Phone is required" },
        email: {
            type: String,
            required: true,
            match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            message: "Email is required",
        },
        company: { type: String, },
        tax_number: { type: String, },
    });


    componentWillMount() {
        let { dispatch } = this.props;
        dispatch(null_status());
        dispatch(getUser());

    }

    handleClose() {
        this.setState({ ...this.state, openAlert: false })
    }


    componentDidUpdate() {
        switch (this.props.status) {
            case "success":
                if (this.state.reduxSet != true) {
                    let messages = {};
                    if (this.props.message) {
                        messages = {
                            variant: "success",
                            message: this.props.message,
                            openAlert: true
                        }
                    }

                    let temp = this.props.user.product_owned ? this.props.user.product_owned.split(",") : []

                    let listOfItems = this.state.yamahaProducts.map(item => {
                        if (temp.includes(item.key)) {
                            return {
                                key: item.key,
                                value: true,
                                label: item.label
                            }

                        }
                        return item;
                    })
                    let fieldsList = {}
                    temp.forEach((val) => {
                        fieldsList[`${val}`] = true

                    });

                    this.setState({
                        ...this.state,
                        reduxSet: true,
                        loading: false,
                        ...messages,
                        form: {

                            name: this.props.user.name,
                            surname: this.props.user.surname,
                            phone: this.props.user.phone,
                            email: this.props.user.email,
                            retype_email: this.props.user.email,
                            password: "",
                            c_password: "",
                            company: this.props.user.company,
                            tax_number: this.props.user.tax_number,
                            product_owned: temp
                        },
                        yamahaProducts: listOfItems,
                        fields: fieldsList
                    })
                }
                break;
            case "errors":
                if (!this.state.reduxSet) {
                    let errors = {}
                    let messages = {}

                    if (this.props.errors) {
                        errors = this.props.errors
                    }
                    if (this.props.message) {
                        messages = { message: this.props.message }
                    }
                    this.setState({
                        ...this.state,
                        reduxSet: true,
                        loading: false,
                        errors: errors,
                        openAlert: true,
                        variant: "error",
                        ...messages
                    })
                }
                break;
            default:
                break;

        }
    }
    formHandler = () => {
        let { dispatch } = this.props;

        let errors = this.formValidator.validate(this.state.form);

        if (errors.length > 0) {
            let tempError = {};
            errors.forEach((val) => {
                tempError[val.path] = val.message;
            });
            this.setState({ errors: tempError });

        } else {

            let objKey = this.state.yamahaProducts;
            let remapping = objKey.filter((val) => {
                if (val.value == true) {
                    return val.key
                }
            }).map(product => {
                return product.key
            });

            this.setState({ ...this.state, reduxSet: false, lock: true, loading: true })
            dispatch(profileSet({ ...this.state.form, product_owned: remapping.join(',') }))
        }
    };

    handleChange = (key, value) => {
        let errors = this.state.errors;
        let tempForm = this.state.form;
        tempForm[key] = value;

        this.setState({ errors: errors, form: tempForm });
    };

    onChange = (name, value) => {
        this.setState((state, props) => {
            const currentFields = state.fields;
            currentFields[name] = value;
            return { fields: currentFields };
        });

    };

    setField = (key, value, index) => {
        let temp = this.state.yamahaProducts;
        temp[index].value = value;
        this.setState({
            ...this.state,
            yamahaProducts: temp
        })
    }

    render() {
        const footerMenu = [
            {
                title: "Home",
                link: "/",
            },
            {
                title: "Warranty",
                link: "/warranty",
            },
            {
                title: "Yamaha Finance",
                link: "/finance",
            },
            {
                title: "Find My Dealer",
                link: "/dealer",
            },
        ];
        const TopHeader = () => {
            return (
                <div className="heading-main">
                    <h1 className="contact-heading">PERSONAL DETAILS</h1>
                    <span className="contact-subheading">
                        Enter your details below
                    </span>
                </div>
            );
        };
        return (
            <div style={{ background: colors.light, overflow: "hidden" }}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Yamaha South Africa | Personal Details</title>
                    <link
                        rel="canonical"
                        href="https://www.yamaha.co.za/account/personal_details"
                    />
                    <meta name="description" content="Update your account" />
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
                <Toastr
                    onClose={() => { this.handleClose() }}
                    horizontalPosition="right"
                    open={this.state.openAlert}
                    message={this.state.message}
                    variant={this.state.variant}
                    duration={3000}>
                </Toastr>
                <div className="generic-container">

                    <div style={{ padding: "40px 0px", flexGrow: 1 }}>
                        <TopHeader />
                        {this.state.loading ? (
                            <Grid container>

                                <Grid item xs={12} md={12} style={{ textAlign: "center", marginTop: 200 }}>

                                    <CircularProgress size={50} color={"primary"} />
                                </Grid>

                            </Grid>
                        ) : (
                                <PersonalDetailsForm
                                    states={this.state}
                                    onChangeHandler={this.handleChange}
                                    onChange={this.onChange}
                                    onFormSubmit={this.formHandler}
                                    buttonName="Update"
                                    buttonName2=""
                                    setFieldValue={(k, v, index) => this.setField(k, v, index)}
                                    props={this.props}
                                />
                            )}
                    </div>
                </div>
                <Footer mainFooter />
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        errors: state.userReducer.error,
        status: state.userReducer.status,
        user: state.userReducer.user,
        message: state.userReducer.message
    }
}
export default withRouter(connect(mapStateToProps)(PersonalDetailsPage));


