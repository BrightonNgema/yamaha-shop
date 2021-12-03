import React, { Component } from 'react';
import { NavBar, Footer, Toastr, Button, ConfirmationModal } from "components";
import { colors } from "theme";
import { Grid, CircularProgress, Checkbox } from "@material-ui/core";
import { isIE } from 'react-device-detect';
import { Form as FC } from 'components';
import './index.css';
import './../../../Assets/styles/global.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAddresses, addAddress, putAddress, deleteAddress, nullStatus } from '../../../Redux/Actions/address';
import Paper from '@material-ui/core/Paper';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from "@material-ui/core/Typography";

class AddressPage extends Component {
    state = {
        deliveryForms: [
            // Getting from Reducer
        ],

        default_address_residential: false,
        default_address_business: false,
        isEmpty: true,
        type: 'Business',
        address_button: "Update Address",
        reduxSet: false,
        openAlert: false,
        errors: {

        },
        loading: true,
        variant: null,
        message: null,
        edit: null,
        defaultAddress: 1,
        showDialog: false,
        dialogAddress: '',
        dialogID: null,
    }


    onCheck(key, unchecked) {
        this.setState({
            ...this.state,
            [key]: !this.state[key],
            [unchecked]: this.state[key]
        })
    }

    componentDidMount() {

        let { dispatch } = this.props;
        dispatch(nullStatus());
        dispatch(getAddresses());
        this.setState({ ...this.state, deliveryForms: this.props.addresses })
    }


    componentDidUpdate() {
        let { status, message, errors, addresses } = this.props;
        let { dispatch } = this.props;
        let { isEmpty } = this.props.isEmpty;

        switch (status) {
            case "success":
                console.log("elo",addresses)
                if (message === null) {
                    this.setState({
                        ...this.state,
                        reduxSet: true,
                        loading: false,
                        deliveryForms: addresses,
                        // openAlert: true,
                        // message: message,
                    });
                } else {
                   
                    this.setState({
                        ...this.state,
                        reduxSet: true,
                        loading: false,
                        deliveryForms: addresses,
                        openAlert: true,
                        message: message,
                    });
                }

                dispatch(nullStatus())
                break;
            case "errors":
                if (!this.state.reduxSet) {
                    this.setState({
                        ...this.state,
                        reduxSet: true,
                        errors: errors,
                        message: message,
                        openAlert: true,
                    })
                }
                dispatch(nullStatus())
                break;
            default:
                break;

        }

    }

    onChangedData(k, v, i) {

        let forms = this.state.deliveryForms
        forms[i][k] = v

        this.setState({
            ...this.state,
            deliveryForms: forms
        })

    }
    submit = () => {
        let { dispatch } = this.props;
        let { isEmpty } = this.props.addresses;

        let errors = this.formValidator.validate(this.state.form)
        if (errors.length > 0) {

            let tempError = {}
            errors.forEach(val => {

                tempError[val.path] = val.message
            })
            this.setState({ ...this.state, errors: tempError })
        } else {


            let remappedData = {
                residential: {
                    street_address: this.state.form.street_address,
                    street_number: parseInt(this.state.form.street_number),
                    complex: this.state.form.complex,
                    suburb: this.state.form.suburb,
                    city: this.state.form.city,
                    province: this.state.form.province,
                    postal_code: parseInt(this.state.form.postal_code) ? parseInt(this.state.form.postal_code) : null,
                    delivery_notes: this.state.form.delivery_notes,
                    default: this.state.default_address_residential,

                },
                business: {
                    street_address: this.state.form.street_address_2,
                    company: this.state.form.company,
                    building: this.state.form.building,
                    suburb: this.state.form.suburb_2,
                    city: this.state.form.city_2,
                    province: this.state.form.province_2,
                    postal_code: parseInt(this.state.form.postal_code_2) ? parseInt(this.state.form.postal_code_2) : null,
                    delivery_notes: this.state.form.delivery_notes_2,
                    default: this.state.default_address_business,
                }
            }
            this.setState({ ...this.state, reduxSet: false })
            if (isEmpty) {

                dispatch(addAddress(remappedData))
            } else {
                remappedData.residential.id = this.props.addresses.residential.id
                remappedData.business.id = this.props.addresses.business ? this.props.addresses.business.id : null
                dispatch(putAddress(remappedData))

            }
        }
    }

    TopHeader = () => {
        return (
            <div className="heading-main">
                <h1 className="contact-heading">Delivery Addresses</h1>

            </div>
        );
    };



    editSubmit(index) {
        this.setState({ ...this.state, edit: index })
    }


    handleRadio(e) {
        this.setState({ ...this.state, defaultAddress: e });

    }

    openModal = (address, addressID) => {

        this.setState({ ...this.state, showDialog: true, dialogAddress: address, dialogID: addressID });
    }
    closeModal = () => {
        this.setState({ ...this.state, showDialog: false });
    }
    deleteAddress(id) {
        this.props.dispatch(deleteAddress(id));
        this.setState({ ...this.state, loading: true });
        this.closeModal();
    }

    visualData = (data, index) => {
        return (
            <>
                <Grid item md={6} sm={12} key={index}>
                    <Paper elevation={3} className="address-card" style={{
                        backgroundColor: "#f4f4f4",
                        padding: 20,
                    }}>
                        <Grid container style={{ paddingLeft: 30 }}>
                            <Grid item xs={12} md={12}>
                                <Grid container>
                                    <Grid item xs={7} md={9}>
                                        {/* <FormControl component="fieldset">
                                            <RadioGroup
                                                aria-label="Addresses"
                                                name="addresses"
                                                // className={classes.group}
                                                value={this.state.defaultAddress}
                                                onChange={() => this.handleRadio(data.id)}
                                            >
                                                <FormControlLabel
                                                    value={data.id}
                                                    control={<Radio color="primary" />}
                                                    label={
                                                        <Typography className="labels-color">
                                                            <strong>Name: {data.name}</strong>
                                                            {this.state.defaultAddress === data.id ? <span> (Default) </span> : <></>}
                                                        </Typography>
                                                    }
                                                />
                                            </RadioGroup>
                                        </FormControl> */}
                                        {/* <FormControlLabel */}
                                        <div className="labels-color" style={{ marginTop: 15 }}>
                                            <strong>Name: {data.name}</strong>
                                        </div>
                                    </Grid>
                                    <Grid item xs={5} md={3}>
                                        <Button type="secondary yamaha-btn-md"
                                            link={'delivery/' + data.id}
                                            title={<EditRoundedIcon />}>
                                        </Button>
                                        <span style={{ margin: 5 }}></span>
                                        <Button type="primary yamaha-btn-md"
                                            onClick={() => this.openModal(data.name, data.id)}
                                            title={<DeleteOutlineRoundedIcon />}>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Grid container>
                                    <Grid item xs={6} md={6}>
                                        <p>{data.street_address}</p>
                                        <p>{data.street_number}</p>
                                        <p>{data.complex}</p>
                                        <p>{data.suburb}</p>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <p>{data.city}</p>
                                        <p>{data.province}</p>
                                        <p>{data.postal_code}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </>
        )
    }
    renderForm = () => {
        return (<Grid container spacing={10} style={{ color: "black" }}>
            <Grid item xs={12} md={6}>
                {this.TopHeader()}
            </Grid>
            <Grid item md={6} xs={12} style={{ display: "flex" }}>
                <div className="add-address-btn">

                    {
                        sessionStorage.getItem("deliveryInfo") === null ?
                            <></> : <Button
                                type="primary yamaha-btn-md "
                                link="/cart/order-summary"
                                title="Go To Checkout"
                            ></Button>
                    }

                    <Button
                        type="primary yamaha-btn-md "
                        link="delivery/create"
                        title="Add an Address"
                    ></Button>
                </div>
            </Grid>
            <Grid item xs={12} md={12}>

                <Grid container spacing={10} style={{ color: "black" }}>
                    {this.state.deliveryForms != null && this.state.deliveryForms.length != 0 ? this.state.deliveryForms.map((val, index) => (
                        <>
                            {this.visualData(val, index)}

                        </>
                    )) : <>
                            <Grid item xs={12} md={12}>
                                <p>No Addresses Found!</p>
                            </Grid>
                        </>
                    }

                </Grid>


            </Grid>
            <Grid item xs={12} sm={12}>
                <span style={{ marginLeft: 10 }}>
                    <Button
                        type='primary yamaha-btn-lg'
                        title="Back"
                        onClick={() => this.props.history.goBack()}
                    />
                </span>
            </Grid>

        </Grid>)
    }

    handleAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openAlert: false });
    };

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
                <ConfirmationModal
                    isOpen={this.state.showDialog}
                    address={this.state.dialogAddress}
                    isClosed={this.closeModal}
                    handleClose={this.closeModal}
                    handleDelete={() => this.deleteAddress(this.state.dialogID)}
                ></ConfirmationModal>
                <NavBar
                    topColor={isIE ? "#FFF" : "rgba(255,255,255,96%)"}
                    bottomColor={isIE ? "#FFF" : "rgba(255,255,255,90%)"}
                    search
                    warranty
                    menuColor="black"
                    menuDrawerInfo={footerMenu}
                    logoColor="black"
                />
                <div className="generic-container ">
                    <Toastr
                        horizontalPosition="right"
                        open={this.state.openAlert}
                        message={this.state.message}
                        variant={this.state.variant}
                        onClose={this.handleAlert}
                        duration={3000}>
                    </Toastr>
                    <div style={{ padding: "40px 0px", flexGrow: 1, paddingRight: "40px" }}>
                        {this.state.loading ? (
                            <Grid container>

                                <Grid item xs={12} md={12} style={{ textAlign: "center", marginTop: 300 }}>

                                    <CircularProgress size={50} color={"primary"} />
                                </Grid>

                            </Grid>
                        ) : (<>
                            {this.renderForm()}
                        </>)}
                    </div>
                </div>
                <Footer fixed mainFooter />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        addresses: state.addressReducer.addresses,
        status: state.addressReducer.status,
        errors: state.addressReducer.error,
        message: state.addressReducer.message,
        isEmpty: state.addressReducer.isEmpty
    }
}

export default connect(mapStateToProps)(withRouter(AddressPage))