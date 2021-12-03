import React from "react";
import { Toastr } from '../index'
import Dialog from "@material-ui/core/Dialog";
import { AccountCircleRounded, Store } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Form, Button, ForgotPasswordModal } from "..";
import { Grid, CircularProgress } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { regex } from "theme";
import { styles } from "../Footer/styles";
import "../Footer/More/more.css";
import "./modal.css";
import { login, null_status } from "../../Redux/Actions/auth";
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { nullStatus } from "../../Redux/Actions/forgotPassword";

class LoginModal extends React.Component {
    constructor(props) {
    
        super(props)
    }

    /* Open modal hook taken from the 'more' button component */
    // const [anchorEl, setAnchorEl] = React.useState(false);
    state = {
        isOpen: false,
        email: "",
        password: "",
        loading: false,
        reduxSet: false,
        message: null,
        variant: null,
        alert: false,
        showDialog: false,
    };
    externalOpenModal() {
        this.setState({
            ...this.state,
            isOpen: true
        })
        this.props.resetExternal();
    }
    // onChangeHandler = (text, value) => {
    //     this.setState({ [text]: value }, () => {
    //         this.onSearch(this.state.search);
    //     });
    // };
    componentDidUpdate() {
        let { dispatch } = this.props

        switch (this.props.status) {
            case "error":
                if (this.state.reduxSet != true) {

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
                }
                break;
            case "success":
                if (this.state.reduxSet != true) {

                    this.setState({
                        ...this.state,
                        isOpen: false,
                        alert: false,
                        loading: false,
                        reduxSet: true,

                    })
         
                    if(this.props.history.location.pathname==='/success'){
                        this.props.history.replace("/")
                    }
                    dispatch(null_status())
                }
                break;
            default:
                break;
        }

    }

    /* modal close button styling */
    styling = (theme) => ({
        closeButton: {
            position: "absolute",
            right: theme.spacing(0),
            top: theme.spacing(0),
            color: theme.palette.grey[500],
        },
    });

    handleAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ alert: false });
    };

    DialogTitle = withStyles(this.styling)((props) => {
        const { children, classes, onClose } = props;
        return (
            <>
                <Toastr
                    horizontalPosition="right"
                    open={this.state.alert}
                    onClose={this.handleAlert}
                    message={this.state.message}
                    variant={this.state.variant}>
                </Toastr>
                <MuiDialogTitle>
                    <Typography className="contact-heading login-title" style={{ marginBottom: 0 }}>{children}</Typography>
                    {onClose ? (
                        <IconButton
                            aria-label="close"
                            className={classes.closeButton}
                            onClick={onClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </MuiDialogTitle>
            </>
        );
    });

    openForgotModal = () => {
        this.setState({ ...this.state, showDialog: true, isOpen: false });
    }
    closeForgotModal = () => {
        this.setState({ ...this.state, showDialog: false });
        this.props.dispatch(nullStatus());
    }

    render() {

        let { dispatch } = this.props
        //Validation info
        const emailvalid = regex.email.test(this.state.email);
        const passwordValid = this.state.password.length > 6;
        const inputValid = emailvalid && passwordValid;
        let loading = this.state.loading === false && inputValid;
        let buttonType = loading
            ? "primary yamaha-btn-lg"
            : "disabled yamaha-btn-lg";


        /* Event Handlers */
        const handleClick = (event) => {
            this.setState({ isOpen: event.currentTarget });
        };

        const handleClose = () => {
            this.setState({ isOpen: null });
        };

        const onChangeHandler = (name, value) => {
            this.setState({ [name]: value });
        };

        const formHandler = () => {

            const { email, password } = this.state;
            this.setState({ loading: true, reduxSet: false });
            dispatch(login({ email: email, password: password }))

        };


        /* The modal title which contains the close button */

        return (
            // Displays the Login button and user icon
            <div style={{ margin: "3px 5px auto", cursor: "pointer" }}>
                <span onClick={handleClick} style={{ marginTop: -3 }}>
                    <span className="icon-button phone">
                        <AccountCircleRounded
                            className="icon-phone"
                            style={{ fontSize: 14, marginTop: 2 }}
                        />
                    </span>
                    <span className={"login"} style={{ ...styles.defaultText }}>
                        Login
                    </span>
                </span>
                <ForgotPasswordModal
                    isOpen={this.state.showDialog}
                    address={this.state.dialogAddress}
                    isClosed={this.closeForgotModal}
                    handleClose={this.closeForgotModal}
                ></ForgotPasswordModal>
                {this.props.openExternal ?
                  
                    this.externalOpenModal()
                 : () => {

                }}
                {/* The Modal */}
                <Dialog
                    aria-labelledby="form-dialog-title"
                    open={Boolean(this.state.isOpen)}
                    onClose={handleClose}
                    className="dialog-box"
                    disableBackdropClick
                    disableEscapeKeyDown

                >
                    <this.DialogTitle onClose={handleClose}>
                        <h3 className="contact-heading login-title">
                            Login
                        </h3>
                    </this.DialogTitle>

                    {this.state.loading ? (
                        <>
                            <Grid container className="modal-padding">

                                <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
                                    <CircularProgress size={50} color={"primary"} />
                                </Grid>

                            </Grid>
                        </>
                    ) : (
                            <>
                                <DialogContent>
                                    {/* <div>
                                        <h3 className="contact-heading login-title">
                                            Login
                            </h3>
                                    </div> */}
                                    <Grid item xs={12} sm={12}>

                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <Form.FormInput
                                                    className="contact-input"
                                                    type="email"
                                                    name="email"
                                                    label="Email"
                                                    onChange={onChangeHandler}
                                                    value={this.state.email}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Form.FormInput
                                                    className="contact-input"
                                                    name="password"
                                                    label="Password"
                                                    type="password"
                                                    onChange={onChangeHandler}
                                                    value={this.state.password}
                                                />
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <span style={{ float: 'right', paddingTop: 30, marginRight: 10 }}>
                                            {/* TODO: Might have to change href*/}
                                            <a style={{ color: '#56585a', cursor: "pointer" }} onClick={this.openForgotModal}>Forgot Password?</a>
                                        </span>
                                    </Grid>


                                </DialogContent>

                                <DialogActions>

                                    <Button
                                        title="Register"
                                        type="secondary yamaha-btn-lg"
                                        link="/register"
                                    />
                                    <Button

                                        title="Login"
                                        type={buttonType}
                                        onClick={formHandler}
                                    />
                                </DialogActions>
                            </>
                        )}
                </Dialog>
            </div >
        );
    }
}
const mapStateToProps = (state) => {

    return {
        errors: state.authReducer.errors,
        status: state.authReducer.status,
        message: state.authReducer.message
    }
}
export default withRouter(connect(mapStateToProps)(LoginModal));
