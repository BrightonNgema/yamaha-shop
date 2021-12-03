import React, { Component } from 'react';
import { Dialog, Grid, CircularProgress, List, ListItem, Divider, ListItemText, ListSubheader, Table, TableHead, TableRow, TableCell, TableBody, Paper, } from "@material-ui/core";
import { NavBar, Footer, Accordion, Form, Button, ImageRow, Toastr } from "components";
import { isIE } from 'react-device-detect';
import { colors } from "theme";
import './index.css'
import { login, null_status } from "../../../Redux/Actions/auth";
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { regex } from "theme";
class LoginPage extends Component {
    state = {
        reduxSet: false,
        email: "",
        password: "",
        loading: false,
        message: null,
        variant: null,
        alert: false,
    }

    /**********************ADDITIONAL INFO**********************/

    componentDidMount() {

    }

    handleAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openAlert: false });
    };
    componentDidUpdate() {
        let { status, dispatch } = this.props;
        if (!this.state.reduxSet) {

            switch (status) {
                case "success":

                    this.setState({
                        ...this.state,

                        alert: false,
                        loading: false,
                        reduxSet: true,

                    })
                    this.props.history.replace("/")
                    break


                    break;
                case "error":
                    this.setState({
                        ...this.state,
                        reduxSet: true,
                        errors: this.props.errors,
                        loading: false,
                        alert: true,
                        variant: "error",
                        message: this.props.message
                    })
                    dispatch(null_status())
                    break;
            }
        }
    }


    formHandler() {

        const { email, password } = this.state;
        this.setState({ loading: true, reduxSet: false });
        this.props.dispatch(login({ email: email, password: password }))

    };


    handleChange(v) {



        this.setState({ ...this.state, accept_tcs: !this.state.accept_tcs })
    }
    onSubmit = (add) => {
        this.setState({ ...this.state, additionalInfo: add });

    }


    onChangeHandler(name, value) {
        this.setState({ [name]: value });
    };

    change(key, value) {
        this.setState({
            ...this.state,
            [key]: value
        })
    }



    render() {
        const emailvalid = regex.email.test(this.state.email);
        const passwordValid = this.state.password.length > 6;
        const inputValid = emailvalid && passwordValid;
        let loading = this.state.loading === false && inputValid;
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
        let buttonType = loading
            ? "primary yamaha-btn-lg"
            : "disabled yamaha-btn-lg";
        //console.log(this.state.loading)
        return (
            <div style={{ background: colors.light, overflow: "hidden" }}>

                <NavBar
                    topColor={isIE ? "#FFF" : "rgba(255,255,255,96%)"}
                    bottomColor={isIE ? "#FFF" : "rgba(255,255,255,90%)"}
                    search
                    warranty
                    menuColor="black"
                    menuDrawerInfo={footerMenu}
                    logoColor="black"
                />
                 <Toastr
                    horizontalPosition="right"
                    open={this.state.alert}
                    onClose={this.handleAlert}
                    message={this.state.message}
                    variant={this.state.variant}>
                </Toastr>
                <div className="generic-container">

                    {
                        this.state.loading ? <>
                            <Grid container style={{ padding: "70px 0px", flexGrow: 1 }}>
                                <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
                                    <CircularProgress size={50} color={"primary"} />
                                </Grid>
                            </Grid>
                        </> :

                            <div style={{ padding: "60px 0px", flexGrow: 1 }}>
                                <Grid item xs={12} sm={12}>
                                    <Grid container spacing={2}>
                                        <Grid item sm={4}>

                                        </Grid>
                                        <Grid item sm={4}>
                                            <div style={{marginBottom:"20px"}}>
                                                <h3 className="contact-heading login-title">
                                                    Login
                            </h3>
                                            </div>
                                        </Grid>
                                        <Grid item sm={4}>

                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item sm={4}>

                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Form.FormInput
                                                className="contact-input"
                                                type="email"
                                                name="email"
                                                label="Email"
                                                onChange={(k, v) => { this.onChangeHandler(k, v) }}
                                                value={this.state.email}
                                            />
                                        </Grid>
                                        <Grid item sm={4}>

                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2}>
                                        <Grid item sm={4}>

                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Form.FormInput
                                                className="contact-input"
                                                name="password"
                                                label="Password"
                                                type="password"
                                                onChange={(k, v) => { this.onChangeHandler(k, v) }}
                                                value={this.state.password}
                                            />
                                        </Grid>
                                        <Grid item sm={4}>

                                        </Grid>
                                    </Grid>



                                    <Grid container spacing={2} style={{ paddingTop: "20px" }}>
                                        <Grid item xs={12} sm={4}></Grid>
                                        <Grid item xs={12} md={4} >
                                            <Button
                                           
                                                title="Register"
                                                type="secondary yamaha-btn-lg mr-2"
                                                link="/register"
                                            />
                                            <Button

                                                title="Login"
                                                type={buttonType}
                                                onClick={() => { this.formHandler() }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}></Grid>
                                    </Grid>
                                </Grid>
                            </div>
                    }
                </div>
                <Footer fixed mainFooter />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.authReducer.errors,
        status: state.authReducer.status,
        message: state.authReducer.message
    }
}

export default connect(mapStateToProps)(withRouter(LoginPage));
