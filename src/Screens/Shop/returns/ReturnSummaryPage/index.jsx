import React, { Component } from "react";
import { NavBar, Footer, Accordion, Form as FC, Button, ImageRow, Toastr } from "components";
import { colors } from "theme";
import { isIE } from "react-device-detect";
import { Grid, List, ListItem, Divider, ListItemText, ListSubheader, Table, TableHead, TableRow, TableCell, TableBody, Paper, Dialog, CircularProgress } from "@material-ui/core";
import '../../../../Assets/styles/global.css';
import './index.css';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getReturnSummary, sendReturnSummary, nullStatus } from '../../../../Redux/Actions/returns';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import { DeliveryInfoPage } from '../../../index';

class ReturnSummaryPage extends Component {
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

        /**********************DELIVERY INFO**********************/
        deliveryInfo: {
            user: {
                name: "Lionel",
                surname: "Flume",
                email: "",
                phone: "078 701 5501",
                company: "",
                business_tax_no: "",
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
        },

        /**********************ADDITIONAL INFO**********************/
        additionalInfo: {
            professtional_installer: "Authorised Installer",
            phone_assistance: "Yes",
            visit_dealer: "Yes",
            accept_tcs: false,
            further_details: "Yes",
        },
        accept_tcs: false,
        buttonType: 'disabled'
    }

    componentDidMount() {
        //console.log(this.props);
        this.props.dispatch(getReturnSummary(this.props.match.params.order, this.props.match.params.id))
    }

    componentDidUpdate() {
        //console.log("props", this.props, "\n", "state", this.state);
        let { returnSummary, message,
            status,
            errors, dispatch, history } = this.props;


        if (returnSummary.status === 202) {
            dispatch(nullStatus());
            history.push("/confirmation/return-confirmation");
        }


        if (!this.state.reduxSet) {
            //console.log("in update redux");
            switch (status) {
                case "success":
                    //console.log("in update redux success");
                    this.setState({
                        ...this.state,
                        deliveryInfo: {
                            ...this.state.deliveryInfo,
                            user: returnSummary.user_details,
                            setAddress: returnSummary.user_addresses[0],
                            addresses: returnSummary.user_addresses
                        },
                        delivery: returnSummary.return.order_products,
                        reduxSet: true,
                        total: returnSummary.formatted_grand_total,
                        deliveryFee: returnSummary.formatted_delivery_fee
                    })
                    break;
                case "failed":
                    break;
            }
        }
    }

    onSubmitDelivery = (del) => {

        this.onModalToggle("openDeliveryAddress");
        //console.log("finalized", this.state)
    }
    onModalToggle = (key) => {
        //console.log("In toggle")
        this.setState({
            ...this.state,
            [key]: !this.state[key]
        })

    }

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
                    <DeliveryInfoPage state={this.state.deliveryInfo} collectionOnly={true} onSubmitDelivery={this.onSubmitDelivery} return={true}></DeliveryInfoPage>
                </DialogContent>
            </Dialog>
        )
    }

    bodyLayout() {
        return (
            <>
                <Grid container spacing={7}>
                    <Grid item xs={12} md={12}>
                        <h1 className="type-heading">
                            Return Confirmation
                        </h1>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        {this.checkoutSide()}
                    </Grid>
                    <Grid item md={1}>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        {this.itemsSide()}
                    </Grid>
                </Grid>
            </>
        )
    }

    proceed = () => {
        let body = {
            name: this.state.deliveryInfo.user.name,
            surname: this.state.deliveryInfo.user.surname,
            email: this.state.deliveryInfo.user.email,
            address: {
                pickup_instructions: this.state.deliveryInfo.delivery_instructions,
                street_number: this.state.deliveryInfo.setAddress.street_number,
                street_address: this.state.deliveryInfo.setAddress.street_address,
                city: this.state.deliveryInfo.setAddress.city,
                province: this.state.deliveryInfo.setAddress.province,
                postal_code: this.state.deliveryInfo.setAddress.postal_code,
            },
            required_pickup_date: this.state.deliveryInfo.availDateSet.fullData.ServiceDate,
            dsv_town_code: this.state.deliveryInfo.availDateSet.fullData.TownCode,
            dsv_province_id: this.state.deliveryInfo.setAddress.dsv_province_id,
            dsv_reference_number: this.state.deliveryInfo.availDateSet.fullData.AvailableSlots,
            dsv_dailytrip_id: this.state.deliveryInfo.availDateSet.fullData.DailyTripID,
            dsv_service_date: this.state.deliveryInfo.availDateSet.fullData.ServiceDate,
            dsv_service_time: this.state.deliveryInfo.availDateSet.fullData.ServiceTime,
        }

        //console.log("Body", body);


        this.props.dispatch(sendReturnSummary(this.props.match.params.order, this.props.match.params.id, body))
    }

    checkoutSide() {


        let buttonType = this.state.accept_tcs && this.state.deliveryInfo.availDateSet ?
            "primary margin-left-1"
            :
            "disabled margin-left-1";
        // let buttonType = "primary margin-left-1";

        let options = [];

        if (this.state.date_selected === false) {
            options = [
                {
                    title: "Recipient",
                    // subtitle: this.state.deliveryInfo.user.name + " " + this.state.deliveryInfo.user.surname + " " + this.state.deliveryInfo.user.phone,
                },
                {
                    title: "Collection Address",
                    subtitle: "Lionel Flume 078 701 5501",
                },
                {
                    title: "Collection Address",
                    // subtitle: this.state.deliveryInfo.setAddress.name,
                },
                {
                    title: "",
                    link: true
                },
                {
                    title: "Collection Date",
                    type: this.state.deliveryInfo.availDateSet ? false : true
                },
            ]
        } else {
            options = [
                {
                    title: "Recipient",
                    // subtitle: this.state.deliveryInfo.user.name + " " + this.state.deliveryInfo.user.surname + " " + this.state.deliveryInfo.user.phone,
                    link: true
                },
                {
                    title: "Collection Address",
                    subtitle: this.state.deliveryInfo.setAddress?.name,

                },
                {
                    title: "Collection Instructions",
                    subtitle: this.state.deliveryInfo?.delivery_instructions,

                },
                {
                    title: "Collection Date",
                    type: this.state.deliveryInfo.availDateSet ? false : true
                },
            ]
        }

        return (<>
            <Grid container >
                <Grid item xs={12} md={12} className="checkout-side">

                    <List style={{ paddingBottom: 0 }}>
                        {options.map((val, index) => (

                            val.title === "Collection Date" ?
                                <ListItem key={index} style={{ backgroundColor: "#d6d6d6" }}>
                                    <ListItemText className="font-change" primary={val.title}>
                                    </ListItemText>
                                    <ListSubheader>
                                        {val.type ? (
                                            <>
                                                <i><p className="p-tag-reset font-change color-text-black" style={{ fontSize: 17, textAlign: "left" }}>Please select a collection address </p></i>
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

                                    <ListItem style={{ marginBottom: 20, marginTop: 10 }}>
                                        {this.state.date_selected === false ?
                                            <Button title="Change collection address" onClick={() => {
                                                this.onModalToggle("openDeliveryAddress")
                                            }} type="primary" variant="outline">

                                            </Button>
                                            :
                                            <Button title="Select a collection address" onClick={() => {
                                                this.onModalToggle("openDeliveryAddress")
                                            }} type="primary full-width-100" variant="outline">

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
                    </Grid>
                    <Grid item xs={12} md={12}>

                    </Grid>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Button type={buttonType + ' full-width-100'} onClick={this.proceed} title="Confirm Return" ></Button>
                    {/* <Button type="secondary full-width-100 mt-2" onClick={() => { }} title="Apply for Finance"></Button> */}
                </Grid>
                <div style={{ marginTop: 30 }}>
                    <ImageRow isTrue={true} />
                </div>
            </Grid>
        </>)
    }

    handleChange = (name) => (event) => {
        this.setState({ accept_tcs: event.target.checked });
    };

    itemsSide() {

        let dRow = 0;
        let cRow = 0;

        this.state.delivery.forEach((item) => {

            if (item.shipment_method_id === 1) dRow++;
            if (item.shipment_method_id === 2) cRow++;
        })

        return (<>
            <Paper style={{ width: "100%", overflowX: "auto" }}>
                <Table style={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ITEMS</TableCell>
                            <TableCell align="center">SIZE</TableCell>
                            {/* <TableCell align="center">Collection Point</TableCell> */}
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
                                <TableCell component="th" scope="row">
                                    <Grid container xs={12} md={12}>
                                        <Grid item xs={3} md={3}>
                                            <img
                                                src={item.imageUrl}
                                                className="icon-img"
                                                alt="img"
                                                style={{ width: "50px", height: "50px", marginRight: 10 }}
                                            />
                                        </Grid>
                                        <Grid item xs={9} md={9} style={{ paddingTop: 20 }}>{item.itemName}</Grid>

                                    </Grid>
                                </TableCell>
                                <TableCell align="center">
                                    {item.syspro_size_1 ? item.syspro_size_1 : '-'}
                                </TableCell>
                                {/* <TableCell align="center">
                                    {item.collections?.text}
                                </TableCell> */}

                                <TableCell align="center">
                                    {item.syspro_colour ? item.syspro_colour : '-'}
                                </TableCell>
                                <TableCell align="center">
                                    <span>{item.quantity}</span>

                                </TableCell>
                                <TableCell align="right">
                                    {item.syspro_selling_price}
                                </TableCell>

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
                                        <Grid item xs={9} md={9} style={{ paddingTop: 20, paddingLeft: 10 }}>{item.prod_code}</Grid>

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
                                        {item.syspro_selling_price}
                                    </TableCell>
                                </> : <></>}

                            </TableRow>
                        ))}
                        <TableRow className="total-row">
                            <TableCell colSpan={6}>
                                <strong style={{ color: "black", fontWeight: "bold" }}>
                                    COLLECTION FEE
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
                                        {this.state.total}
                                    </span>
                                </strong>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>

            <Grid
                item
                md={12}
                xs={12}
                style={{ marginTop: 50 }}
            >
                <FormControl component="fieldset">
                    <FormLabel component="legend" style={{ textAlign: "left" }}>
                        <div className="form-labels">
                            Have you read and agreed to the terms and conditions regarding our returns policy.
                        </div>
                    </FormLabel>
                    <FormGroup style={{ marginTop: 10 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="default"
                                    checked={this.state.accept_tcs}
                                    onChange={this.handleChange("accept")}
                                    value="accept"
                                />
                            }
                            label={
                                <Typography className="labels-color">
                                    I confirm that i have read the return policy.
                                </Typography>
                            }
                        />
                    </FormGroup>
                </FormControl>
            </Grid>
        </>)
    }

    handleChange(v) {
        let btn = ""

        if (v) {
            btn = "primary"
        } else {
            btn = "disabled"
        }
        this.setState({ ...this.state, accept_tcs: !this.state.accept_tcs, buttonType: btn })
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
                {this.deliveryInformationModal()}
                <NavBar
                    topColor={isIE ? "#FFF" : "rgba(255,255,255,96%)"}
                    bottomColor={isIE ? "#FFF" : "rgba(255,255,255,90%)"}
                    search
                    warranty
                    menuColor="black"
                    menuDrawerInfo={footerMenu}
                    logoColor="black"
                />
                <div className="generic-container">
                    <div style={{ padding: "40px 0px", flexGrow: 1 }}>
                        {
                            this.props.status === "pending" ?
                                <Grid container>
                                    <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
                                        <CircularProgress size={50} color={"primary"} />
                                    </Grid>
                                </Grid>
                                :
                                this.bodyLayout()
                        }
                    </div>
                </div>
                <Footer fixed mainFooter />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.returnReducer.message,
        status: state.returnReducer.status,
        returnSummary: state.returnReducer.returnSummary,
    }
}

export default connect(mapStateToProps)(withRouter(ReturnSummaryPage));
// export default ReturnSummaryPage;
