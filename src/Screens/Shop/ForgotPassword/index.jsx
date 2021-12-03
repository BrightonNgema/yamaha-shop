import React, { Component } from "react";
import { NavBar, Footer, Button, Form as FC, } from "components";
import { colors } from "theme";
import { isIE } from "react-device-detect";
import { Grid, Paper, CircularProgress } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { getPasswordReset } from '../../../Redux/Actions/forgotPassword';
import { Toastr } from "../../../Components";
import { regex } from "../../../Theme";
import GenericSuccessPage from '../GenericSuccessPage';
import { Redirect } from "react-router-dom";

class ForgotPassword extends Component {
    state = {
        email: '',
        password: "",
        password_confirmation: "",
        loading: false,
        errors: {
            password: "",
            password_confirmation: ""
        },
        message: null,
        variant: null,
        alert: false,
        reduxSet: false,
    }

    componentDidUpdate() {
        switch (this.props.status) {
            case "errors":
                if (this.state.reduxSet === false) {
                    this.setState({
                        ...this.state,
                        reduxSet: true,
                        errors: this.props.errors,
                        loading: false,
                        alert: true,
                        variant: "error",
                        message: this.props.message
                    })
                }
                break;
            case "success":
                if (this.state.reduxSet === false) {

                    this.setState({
                        ...this.state,
                        alert: false,
                        loading: false,
                        reduxSet: true,
                    })
                }
                break;
            default:
                break;
        }
    }

    onChangeHandler = (name, value) => {

        this.setState({ [name]: value });
        switch (name) {
            case "password":
          
                return value.length < 8 ? this.setState(prevState => ({ errors: { ...prevState.errors, password: "Your password should be longer than 8 characters and contain at least 1 special character" } })) : value === this.state.password_confirmation ? this.setState(prevState => ({ errors: { ...prevState.errors, password: "", password_confirmation: "" } })) : this.setState(prevState => ({ errors: { ...prevState.errors, password: "", password_confirmation: "" } }));
                break;
            case "password_confirmation":
                return value !== this.state.password ? this.setState(prevState => ({ errors: { ...prevState.errors, password_confirmation: "Sorry your password does not match our records" } })) : this.setState(prevState => ({ errors: { ...prevState.errors, password_confirmation: "" } }));
                break;
            default:
                break
        }

    }


    onFormSubmit = () => {
        const token = this.props.children.match.params.token;
        const sEmail = this.props.children.history.location.search;
        let newEmail = sEmail.replace("?email=", "");
        let { dispatch } = this.props;
        const { email, password, password_confirmation } = this.state;
        this.setState({ loading: true, reduxSet: false });
        dispatch(getPasswordReset({ email: newEmail, password: password, password_confirmation: password_confirmation, token: token }));
    }

    SimpleCard = () => {
        const useStyles = makeStyles({
            card: {
                minWidth: 275,
            },
            bullet: {
                display: 'inline-block',
                margin: '0 2px',
                transform: 'scale(0.8)',
            },
            title: {
                fontSize: 14,
            },
        });
        const classes = useStyles();

        const passwordNotEmpty = this.state.password !== "" && this.state.password_confirm !== "";
        const passwordMatch = this.state.password === this.state.password_confirmation;
        const passwordErrors = this.state.errors.password === "" && this.state.errors.password_confirmation === "";
        const inputValid = passwordNotEmpty && passwordMatch && passwordErrors && this.state.loading === false;
        const buttonType = inputValid
            ? "primary yamaha-btn-lg"
            : "disabled";

        return (
            <>
                {
                    this.state.loading ? <>
                        <Grid container className="modal-padding">

                            <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
                                <CircularProgress size={50} color={"primary"} />
                            </Grid>

                        </Grid>
                    </> :
                        <Paper elevation={3} style={{ padding: 20, paddingBottom: 50 }} className={classes.card}>
                            <CardContent>
                                <Typography variant="h3" component="h2" style={{ fontFamily: 'rift', fontWeight: "bold" }}>
                                    PASSWORD RESET:
                    </Typography>
                                <Typography variant="body2" component="p" style={{ fontFamily: 'ubuntu', marginTop: -20, marginBottom: 20 }}>
                                    Please enter a new password.
                    </Typography>
                                <FC.FormInput
                                    name="password"
                                    label="Password"
                                    type='password'
                                    helperText={this.state.errors["password"]}
                                    onChange={this.onChangeHandler}
                                    value={this.state.password}
                                ></FC.FormInput>
                                <FC.FormInput
                                    name="password_confirmation"
                                    label="Confirm Password"
                                    type='password'
                                    helperText={this.state.errors["password_confirmation"]}
                                    onChange={this.onChangeHandler}
                                    value={this.state.password_confirmation}
                                ></FC.FormInput>
                            </CardContent>
                            <CardActions style={{ justifyContent: 'center' }}>
                                <Button
                                    type={buttonType}
                                    title="Confirm"
                                    onClick={this.onFormSubmit}
                                />
                            </CardActions>
                           
                        </Paper>
                }
            </>
        );
    }

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
                    showBreadcrumbs={false}
                />
                <div className="generic-container">
                    <Toastr
                        horizontalPosition="right"
                        open={this.state.alert}
                        message={this.state.message}
                        variant={this.state.variant}>
                    </Toastr>
                    <div style={{ padding: "40px 0px", flexGrow: 1 }}>
                        <Grid container style={{ justifyContent: 'center' }}>
                            <Grid item xs={12} sm={4}>
                                {this.props.status === 'success' ?
                                    <Redirect to={{
                                        pathname: '/success',
                                        state: { head: 'Success', body: "Thank you. Your password has been reset." }
                                    }} /> : <this.SimpleCard />}
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <Footer fixed mainFooter />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.forgotPasswordReducer.message,
        errors: state.forgotPasswordReducer.error,
        status: state.forgotPasswordReducer.status,

    }
}


export default connect(mapStateToProps)(ForgotPassword);