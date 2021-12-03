import React from 'react';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Form, Button, Toastr } from "..";
import { Grid, CircularProgress } from "@material-ui/core";
import './forgot.css';
import { connect } from 'react-redux';
import { getPasswordForgot, nullStatus } from '../../Redux/Actions/forgotPassword';

class ForgotPasswordModal extends React.Component {
    // function ForgotPasswordModal({ isOpen, isClosed, handleClose }) {
    constructor(props) {
        super(props)
    }
    state = {
        email: "",
        loading: false,
        errors: {},
        message: null,
        variant: null,
        alert: false,
        reduxSet: false,
    }

    componentDidUpdate() {
        switch (this.props.status) {
            case "errors":
                if (this.state.reduxSet != true) {
                    this.setState({
                        ...this.state,
                        reduxSet: true,
                        errors: this.props.errors,
                        loading: false,
                        alert: true,
                        variant: "error",
                        message: this.props.message,
                    })
                    this.props.dispatch(nullStatus());
                }
                break;
            case "success":
                if (this.state.reduxSet != true) {
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
    };

    onFormSubmit = () => {
        let { dispatch } = this.props;
        const { email } = this.state;
        this.setState({ loading: true, reduxSet: false });
        dispatch(getPasswordForgot({ email: email }));
    }

    handleAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ alert: false });
    };


    render() {
        return (
            <Dialog
                open={Boolean(this.props.isOpen)}
                onClose={this.props.isClosed}
                className="dialog-box"
                aria-labelledby="draggable-dialog-title"
                disableBackdropClick={true}
            >
                <Toastr
                    horizontalPosition="right"
                    open={this.state.alert}
                    onClose={this.handleAlert}
                    duration={1000}
                    message={this.state.message}
                    variant={this.state.variant}>
                </Toastr>
                <DialogTitle>
                    <div>
                        <h3 className="forgot-heading login-title">
                            {this.props.status === "success" ? <>SUCCESS</> : <>RESET PASSWORD</>}
                        </h3>
                    </div>
                    <IconButton
                        aria-label="close"
                        style={{ position: "absolute", right: 0, top: 0 }}
                        onClick={this.props.isClosed}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                {this.state.loading ?
                    <Grid container className="forgot-modal-padding">
                        <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
                            <CircularProgress size={50} color={"primary"} />
                        </Grid>
                    </Grid> :
                    this.props.status ?
                        <>
                            <DialogContent>
                                <Typography variant="body2" component="p" style={{ fontFamily: 'rift', fontSize: 20, paddingLeft: 5 }}>
                                    A password reset email has been sent.
                                </Typography>
                            </DialogContent>
                            <DialogActions className="confirm-button2">
                                <Button
                                    title="CONFIRM"
                                    type="primary yamaha-btn-lg forgot-button-width"
                                    onClick={this.props.isClosed}
                                />
                            </DialogActions>
                        </> :
                        <>
                            <DialogContent>
                                <Form.FormInput
                                    className="contact-input"
                                    type="email"
                                    name="email"
                                    label="Email"
                                    onChange={this.onChangeHandler}
                                    value={this.state.email}
                                />
                            </DialogContent>

                            <DialogActions className="confirm-button2">
                                <Button
                                    title="RESET PASSWORD"
                                    type="primary yamaha-btn-lg forgot-button-width"
                                    onClick={this.onFormSubmit}
                                />
                            </DialogActions>
                        </>
                }

            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.forgotPasswordReducer.message,
        errors: state.forgotPasswordReducer.error,
        status: state.forgotPasswordReducer.status
    }
}

export default connect(mapStateToProps)(ForgotPasswordModal);
