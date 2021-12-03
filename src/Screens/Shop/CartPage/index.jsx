import React, { Component } from "react";
import { NavBar, Footer, Button, Accordion, NoDataFound, Toastr, Alerts, VoucherModal, TermsAccordian } from "components";
import { colors } from "theme";
import { isIE } from "react-device-detect";
import { animateScroll } from "react-scroll";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@material-ui/icons/RemoveCircleOutlineRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { CircularProgress, } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";


import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
} from "@material-ui/core";
import "./cart.css";
import { getCartDetails, addProductsToCart, deleteProduct, removeVoucher, deleteCart, nullStatus } from '../../../Redux/Actions/cart'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';



export class CartPage extends Component {
    state = {
        total: 0,
        formattedData: "",
        prodFromCart: [],
        data: [

        ],
        openAlert: false,
        reduxSet: false,
        openVoucherModal: false,
        productHasDiscount: false,
        productHasNoDiscount: false,
        discounts: { "discount": 1, "noDiscount": 1 },
        externalLogin: false
    };
    componentDidUpdate() {

        let { status, prodFromCart, total, formattedData, dispatch, message } = this.props;
        if (!this.state.reduxSet)
            switch (status) {
                case "success":

                    let items = this.itemDiscountExists(this.props.prodFromCart);
                    this.setState({
                        reduxSet: true,
                        prodFromCart: prodFromCart,
                        total: total,
                        formattedData: formattedData,
                        discounts: items
                    })
                    dispatch(nullStatus());
                    break;
                case "failed":
                    this.setState({
                        ...this.state,
                        message: message,
                        reduxSet: true,
                        variant: "error",
                        openAlert: true

                    })
                    break;
                case "failed_delete":
                    this.setState({
                        ...this.state,
                        message: message,
                        reduxSet: true,
                        variant: "error",
                        openAlert: true

                    })
                    break;
            }

    }

    handleAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openAlert: false });
    };
    processPrice(quantity, price) {

        return parseInt(quantity) * parseFloat(price)
    }

    processPriceDiscount(item, discount) {

        return item - item * discount;
    }

    componentDidMount() {

        animateScroll.scrollToTop();
        let { dispatch } = this.props;
        dispatch(getCartDetails())


    }

    useStyles = makeStyles((theme) => ({
        root: {
            width: "100%",
            marginTop: theme.spacing(3),
            overflowX: "auto",
        },
        table: {
            minWidth: 650,
        },
        iconRoot: {
            color: theme.palette.text.primary,
        },
        icon: {
            fontSize: 17,
        },
    }));

    handleDeleteRow(i) {

        let rows = [...this.state.prodFromCart];
        let temp = rows.filter((value, index) => index !== i)


        if (temp.length == 0) {

            this.props.dispatch(deleteCart());
        } else {
            // this.syncCache(temp[i])
            this.deleteFromCart(rows[i])

        }
        this.setState({ ...this.state, prodFromCart: temp })
    }


    calculate() {
        let total = 0;
        this.state.prodFromCart.forEach((product) => {
            product.syspro_discount !== "0.00" ?
                total += this.processPriceDiscount(this.processPrice(product.product_quantity, product.syspro_selling_price), product.syspro_discount)
                :
                total += this.processPrice(product.product_quantity, product.syspro_selling_price)
        })
        return total;
    }

    calculateNoDiscount() {
        let total = 0;
        this.state.prodFromCart.forEach((product) => {
            if (product.syspro_discount === "0.00") {
                total += this.processPrice(product.product_quantity, product.syspro_selling_price)
            }
        })
        return this.state.formattedData;
    }


    addQuantity(i) {

        let rows = this.state.prodFromCart;
        rows[i].product_quantity++;
        this.syncCache(rows[i])
        this.setState({ ...this.state, prodFromCart: rows, reduxSet: false })


    }

    deleteFromCart(row) {
        let { dispatch } = this.props
        let body = {
            product_id: row.id
        }
        dispatch(deleteProduct(body))
    }
    minusQuantity(i) {

        let rows = this.state.prodFromCart;
        if (rows[i].product_quantity - 1 > 0) {
            rows[i].product_quantity--;
            this.syncCache(rows[i]);
            this.setState({ ...this.state, prodFromCart: rows, reduxSet: false })
        }

    }
    syncCache(data) {

        let { dispatch } = this.props;

        let body = {};

        if (data.shipment_method_id === 1) {
            body = {
                product_id: data.id,
                product_quantity: data.product_quantity,
                shipment_method_id: data.shipment_method_id,
            }
        } else {
            body = {
                product_id: data.id,
                product_quantity: data.product_quantity,
                shipment_method_id: data.shipment_method_id,
                dealer_id: data.collections.id,
            }
        }


        dispatch(addProductsToCart(body, true));
    }
    Items = () => {

        const classes = this.useStyles();
        let dRow = 0;
        let cRow = 0;

        this.state.prodFromCart.forEach((item) => {

            if (item.shipment_method_id === 1) dRow++;
            if (item.shipment_method_id === 2) cRow++;
        })

        return (
            <Grid container>
                <Grid md={12} className="medium-layout">
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ITEMS</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell align="center">SIZE</TableCell>
                                    <TableCell align="center">Collection point</TableCell>
                                    <TableCell align="center">COLOR</TableCell>
                                    <TableCell align="center">QUANTITY</TableCell>
                                    <TableCell align="right">PRICE (INCL. VAT)</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>


                            </TableHead>

                            <TableBody>
                                {
                                    cRow !== 0 ? <TableRow className="row-order-table">
                                        <TableCell className="row-reheight" colSpan={8}>
                                            For Collection
                            </TableCell>
                                    </TableRow> : <></>
                                }
                                {this.state.prodFromCart.map((item, i) => (

                                    <TableRow key={`row-${i}`}>
                                        {item.shipment_method_id === 2 ? <>
                                            <TableCell component="th" scope="row" colSpan={2}>
                                                <Grid container >
                                                    <Grid item xs={3} md={3}><img
                                                        src={item.syspro_image_1}
                                                        className="icon-img"
                                                        alt="img"
                                                        style={{ width: "80px", height: "60px", marginRight: 10 }}
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
                                            <TableCell align="center" colSpan={1}>
                                                {item.syspro_size_1 ? item.syspro_size_1 : "-"}
                                            </TableCell>
                                            <TableCell align="center" colSpan={1}>
                                                {item.collections?.text}
                                            </TableCell>
                                            <TableCell align="center" colSpan={1}>
                                                {item.syspro_colour}

                                            </TableCell>
                                            <TableCell align="center" colSpan={1}>
                                                <span style={{ fontSize: 20 }}>{item.product_quantity}</span>
                                                <span className="icon-button more">
                                                    <AddCircleOutlineRoundedIcon
                                                        className={classes.icon}
                                                        onClick={() => this.addQuantity(i)}
                                                    />
                                                </span>
                                                <span className="icon-button more">
                                                    <RemoveCircleOutlineRoundedIcon
                                                        className={classes.icon}
                                                        onClick={() => this.minusQuantity(i)}
                                                    />
                                                </span>
                                            </TableCell>
                                            <TableCell align="right" colSpan={1}>
                                                {item.formatted_product_total}
                                            </TableCell>
                                            <TableCell align="right" colSpan={1}>
                                                <CloseRoundedIcon
                                                    action="primary"
                                                    style={{ cursor: "pointer", backgroundColor: '#E5E5E5', borderRadius: 20, }}
                                                    onClick={() =>
                                                        this.handleDeleteRow(i)
                                                    }
                                                />
                                            </TableCell></> : <></>}

                                    </TableRow>
                                ))}
                                {
                                    dRow !== 0 ? <TableRow className="row-order-table">
                                        <TableCell className="row-reheight" colSpan={8}>
                                            For Delivery
                            </TableCell>
                                    </TableRow> : <></>
                                }
                                {this.state.prodFromCart.map((item, i) => (

                                    <TableRow key={`row-${i}`}>
                                        {item.shipment_method_id === 1 ? <>
                                            <TableCell component="th" scope="row" colSpan={2}>
                                                <Grid container xs={12} md={12}>
                                                    <Grid item xs={3} md={3}>
                                                        <img
                                                            src={item.syspro_image_1}
                                                            className="icon-img"
                                                            alt="img"
                                                            style={{ width: "80px", height: "60px", marginRight: 10 }}
                                                        />
                                                    </Grid>
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
                                            <TableCell align="center" colSpan={1}>
                                                {item.syspro_size_1 ? item.syspro_size_1 : "-"}
                                            </TableCell>
                                            <TableCell align="center" colSpan={1}>
                                                -
                                    </TableCell>
                                            <TableCell align="center" colSpan={1}>
                                                {item.syspro_colour}
                                            </TableCell>
                                            <TableCell align="center" colSpan={1}>
                                                <span style={{ display: "inline-block", verticalAlign: "middle" }}>
                                                    <span style={{ fontSize: 20 }}>{item.product_quantity}</span>
                                                    <span className="icon-button more">
                                                        <AddCircleOutlineRoundedIcon
                                                            className={classes.icon}
                                                            onClick={() => this.addQuantity(i)}
                                                        />
                                                    </span>
                                                    <span className="icon-button more">
                                                        <RemoveCircleOutlineRoundedIcon
                                                            className={classes.icon}
                                                            onClick={() => this.minusQuantity(i)}
                                                        />
                                                    </span>
                                                </span>
                                            </TableCell>
                                            <TableCell align="right" colSpan={1}>
                                                {item.formatted_product_total}
                                            </TableCell>
                                            <TableCell align="right" colSpan={1}>
                                                <CloseRoundedIcon
                                                    action="primary"
                                                    style={{ cursor: "pointer", backgroundColor: '#E5E5E5', borderRadius: 20, }}
                                                    onClick={() =>
                                                        this.handleDeleteRow(i)
                                                    }
                                                />
                                            </TableCell></> : <></>}

                                    </TableRow>
                                ))}
                                <TableRow className="total-row">
                                    <TableCell colSpan={4}>
                                        <div>
                                            {
                                                this.props.isLoggedIn ?
                                                    this.props.discount !== "" && this.props.discount !== "R 0.00" && this.props.discount !== undefined ?
                                                        <>

                                                            <span style={{ display: "inline-block" }}>
                                                                <CloseRoundedIcon
                                                                    action="primary"
                                                                    style={{ cursor: "pointer", backgroundColor: '#E5E5E5', borderRadius: 20, fontSize: 11 }}
                                                                    onClick={
                                                                        () => this.props.dispatch(removeVoucher())
                                                                    }
                                                                /> <strong style={{ fontSize: 12 }}>{this.props.discountPercentage}% discount applied</strong></span>
                                                        </>
                                                        :
                                                        <a style={{ textDecoration: "underline", cursor: "pointer", fontSize: 12 }} onClick={this.handleClickOpen}> Add Voucher </a>
                                                    : <></>
                                            }
                                        </div>
                                        <strong className="color-text-yamaha">
                                            Total
                                </strong>
                                    </TableCell>
                                    <TableCell align="right" colSpan={3}>
                                        <div>
                                            {
                                                this.props.discount !== "" && this.props.discount !== "R 0.00" && this.props.discount !== undefined ?
                                                    <>

                                                        <span style={{ fontSize: 12 }}>- {this.props.discount}</span>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                        </div>
                                        <strong className="color-text-yamaha">
                                            {
                                                <>
                                                    <span style={{ fontSize: 15 }}>
                                                        {this.props.formattedData}
                                                    </span>
                                                </>
                                            }
                                        </strong>
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
                <Grid item xs={12} className="device-layout">
                    {this.itemGroupSm()}
                </Grid>
            </Grid>

        );
    };

    BottomCheckoutButton = () => {

        return (
            <div
                className="heading-main"
                style={{ paddingTop: 30, flexGrow: 1 }}
            >
                <Grid container style={{ position: "relative" }}>
                    <Grid item xs={12} sm={8} md={this.props.isLoggedIn ? 9 : 8}>

                    </Grid>

                    <Grid item xs={12} sm={2} md={2}>


                        <Button
                            title="CONTINUE SHOPPING"
                            type={'primary yamaha-btn-md float-right-btn full-width-100'}
                            link={`/category/home_audio/amplifiers#av%20receivers`}
                        />

                    </Grid>
                    <Grid item xs={12} sm={2} md={this.props.isLoggedIn ? 1 : 2}>
                        {
                            this.props.isLoggedIn ? (<Button
                                title="CHECKOUT"
                                type={this.props.isLoggedIn ? "primary yamaha-btn-md float-right-btn full-width-100" : " disabled primary yamaha-btn-md"}
                                onClick={this.checkout}
                            />) : (
                                    <>
                                        <div style={{ float: "right", marginRight: 10 }}>
                                            <Alerts header="Not Logged In"
                                                additional={<Button title="Login" type="primary  full-width-100" onClick={() => {

                                                    this.resetExternal();
                                                }}></Button>}
                                                paragraph1="Please login to checkout" />

                                        </div>

                                    </>
                                )
                        }
                    </Grid>

                </Grid>
            </div>
        );
    };

    checkout = () => {
        // TODO Sync with redis cache 
        if (this.props.isLoggedIn) {
            let { dispatch } = this.props;
            // dispatch(addProductsToCart(this.state.prodFromCart))
            this.props.history.push("/cart/order-summary")
        }
    }

    onCloseModals = () => {
        this.setState({
            ...this.state,
            openVoucherModal: false
        })
    }

    handleClickOpen = () => {
        this.setState({
            ...this.state,
            openVoucherModal: true
        })
    }
    itemGroupSm = () => {
        let dRow = 0;
        let cRow = 0;

        this.state.prodFromCart.forEach((item) => {

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
                {this.state.prodFromCart.map((item, i) => (
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
                {this.state.prodFromCart.map((item, i) => (
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
                <Grid container>
                    <Grid item xs={6}>
                        <div>
                            {
                                this.props.isLoggedIn ?
                                    this.props.discount !== "" && this.props.discount !== "R 0.00" && this.props.discount !== undefined ?
                                        <>

                                            <span style={{ display: "inline-block" }}>
                                                <CloseRoundedIcon
                                                    action="primary"
                                                    style={{ cursor: "pointer", backgroundColor: '#E5E5E5', borderRadius: 20, fontSize: 11 }}
                                                    onClick={
                                                        () => this.props.dispatch(removeVoucher())
                                                    }
                                                /> <strong style={{ fontSize: 12, color: "black" }}>{this.props.discountPercentage}% discount applied</strong></span>
                                        </>
                                        :
                                        <a style={{ textDecoration: "underline", cursor: "pointer", fontSize: 12 }} onClick={this.handleClickOpen}> Add Voucher </a>
                                    : <></>
                            }
                        </div>
                        <strong className="color-text-yamaha">
                            Total
                                </strong>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            {
                                <div>
                                    {
                                        this.props.discount !== "" && this.props.discount !== "R 0.00" && this.props.discount !== undefined ?
                                            <>

                                                <span style={{ fontSize: 12, color: "black" }}>- {this.props.discount}</span>
                                            </>
                                            :
                                            <></>
                                    }
                                </div>
                            }
                        </div>
                        <strong className="color-text-yamaha">
                            {

                                <>
                                    <span style={{ fontSize: 15 }}>
                                        {this.props.formattedData}
                                    </span>
                                </>
                            }
                        </strong>
                    </Grid>
                </Grid>


            </>
        )
    }
    ItemSM = (item, i) => {
        const classes = this.useStyles();
        return (<>
            <Grid container>
                <Grid item xs={5} sm={5}>

                    <img
                        src={item.syspro_image_1}
                        className="icon-img"
                        alt="img"
                        style={{ width: "100px", height: "60px", marginRight: 10 }}
                    />
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

            <Grid container style={{ height: "2.5rem", border: "1px solid grey" }}>

                <Grid item xs={6} style={{ textAlign: "center", BorderRight: "1px solid grey", padding: "0.4rem" }} className="br">

                    <span style={{ fontSize: 20, color: "black" }}>{item.product_quantity}</span>
                    <span className="icon-button more">
                        <AddCircleOutlineRoundedIcon
                            className={classes.icon}
                            style={{ color: "black" }}
                            onClick={() => this.addQuantity(i)}
                        />
                    </span>
                    <span className="icon-button more" >
                        <RemoveCircleOutlineRoundedIcon
                            style={{ color: "black" }}
                            className={classes.icon}
                            onClick={() => this.minusQuantity(i)}
                        />
                    </span>
                </Grid>
                <Grid item xs={6} style={{ textAlign: "center", padding: "0.4rem" }}>
                    <CloseRoundedIcon
                        action="primary"
                        style={{ cursor: "pointer", backgroundColor: '#E5E5E5', borderRadius: 20, }}
                        onClick={() =>
                            this.handleDeleteRow(i)
                        }
                    />
                </Grid>
            </Grid>
            <br />
        </>
        )
    }
    TopHeader = () => {

        return (
            <div
                className="heading-main"
                style={{ paddingTop: 30, flexGrow: 1 }}
            >
                <Grid container style={{ position: "relative" }}>
                    <Grid item xs={12} md={7} sm={7}>
                        <h1 className="contact-heading">Your Cart</h1>
                    </Grid>
                    {
                        this.props.isLoggedIn ? (<></>) : (
                            <>
                                {/* TODO Add-badge message "Need to be logged in to be able to checkout"  */}
                            </>

                        )
                    }
                    <Grid item xs={12} md={5} sm={5} className="mt-4">
                        <Grid container>
                            <Grid item md={ this.props.isLoggedIn ?(this.props.voucher ? 9 : 6):12} xs={12} style={{ marginTop: "1rem" }}>
                                <Button
                                    title="LEARN ABOUT YAMAHA FINANCE"
                                    type="secondary yamaha-btn-md float-right-btn full-width-100"
                                    link="/finance"
                                />
                            </Grid>
                            {
                                this.props.isLoggedIn ? (
                                    <>
                                        {this.props.voucher ? <></> :
                                            <>
                                                <Grid item xs={12} md={3} style={{ marginTop: "1rem" }}>
                                                    <Button
                                                        title="ADD VOUCHER"
                                                        type={'primary yamaha-btn-md float-right-btn full-width-100'}
                                                        onClick={this.handleClickOpen}
                                                    />
                                                </Grid>

                                            </>
                                        }

                                        <Grid item xs={12} md={3} style={{ marginTop: "1rem" }}>
                                            <Button
                                                title="CHECKOUT"
                                                type={'primary yamaha-btn-md float-right-btn full-width-100'}
                                                // type={this.props.isLoggedIn ? 'primary yamaha-btn-md float-right-btn ' : ' disabled primary yamaha-btn-md float-right-btn'}
                                                onClick={this.checkout}
                                            />
                                        </Grid>




                                    </>
                                ) : (<></>)
                            }
                        </Grid>

                    </Grid>
                </Grid>
            </div>
        );
    };

    /* @TODO: Update accordian information */
    Accordians = () => {

        return (
            <div>
                <hr style={{ margin: 0 }} />
                <Accordion
                    heading="delivery information"
                    number={1}
                    children={
                        <span style={{ textTransform: "initial" }}>
                            This website, together with the sub websites
                            that are accessible through it, (hereinafter
                            referred to as the "site") is published and
                            maintained by Yamaha Corporation (hereinafter
                            “Yamaha”). <br />
                            <br />
                            When you access, browse or use the site, you
                            understand and accept, without limitation or
                            qualification, the terms of use below. When you
                            access the sites that are accessible through
                            this website, you accept any additional terms of
                            the sub websites as if they have their own terms
                            of use. Please read it carefully as Yamaha does
                            not accept any liability related to sub
                            websites. <br />
                            <br />
                            Information on this site may contain technical
                            inaccuracies or typographical errors.
                            Information may be altered or updated at any
                            time without notice.
                        </span>
                    }
                />
                <Accordion
                    heading="returns policy"
                    number={1}
                    children={
                        <span style={{ textTransform: "initial" }}>
                            This website, together with the sub websites
                            that are accessible through it, (hereinafter
                            referred to as the "site") is published and
                            maintained by Yamaha Corporation (hereinafter
                            “Yamaha”). <br />
                            <br />
                            When you access, browse or use the site, you
                            understand and accept, without limitation or
                            qualification, the terms of use below. When you
                            access the sites that are accessible through
                            this website, you accept any additional terms of
                            the sub websites as if they have their own terms
                            of use. Please read it carefully as Yamaha does
                            not accept any liability related to sub
                            websites. <br />
                            <br />
                            Information on this site may contain technical
                            inaccuracies or typographical errors.
                            Information may be altered or updated at any
                            time without notice.
                        </span>
                    }
                />
                <Accordion
                    heading="Terms and Conditions"
                    number={1}
                    children={
                        <span style={{ textTransform: "initial" }}>
                            This website, together with the sub websites
                            that are accessible through it, (hereinafter
                            referred to as the "site") is published and
                            maintained by Yamaha Corporation (hereinafter
                            “Yamaha”). <br />
                            <br />
                            When you access, browse or use the site, you
                            understand and accept, without limitation or
                            qualification, the terms of use below. When you
                            access the sites that are accessible through
                            this website, you accept any additional terms of
                            the sub websites as if they have their own terms
                            of use. Please read it carefully as Yamaha does
                            not accept any liability related to sub
                            websites. <br />
                            <br />
                            Information on this site may contain technical
                            inaccuracies or typographical errors.
                            Information may be altered or updated at any
                            time without notice.
                        </span>
                    }
                />
            </div>
        );
    };

    ItemsInCart = () => {
        return (
            <div>
                {this.TopHeader()}
                {this.Items()}
                {this.BottomCheckoutButton()}


                <TermsAccordian />

            </div>
        )
    }

    NoItemsInCart = () => {

        return (
            <Grid
                container
                style={{ height: "50vh", backgroundColor: "#fff" }}
            >
                <Grid item md={8} style={{ margin: "auto" }}>

                    <p
                        style={{
                            marginTop: -20,
                            fontSize: "2.2rem",
                            color: "#000",
                            fontFamily: "rift",
                            fontWeight: "bold",
                            textAlign: "center"
                        }}
                    >
                        No Items In Cart
                    </p>
                    <Grid container spacing={1}>
                        <Grid item style={{ marginLeft: "auto" }}>
                            <Button
                                title="Go Home"
                                link="/"
                                type="yamaha-btn-sm yamaha-btn-secondary"
                            />
                        </Grid>
                        <Grid item style={{ marginRight: "auto" }}>
                            {/* <Button
                                title="Go to Support"
                                link="/support"
                                type="yamaha-btn-sm yamaha-btn-secondary"
                            /> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
    resetExternal() {
        this.setState({ ...this.state, externalLogin: !this.state.externalLogin })
    }
    itemDiscountExists(items) {
        let discount = items.filter((product) => {
            return product.syspro_discount !== "0.00"
        })
        let noDiscount = items.filter((product) => {
            return product.syspro_discount === "0.00"
        })

        return { "discount": discount.length, "noDiscount": noDiscount.length }
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

        return (
            <div style={{ background: colors.light, overflow: "hidden" }}>
                {this.props.voucherApplied === true ? this.onCloseModals() : <></>}
                <VoucherModal
                    isOpen={this.state.openVoucherModal}
                    isClosed={this.onCloseModals}
                    handleClose={this.onCloseModals}
                    discounts={this.state.discounts}
                    items={this.props.prodFromCart}
                ></VoucherModal>

                <NavBar
                    topColor={isIE ? "#FFF" : "rgba(255,255,255,96%)"}
                    bottomColor={isIE ? "#FFF" : "rgba(255,255,255,90%)"}
                    search
                    menuDrawerInfo={footerMenu}
                    menuColor="black"
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
                        this.props.loadingCart ?
                            <Grid container>
                                <Grid item xs={12} md={12} style={{ textAlign: "center", marginTop: 300 }}>
                                    <CircularProgress size={50} color={"primary"} />
                                </Grid>
                            </Grid> : <>
                                <>
                                    {this.state.prodFromCart.length === 0 ?
                                        <NoDataFound mainHeader="No Items In Cart" buttonName1="Go Home" linkTo="/" buttonName2="" />
                                        : <this.ItemsInCart />
                                    }
                                </>
                            </>
                    }


                </div>
                <Footer mainFooter openExternal={this.state.externalLogin} resetExternal={() => { this.resetExternal() }} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        total: state.cartReducer.total,
        formattedData: state.cartReducer.formattedData,
        prodFromCart: state.cartReducer.cart,
        message: state.cartReducer.message,
        status: state.cartReducer.status,
        errors: state.cartReducer.error,
        isLoggedIn: state.authReducer.loggedIn,
        voucher: state.cartReducer.voucherApplied,
        discount: state.cartReducer.discount,
        discountPercentage: state.cartReducer.discountPercentage,
        loadingCart: state.cartReducer.loading
    }
}


export default connect(mapStateToProps)(withRouter(CartPage));
