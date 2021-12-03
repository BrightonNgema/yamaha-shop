import React, { Component } from 'react';
import { Dialog, Grid, CircularProgress, List, ListItem, Divider, ListItemText, ListSubheader, Table, TableHead, TableRow, TableCell, TableBody, Paper, } from "@material-ui/core";
import { NavBar, Footer, Accordion, Form as FC, Button, ImageRow, Toastr } from "components";
import { isIE } from 'react-device-detect';
import { colors } from "theme";
import './index.css'
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import { DeliveryInfoPage, OrderSummary } from '../../index';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";

import { getOrderSummary, submitOrder } from '../../../Redux/Actions/orderProcess';
import { homeAudio } from '../AddtionalInfo/jsons/home_audio'
import GenQuestions from '../AddtionalInfo/jsons/exportedData.jsx'
import Axios from 'axios';

class OrderSummaryPage extends Component {
    state = {
        terms: false,
        headers: [
            { key: "item", value: "Item", img: true },
            { key: "size", value: "size" },
            { key: "color", value: "color" },
            { key: "quantity", value: "quantity" },
            { key: "price", value: " Price (Incl.vat)" },
        ],
        delivery: [

        ],
        deliveryFee: "0.00",
        total: "0.00",
        variant: null,
        openAlert: false,
        promotional: false,
        openDeliveryAddress: false,
        openAdditionalInformation: false,

        loading: true,
        /**********************DELIVERY INFO**********************/
        deliveryInfo: {
            user: {
                name: "Lionel",
                surname: "Flume",
                email: "",
                phone: "078 701 5501",
                business_tax: "",
            },
            form: {
                street_address: "",
                street_address_2: "",
                suburb: "",
                suburb_2: "",
                city: "",
                city_2: "",
                postal_code: "",
                postal_code_2: "",
                country_1: "",
                country_2: "",
            },
            form_2: [
                { province: "Gauteng", dealer: ["1", "2", "3"] },
                { province: "KZN", dealer: ["4", "5", "6"] },
                { province: "Eastern Cape", dealer: ["7", "8", "9"] },
            ],

            delivery_address: false,
            forDelivery: true,
            forCollection: false,
            pick_date: "2017-05-24T10:30",

            selected_store: "",
            selected_province: "Gauteng",
            setAddress: {},
            addresses: [
            ],
            availDate: [],
            availDateSet: null,
            selected_address: "",
            reduxSet: false,
            delivery_instructions: "",
            loading: false,
            openAlert: false,
            openedModal: false
        },

        /**********************ADDITIONAL INFO**********************/
        additionalInfo: {

        },
        accept_tcs: false,
        buttonType: 'disabled'
    }

    componentDidMount() {
        this.props.dispatch(getOrderSummary())
        this.setState({ ...this.state, additionalInfo: homeAudio.state })

    }

    handleAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openAlert: false });
    };
    componentDidUpdate() {
        let { orderSummary, message, cart,
            status,
            errors } = this.props;
        if (!this.state.reduxSet) {

            switch (status) {
                case "success":

                    let productsKey = Object.keys(orderSummary.cart)
                    let productCart = []
                    productsKey.forEach(val => {
                        productCart.push(orderSummary.cart[val])
                    })

                    let objectDel = JSON.parse(sessionStorage.getItem("deliveryInfo"));

                    if (sessionStorage.getItem("deliveryInfo") === null) {
                        this.setState({
                            ...this.state,
                            deliveryInfo: {
                                ...this.state.deliveryInfo,
                                user: orderSummary.user_details,
                                setAddress: orderSummary.user_addresses[0],
                                addresses: orderSummary.user_addresses
                            },
                            delivery: cart,
                            reduxSet: true,
                            loading: false,
                            total: orderSummary.formatted_grand_total,
                            deliveryFee: orderSummary.formatted_delivery_fee
                        })
                    } else {
                        objectDel.addresses = orderSummary.user_addresses
                        this.setState({
                            ...this.state,
                            deliveryInfo: objectDel,
                            delivery: cart,
                            reduxSet: true,
                            loading: false,
                            total: orderSummary.formatted_grand_total,
                            deliveryFee: orderSummary.formatted_delivery_fee
                        })
                        sessionStorage.removeItem("deliveryInfo");
                    }

                    break;
                case "failed":
                    this.setState({ ...this.state, message: message, variant: "error", loading: false, openAlert: true, reduxSet: true })
                    break;
                case "order-success":
                    document.getElementById("form_id").submit();
                    // Axios.post("https://secure.paygate.co.za/payweb3/process.trans",{})
                    // this.props.history.push({pathname:'/paygate'})
                    break;
                case "order-failed":
                    this.setState({ ...this.state, message: message, variant: "error", openAlert: true, reduxSet: true })
                    break;
            }
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

    deliveryInformationModal() {
        return (
            <Dialog open={this.state.openDeliveryAddress} fullScreen={true} scroll={'body'} fullWidth={true} className="max-width-modal"
                onClose={() => { this.onModalToggle("openDeliveryAddress") }}
            >
                <MuiDialogTitle disableTypography>
                    <IconButton style={{ float: "right" }} aria-label="Close" onClick={() => { this.onModalToggle("openDeliveryAddress") }}>
                        <CloseIcon />
                    </IconButton>
                </MuiDialogTitle>
                <DialogContent>
                    <DeliveryInfoPage state={this.state.deliveryInfo} onSubmitDelivery={this.onSubmitDelivery} goToAddress={this.goToAddress} collectionOnly={this.state.delivery.filter(i => i.shipment_method_id == 1).length > 0}></DeliveryInfoPage>
                </DialogContent>
            </Dialog>
        )
    }
    purchaseModal() {
        return (
            <Dialog open={this.state.openAdditionalInformation} fullScreen={true} scroll={'body'} fullWidth={true} className="max-width-modal"
                onClose={() => { this.onModalToggle("openAdditionalInformation") }}
            >
                <MuiDialogTitle style={{ float: "right" }} disableTypography>
                    <IconButton aria-label="Close" onClick={() => { this.onModalToggle("openAdditionalInformation") }}>
                        <CloseIcon />
                    </IconButton>
                </MuiDialogTitle>
                <DialogContent>
                    <GenQuestions data={homeAudio.questions} funct={(k, v) => { this.handleRadios(k, v) }} binding={this.state.additionalInfo} />
                    {this.addToEnd()}
                </DialogContent>
            </Dialog>
        )
    }
    addToEnd() {
        return (
            <Grid container style={{ paddingLeft: "2rem" }}>
                <Grid
                    item
                    md={12}
                    xs={12}
                    style={{ marginBottom: 10 }}
                >
                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                            <div className="form-labels">
                                Have you read and agreed to the terms and conditions
                            regarding our{" "}
                                <Link style={{ textDecorationLine: "none" }} to="/privacy policy" target="_blank" className="return-color">return policy</Link>

                            ?
                        </div>
                        </FormLabel>
                        <FormGroup style={{ marginTop: 10 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="default"
                                        checked={this.state.accept_tcs}
                                        onChange={(k, v) => { this.handleChange(v) }}
                                        value="accept"
                                    />
                                }
                                label={
                                    <Typography className="labels-color">
                                        I confirm that I have read the return
                                        policy.
                                </Typography>
                                }
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <div className="additional-info">
                        <span style={{}}>
                            *Additional 3rd party charges will apply
                        </span>
                        <Button
                            type={this.checkValidity() + " f-r"}
                            title="Pay Now"
                            onClick={() => this.payNow()}
                        />
                        {this.props.redir ? <>
                            <form id="form_id" action="https://secure.paygate.co.za/payweb3/process.trans" method="post" onSubmit={this.submitPayment()}>
                                <input type="hidden" name="PAY_REQUEST_ID" value={this.props.redir.paygate_request} />
                                <input type="hidden" name="CHECKSUM" value={this.props.redir.checksum} />
                            </form></> : <></>}

                    </div>
                </Grid>
            </Grid>
        );
    }
    submitPayment() {

    }
    onSubmitDelivery = (del) => {

        this.onModalToggle("openDeliveryAddress");

    }

    goToAddress = () => {
        sessionStorage.setItem("deliveryInfo", JSON.stringify(this.state.deliveryInfo));
        this.props.history.push("/account/delivery");
    }

    handleChange(v) {



        this.setState({ ...this.state, accept_tcs: !this.state.accept_tcs })
    }
    onSubmit = (add) => {
        this.setState({ ...this.state, additionalInfo: add });

    }
    checkValidity() {

        let keys = Object.keys(this.state.additionalInfo)
        let test = keys.map(val => {
            if (this.state.additionalInfo[val]) {
                return true
            }
            return false;
        })
        if (!test.includes(false)) {

            if (this.state.accept_tcs) {
                return "primary"
            } else {
                return "disabled"
            }

        }
        return "disabled"
    }
    onModalToggle(key) {

        if (key == 'openDeliveryAddress' && !this.state.openedModal && this.state[key] && this.state.deliveryInfo.availDateSet) {

            this.setState({ ...this.state, openedModal: true })
        }
        this.setState({
            ...this.state,
            [key]: !this.state[key]
        })

    }
    handleRadios(k, v) {
        let key = this.state.additionalInfo;
        key[k] = v
        this.setState({
            ...this.state,
            ...key
        })
    }
    bodyLayout() {
        return (
            <>
                <Grid container style={{ marginTop: "-10px" }} spacing={7} >
                    <Grid item xs={12} md={12}>
                        <h1 className="type-heading">
                            Order Summary
                   </h1>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        {this.checkoutSide()}
                    </Grid>

                    <Grid item md={8} xs={12} className="medium-layout">

                        {this.Items()}

                    </Grid>
                    <Grid item className="device-layout" xs={12}>
                        {this.itemGroupSm()}
                    </Grid>
                </Grid>
            </>
        )
    }


    checkValid() {
        let valid = []

    }
    checkoutSide() {
        let buttonType = this.state.terms && this.validateAddress()
            ? "primary margin-left-1"
            : "disabled margin-left-1";
        let collection = this.state.delivery.filter(i => i.shipment_method_id == 1).length > 0
        let options = [];
        if (collection) {
            options = [
                {
                    title: "Recipient",
                    subtitle: this.state.deliveryInfo.user.name + " " + this.state.deliveryInfo.user.surname + " " + this.state.deliveryInfo.user.phone,
                    link: true
                },
                {
                    title: "Delivery Address",
                    subtitle: this.state.deliveryInfo?.setAddress?.name,

                },
                {
                    title: "Delivery Instructions",
                    subtitle: this.state.deliveryInfo.delivery_instructions,

                },
                {
                    title: "Delivery Date",
                    type: this.state.deliveryInfo.availDateSet ? false : true
                },
            ]
        } else {
            options = [{
                link: true
            }, {
                title: "Recipient Name",
                subtitle: this.state.deliveryInfo.user.name + " " + this.state.deliveryInfo.user.surname,
            },
            {
                title: "Recipient Email",
                subtitle: this.state.deliveryInfo.user.email,
            },
            ]
        }



        return (<>
            <Grid container >
                <Grid item xs={12} md={12} className="checkout-side">

                    <List style={{ paddingBottom: 0 }}>
                        {options.map((val, index) => (

                            val.title === "Delivery Date" ?
                                <ListItem key={index} style={{ backgroundColor: "#d6d6d6" }}>
                                    <ListItemText className="font-change" primary={val.title}>
                                    </ListItemText>
                                    <ListSubheader>
                                        {val.type ? (
                                            <>
                                                <i><p className="p-tag-reset font-change color-text-black" style={{ fontSize: 17, textAlign: "left" }}>Please select a delivery address </p></i>
                                                <i><p className="p-tag-reset font-change color-text-black" style={{ fontSize: 17, textAlign: "left" }}>first to display available date</p></i>
                                            </>

                                        )
                                            : (<>

                                                <i><p className="p-tag-reset font-change color-text-black" style={{ fontSize: 25, textAlign: "left", letterSpacing: 2, color: "#009DD2", fontWeight: "bold" }}>
                                                    {this.state.deliveryInfo.availDateSet?.text}
                                                </p></i>
                                            </>)
                                        }
                                    </ListSubheader>

                                </ListItem>
                                :
                                val.link ?

                                    <ListItem key={index} style={{ marginBottom: 20, marginTop: 10 }}>
                                        {this.state.date_selected === false ?
                                            <Button title={collection ? this.state.openedModal ? "Change Address" : "Select a delivery address" : "Update Information"} onClick={() => {
                                                this.onModalToggle("openDeliveryAddress")
                                            }} type="primary" variant="outline">

                                            </Button>
                                            :
                                            <Button title={collection ? this.state.openedModal ? "Change Address" : "Select a delivery address" : "Update Information"} onClick={() => {
                                                this.onModalToggle("openDeliveryAddress")
                                            }} type="primary full-width-100" variant="outlined">

                                            </Button>
                                        }


                                    </ListItem>

                                    :

                                    <ListItem key={index} >
                                        <ListItemText className="font-change" primary={val.title} secondary={val.subtitle} >
                                        </ListItemText>
                                        <ListSubheader>
                                            {val.type ? (
                                                <>
                                                    <i><p className="p-tag-reset font-change color-text-black" style={{ fontSize: 25, textAlign: "left", letterSpacing: 2, color: "#009DD2", fontWeight: "bold" }}>{this.state.deliveryInfo.setAddress?.text}</p></i>
                                                </>

                                            )
                                                : (<>
                                                </>)
                                            }
                                        </ListSubheader>
                                    </ListItem>
                        ))

                        }
                    </List>

                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <div className="input-container">

                            <FC.Checkbox
                                name="promotional"
                                checked={this.state.promotional}
                                onChange={(k, v) => {
                                    this.change(k, v)
                                }}
                                label="I agree to receive future marketing communication from Yamaha South Africa including but not limited to promotional offers, events and news bulletins."
                            ></FC.Checkbox>
                        </div>
                        <div className="input-container">
                            <FC.Checkbox name="terms"
                                checked={this.state.terms}
                                label={<div>I Accept the <Link style={{ textDecorationLine: "none" }} to="/terms and conditions" target="_blank" className="color-text-black">Terms & Conditions</Link></div>}
                                onChange={(k, v) => { this.change(k, v) }}>
                            </FC.Checkbox><span className="color-text-black font-sm"></span>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={12}>

                    </Grid>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Button type={buttonType + ' full-width-100'} onClick={() => {
                        this.onModalToggle("openAdditionalInformation")
                    }} title="Proceed to Payment" ></Button>
                </Grid>
                <Grid item xs={12} md={4} >

                    <Button type="secondary full-width-100 mt-2" link="/finance" title="Apply for Finance"></Button>
                </Grid>
                <Grid item xs={12} md={4}>

                    <Button type="primary full-width-100 mt-2" link="/category/home_audio/amplifiers#av%20receivers" title="Continue Shopping"></Button>
                </Grid>

                <div style={{ marginTop: 30 }}>
                    <ImageRow isTrue={true} />
                </div>
            </Grid>
        </>)
    }
    change(key, value) {
        this.setState({
            ...this.state,
            [key]: value
        })
    }

    payNow() {

        let body = {
            address_id: this.state.deliveryInfo.setAddress?.id,
            name: this.state.deliveryInfo.user.name,
            surname: this.state.deliveryInfo.user.surname,
            phone: this.state.deliveryInfo.user.phone,
            email: this.state.deliveryInfo.user.email,
            company: this.state.deliveryInfo.user.company,
            tax_number: this.state.deliveryInfo.user.business_tax_no,
            delivery_instructions: this.state.deliveryInfo.delivery_instructions,
            delivery_date: this.state.deliveryInfo.availDateSet
        }
        let data = homeAudio.questions.map(val => {
            return {
                question: val.text,
                answer: this.state.additionalInfo[val.name],

            }
        });
        body.additional_information = { home_audio: data }

        this.props.dispatch(submitOrder(body))
        this.setState({ ...this.state, reduxSet: false })
    }
    validateAddress() {
        //console.log(this.state.delivery.filter(i => i.shipment_method_id == 1))
        if (this.state.delivery.filter(i => i.shipment_method_id == 1).length > 0) {

            if (
                this.state.deliveryInfo.setAddress?.id &&
                this.state.deliveryInfo.user.name != "" &&
                this.state.deliveryInfo.user.surname != "" &&
                this.state.deliveryInfo.user.phone != "" &&
                this.state.deliveryInfo.user.email != "" &&

                this.state.deliveryInfo.availDateSet
            ) {
                return true
            }
            return false
        } else {
            return true
        }
    }
    Items = () => {

        let dRow = 0;
        let cRow = 0;

        this.state.delivery.forEach((item) => {

            if (item.shipment_method_id === 1) dRow++;
            if (item.shipment_method_id === 2) cRow++;
        })

        return (
            <>
                <Paper style={{ width: "100%", overflowX: "auto" }}>
                    <Table style={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>ITEMS</TableCell>
                                <TableCell align="center">SIZE</TableCell>
                                <TableCell align="center">Collection Point</TableCell>
                                <TableCell align="center">COLOR</TableCell>
                                <TableCell align="center">QUANTITY</TableCell>
                                <TableCell align="right">PRICE (INCL. VAT)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                cRow !== 0 ? <TableRow className="row-order-table">
                                    <TableCell className="row-reheight" colSpan={6}>
                                        For Collection
                            </TableCell>
                                </TableRow> : <></>
                            }
                            {this.state.delivery.map((item, i) => (

                                <TableRow key={`row-${i}`}>
                                    {item.shipment_method_id === 2 ? <>
                                        <TableCell component="th" scope="row">
                                            <Grid container>
                                                <Grid item xs={3} md={3}><img
                                                    src={item.syspro_image_1}
                                                    className="icon-img"
                                                    alt="img"
                                                    style={{ width: "50px", height: "50px", marginRight: 10 }}
                                                /></Grid>
                                                <Grid item xs={9} md={9} style={{ paddingTop: 20 }}>
                                                    {item.prod_code}
                                                    {
                                                        item.syspro_discount !== "0.00" ?
                                                            <span style={{ marginLeft: 5, padding: 5, fontSize: 12, fontFamily: "ubuntu", color: "white", backgroundColor: "#009DD2", display: "inline-block", lineHeight: "normal", verticalAlign: "middle" }}>PROMOTION</span>
                                                            :
                                                            <></>
                                                    }
                                                </Grid>

                                            </Grid>
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.syspro_size_1 ? item.syspro_size_1 : '-'}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.collections?.text}
                                        </TableCell>

                                        <TableCell align="center">
                                            {item.syspro_colour}
                                        </TableCell>
                                        <TableCell align="center">
                                            <span>{item.product_quantity}</span>

                                        </TableCell>
                                        <TableCell align="right">
                                            {item.formatted_product_total}
                                        </TableCell>
                                    </> : <></>}

                                </TableRow>
                            ))}
                            {
                                dRow !== 0 ? <TableRow className="row-order-table">
                                    <TableCell className="row-reheight" colSpan={6}>
                                        For Delivery
                            </TableCell>
                                </TableRow> : <></>
                            }
                            {this.state.delivery.map((item, i) => (

                                <TableRow key={`row-${i}`}>
                                    {item.shipment_method_id === 1 ? <><TableCell component="th" scope="row">
                                        <Grid container xs={12} md={12}>
                                            <Grid item xs={3} md={3}><img
                                                src={item.syspro_image_1}
                                                className="icon-img"
                                                alt="img"
                                                style={{ width: "50px", height: "50px", marginRight: 10 }}
                                            /></Grid>
                                            <Grid item xs={9} md={9} style={{ paddingTop: 20, paddingLeft: 10 }}>
                                                {item.prod_code}
                                                {
                                                    item.syspro_discount !== "0.00" ?
                                                        <span style={{ marginLeft: 5, padding: 5, fontSize: 12, fontFamily: "ubuntu", color: "white", backgroundColor: "#009DD2", display: "inline-block", lineHeight: "normal", verticalAlign: "middle" }}>PROMOTION</span>
                                                        :
                                                        <></>
                                                }
                                            </Grid>

                                        </Grid>
                                    </TableCell>
                                        <TableCell align="center">
                                            {item.syspro_size_1 ? item.syspro_size_1 : '-'}
                                        </TableCell>
                                        <TableCell align="center">
                                            -
                                    </TableCell>
                                        <TableCell align="center">
                                            {item.syspro_colour}
                                        </TableCell>
                                        <TableCell align="center">
                                            <span>{item.product_quantity}</span>
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.formatted_product_total}
                                        </TableCell>
                                    </> : <></>}

                                </TableRow>
                            ))}
                            <TableRow className="total-row">
                                <TableCell colSpan={6}>
                                    <strong style={{ color: "black", fontWeight: "bold" }}>
                                        DELIVERY FEE
                                </strong>
                                    <span style={{ float: "right" }}>
                                        {this.state.deliveryFee}
                                    </span>
                                </TableCell>
                            </TableRow>
                            <TableRow className="total-row">
                                <TableCell colSpan={6}>
                                    <strong className="color-text-yamaha">
                                        TOTAL
                                    <span style={{ float: "right" }}>
                                            {this.props.orderSummary.cart?.voucher_discount !== "R 0.00" ?
                                                <>

                                                    <div style={{ fontSize: 12, textAlign: "right" }}>- {this.props.orderSummary.cart?.voucher_discount}</div>
                                                </>
                                                :
                                                <></>}
                                            {this.state.total}
                                        </span>
                                    </strong>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </>
        );
    };
    itemGroupSm = () => {
        let dRow = 0;
        let cRow = 0;

        this.state.delivery.forEach((item) => {

            if (item.shipment_method_id === 1) dRow++;
            if (item.shipment_method_id === 2) cRow++;
        })

        return (
            <>
                <>
                    {
                        cRow !== 0 ?
                            <Grid container className="row-order-table">
                                <Grid item xs={12} className="row-reheight" colSpan={8} style={{ paddingTop: "0.8rem" }}>
                                    For Collection
                            </Grid>
                            </Grid> : <></>
                    }
                </>
                {this.state.delivery.map((item, i) => (
                    <>
                        {item.shipment_method_id === 2 ? (
                            <>
                                {this.ItemSM(item, i)}
                            </>
                        ) : (<></>)}
                    </>)
                )}
                {
                    dRow !== 0 ? <Grid container className="row-order-table">
                        <Grid tem xs={12} className="row-reheight" colSpan={8} style={{ paddingTop: "0.8rem" }}>
                            For Delivery
                            </Grid>
                    </Grid> : <></>
                }
                {this.state.delivery.map((item, i) => (
                    <>
                        {
                            item.shipment_method_id === 1 ? (<Grid container>
                                <Grid item xs={12}>

                                    {this.ItemSM(item, i)}
                                </Grid>
                            </Grid>) : (<></>)
                        }
                    </>
                ))
                }
                <Grid container style={{ color: "black" }}>
                    <Grid item xs={6} >
                        <strong >
                            Delivery Fee
                    </strong>
                    </Grid>
                    <Grid item xs={6}>

                        <span style={{ float: "right" }}>
                            {this.state.deliveryFee}
                        </span>


                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6} >
                        <strong className="color-text-yamaha">
                            TOTAL
                    </strong>
                    </Grid>
                    <Grid item xs={6}>
                        <strong>

                            <span style={{ float: "right", color: "red" }}>
                                {this.state.total}
                            </span>
                        </strong>


                    </Grid>
                </Grid>


            </>
        )
    }
    ItemSM = (item, i) => {


        return (<>
            <Grid container style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
                <Grid item xs={5} sm={5}>
                    <Grid container>

                        <img
                            src={item.syspro_image_1}
                            className="icon-img"
                            alt="img"
                            style={{ width: "100px", height: "60px", }}
                        />
                    </Grid>
                    <Grid container style={{ color: "black" }}>
                        <Grid item xs={12} style={{ textAlign: "center" }}>

                            {item.product_quantity}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={7} sm={7} style={{ color: "black" }}>
                    <p>{item.prod_code}</p>
                    <p>{item.formatted_product_total}</p>
                    <p>
                        {item.syspro_size_1 ? item.syspro_size_1 : "-"}
                    </p>
                    <p>
                        {item.collections?.text}
                    </p>
                    <p>{item.syspro_colour}</p>
                </Grid>
            </Grid>
            <hr />
            <br />
        </>
        )
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
        //console.log(this.state.loading)
        return (
            <div style={{ background: colors.light, overflow: "hidden" }}>
                {this.deliveryInformationModal()}
                {this.purchaseModal()}
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
                    open={this.state.openAlert}
                    onClose={() => { this.handleAlert() }}
                    message={this.state.message}
                    variant={this.state.variant}>
                </Toastr>
                <div className="generic-container">

                    {
                        this.state.loading ? <>
                            <Grid container style={{ padding: "40px 0px", flexGrow: 1 }}>
                                <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
                                    <CircularProgress size={50} color={"primary"} />
                                </Grid>
                            </Grid>
                        </> :

                            <div style={{ padding: "40px 0px", flexGrow: 1 }}>
                                {this.bodyLayout()}
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
        orderSummary: state.orderProcessReducer.orderSummary,
        cart: state.orderProcessReducer.cart,
        redir: state.orderProcessReducer.redir,
        // user: state.userReducer.user,
        // addresses: state.addressReducer.addresses,
        message: state.orderProcessReducer.message,
        status: state.orderProcessReducer.status,
        errors: state.orderProcessReducer.error,
    }
}

export default connect(mapStateToProps)(withRouter(OrderSummaryPage));
