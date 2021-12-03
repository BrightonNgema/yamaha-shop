import React from 'react';
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
import { connect } from 'react-redux';
import { addVoucher, nullStatus } from '../../Redux/Actions/cart';
import './voucher.css';

class VoucherModal extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        voucher: "",
        loading: false,
        errors: {},
        message: null,
        variant: null,
        alert: false,
        reduxSet: false,
        isValidVoucher: true,
        canApplyVoucher: true,
        voucherApplied: false,
        understand: false,
        discount: {}
    }

    componentDidUpdate() {
        if (this.props.discount !== "" && this.props.discount !== "R 0.00" && this.props.discount !== undefined) {
            this.props.isClosed();
        }

        switch (this.props.status) {
            case "errors":
                this.setState({
                    ...this.state,
                    errors: this.props.errors,
                    loading: this.props.loading,
                    alert: true,
                    variant: "error",
                    message: this.props.message,
                })
                this.props.dispatch(nullStatus());
                break;
            case "success":
                this.setState({
                    ...this.state,
                    alert: false,
                    loading: this.props.loading,
                    reduxSet: true,
                    variant: null,
                    understand: false
                })
                this.props.dispatch(nullStatus());
                break;
            default:
                break;
        }
    }

    onChangeHandler = (name, value) => {
        this.setState({ [name]: value });
    };

    onFormSubmit = () => {
        this.props.dispatch(addVoucher(this.state.voucher));
        this.setState({ ...this.state, voucher: "", loading: true, understand: false });
    }

    handleAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ ...this.state, alert: false });
    };

    onUnderstood = () => {

        this.setState({ ...this.state, understand: true })
    }

    itemDiscountExists() {
        let discount = this.props.products.filter((product) => {
            return product.syspro_discount !== "0.00"
        })
        let noDiscount = this.props.products.filter((product) => {
            return product.syspro_discount === "0.00"
        })

        return { "discount": discount.length, "noDiscount": noDiscount.length }
    }

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
                    duration={3000}
                    message={this.state.message}
                    variant={this.state.variant}>
                </Toastr>
                <DialogTitle>
                    <div>
                        <h3 className="forgot-heading login-title">
                            VOUCHER
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

                {/* {this.state.loading ?
                    <Grid container className="forgot-modal-padding">
                        <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
                            <CircularProgress size={50} color={"primary"} />
                        </Grid>
                    </Grid>
                    :
                    this.state.canApplyVoucher ?
                        <>
                            <DialogContent>
                                <Form.FormInput
                                    className="contact-input"
                                    type="number"
                                    name="voucher"
                                    label="Voucher Code"
                                    onChange={this.onChangeHandler}
                                    value={this.state.voucher}
                                />
                                {this.state.variant === null ?
                                    <></>
                                    :
                                    <div className="invalid-voucher" >
                                        Invalid Voucher Code
                                </div>
                                }
                            </DialogContent>

                            <DialogActions >
                                <Button
                                    title="APPLY VOUCHER"
                                    type="primary yamaha-btn-lg voucher-width"
                                    onClick={this.onFormSubmit}
                                />
                            </DialogActions>
                        </>
                        :
                        <>
                            <DialogContent style={{ fontSize: 14, width: "15rem", marginLeft: 5 }}>
                                <div>You can't apply a voucher </div>
                                <div>to a promontional item. </div>
                            </DialogContent>
                            <DialogActions >
                                <Button
                                    title="I Understand"
                                    type="primary yamaha-btn-lg voucher-width"
                                    onClick={this.onFormSubmit}
                                />
                            </DialogActions>
                        </>
                } */}

                {
                    this.state.loading ?
                        <Grid container className="forgot-modal-padding">
                            <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
                                <CircularProgress size={50} color={"primary"} />
                            </Grid>
                        </Grid>
                        :


                        this.itemDiscountExists().discount >= 1 && this.itemDiscountExists().noDiscount >= 1 ?

                            <>
                                {
                                    !this.state.understand ?
                                        <>
                                            <DialogContent DialogContent style={{ fontSize: 14, width: "15rem", marginLeft: 5 }}>
                                                <div>You can't apply a voucher </div>
                                                <div>to a promontional item. </div>

                                            </DialogContent>
                                            <DialogActions >
                                                <Button
                                                    title="I Understand"
                                                    type="primary yamaha-btn-lg voucher-width"
                                                    onClick={this.onUnderstood}
                                                />
                                            </DialogActions>
                                        </>
                                        :
                                        <>
                                            <DialogContent>
                                                <Form.FormInput
                                                    className="contact-input"
                                                    type="text"
                                                    name="voucher"
                                                    label="Voucher Code"
                                                    onChange={this.onChangeHandler}
                                                    value={this.state.voucher}
                                                />
                                                {this.state.variant === null ?
                                                    <></>
                                                    :
                                                    <div className="invalid-voucher" >
                                                        Invalid Voucher Code
                                                        </div>
                                                }
                                            </DialogContent>

                                            <DialogActions >
                                                <Button
                                                    title="APPLY VOUCHER"
                                                    type="primary yamaha-btn-lg voucher-width"
                                                    onClick={this.onFormSubmit}
                                                />
                                            </DialogActions>
                                        </>
                                }

                            </>
                            : this.itemDiscountExists().discount >= 1 ?
                                <>
                                    <DialogContent style={{ fontSize: 14, width: "15rem", marginLeft: 5 }}>
                                        <div>You can't apply a voucher </div>
                                        <div>to a promontional item. </div>
                                    </DialogContent>
                                    <DialogActions >
                                        <Button
                                            title="I Understand"
                                            type="primary yamaha-btn-lg voucher-width"
                                            onClick={this.props.isClosed}
                                        />
                                    </DialogActions>
                                </>
                                :
                                <>
                                    <DialogContent>
                                        <Form.FormInput
                                            className="contact-input"
                                            type="text"
                                            name="voucher"
                                            label="Voucher Code"
                                            onChange={this.onChangeHandler}
                                            value={this.state.voucher}
                                        />
                                        {this.state.variant === null ?
                                            <></>
                                            :
                                            <div className="invalid-voucher" >
                                                Invalid Voucher Code
                                            </div>
                                        }
                                    </DialogContent>

                                    <DialogActions >
                                        <Button
                                            title="APPLY VOUCHER"
                                            type="primary yamaha-btn-lg voucher-width"
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
        message: state.cartReducer.message,
        errors: state.cartReducer.error,
        status: state.cartReducer.vstatus,
        vouchers: state.cartReducer.voucherApplied,
        loading: state.cartReducer.vloading,
        products: state.cartReducer.cart,
        discount: state.cartReducer.discount,
    }
}

export default connect(mapStateToProps)(VoucherModal);
