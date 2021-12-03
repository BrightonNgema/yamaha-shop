// Assemble
import React, { Component } from "react";
import { NavBar, Footer, Toastr } from "components";
import { colors } from "theme";
import { isIE } from "react-device-detect";
import { Helmet } from "react-helmet";
import RegisterForm from "./RegisterForm";
import Schema from "validate";
import { register } from '../../../Redux/Actions/auth'
import './../../../Assets/styles/global.css'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import { Grid, CircularProgress } from "@material-ui/core";

class RegisterPage extends Component {
    state = {
        reduxSet: false,
        loading: false,
        lock: false,
        errorMessage: "",
        variant: null,
        fields: {}, //Fields is the checkbox list items
        errors: {},
        displayToast: false,
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
            promotional: false
        },
    };
    closeMessage() {
        this.setState({
            ...this.state,
            displayToast: false
        });
    }
    hexColor = () => {
        const { email, retype_email } = this.state.form;
        email.test(retype_email);
    };

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
        retype_email: {
            type: String,
            required: true,
            match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            message: "Emails does not match",
        },
        password: {
            type: String,
            required: true,
            message: "Password is required",
        },
        c_password: {
            type: String,
            required: true,
            message: "Password is required",
        },
        company: { type: String },
        tax_number: { type: String },
    });

    formHandler = () => {
        let { dispatch } = this.props
        let errors = this.formValidator.validate(this.state.form);

        if (errors.length > 0) {
            let tempError = {};
            errors.forEach((val) => {
                tempError[val.path] = val.message;
            });
            this.setState({ ...this.state, errors: tempError });
        }
        let objKey = Object.keys(this.state.fields);
        let remapping = objKey.map((val, index) => {

            if (this.state.fields[val] == true) {

                return val.replace("fields.", "")

            }
        }).filter(val => val != undefined)
        this.setState({ ...this.state, reduxSet: false, lock: true })
        dispatch(register({ ...this.state.form, product_owned: remapping.join(',') }))
    };

    handleChange = (key, value) => {
        // let errors = this.state.errors;
        let tempForm = this.state.form;
        tempForm[key] = value;

        this.setState({ ...this.state, form: tempForm });
    };

    onChange = (name, value) => {

        this.setState((state, props) => {
            const currentFields = state.fields;
            currentFields[name] = value;
            return { fields: currentFields };
        });

    };
    componentDidUpdate() {
        switch (this.props.status) {
            case "errors":
                if (this.props.errors) {

                    if (this.state.reduxSet != true) {

                        this.setState({
                            ...this.state,
                            lock: false,
                            reduxSet: true,
                            errors: this.props.errors,
                            variant: 'error',
                            errorMessage: this.props.errorMessage,
                            displayToast: true
                        })
                    }
                }
                break;
            case "success":
                console.log("Success");
                break;
            default:
                break;
        }
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
                    <h1 className="contact-heading">REGISTER TO YAMAHA SHOP</h1>
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
                    <title>Yamaha South Africa | Register</title>
                    <link
                        rel="canonical"
                        href="https://www.yamaha.co.za/register"
                    />
                    <meta name="description" content="Create a new account" />
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
                <div className="generic-container ">
                    {this.props.status === "success" ?
                        <Redirect to={{
                            pathname: '/success',
                            state: { head: 'Register Confirmation', body: "An Account Confirmation email has been sent." }
                        }} /> : <></>
                    }
                    <Toastr open={this.state.displayToast}
                        variant={this.state.variant}
                        horizontalPosition="right"
                        message={this.state.errorMessage}
                        onClose={() => { this.closeMessage() }}
                        duration={3000}
                    />
                    <div style={{ padding: "40px 0px", flexGrow: 1 }}>
                        <TopHeader />

                        {this.props.loading ?
                            <Grid container>
                                <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
                                    <CircularProgress size={50} color={"primary"} />
                                </Grid>
                            </Grid>
                            :
                            <RegisterForm
                                states={this.state}
                                onChangeHandler={this.handleChange}
                                onChange={this.onChange}
                                onFormSubmit={this.formHandler}
                                buttonName="register"
                                buttonName2=""
                                disableSubmit={this.state.lock}
                                props={this.props}
                            />
                        }

                    </div>
                </div>
                <Footer mainFooter />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        errorMessage: state.authReducer.message,
        errors: state.authReducer.error,
        loading: state.authReducer.loadingState,
        status: state.authReducer.status
    }
}
export default connect(mapStateToProps)(RegisterPage);
