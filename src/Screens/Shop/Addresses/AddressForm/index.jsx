import React, { Component } from 'react';
import { NavBar, Footer, Toastr, Button } from "components";
import { colors } from "theme";
import { Grid, CircularProgress, TextField, FormHelperText } from "@material-ui/core";
import { isIE } from 'react-device-detect';
import { Form as FC } from 'components';
import './../../../../Assets/styles/global.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAddress, addAddress, putAddress, nullStatus } from '../../../../Redux/Actions/address';
import axios from 'axios'
import { config } from '../../../../Redux/service';

import Autocomplete from '@material-ui/lab/Autocomplete';
class AddressForm extends Component {

    state = {
        address: [],
        add: {},
        form: {
            set_default: false,
            name: "",
            street_address: "",
            street_number: "",
            complex: "",
            suburb: "",
            city: "",
            province: "",
            postal_code: "",
            delivery_notes: ""
        },
        id: null,
        loading: true,
        reduxSet: false,
        errors: {},
        message: "",
        variant: "",
        openAlert: false,
        suburb: {
            loading: true,
            options: [],
            processed: [],
            typing: "",
            setData: []
        }
    }

    componentDidMount() {
        let { dispatch } = this.props;

        if (this.props.match.params.id !== 'create') {
            this.setState({ ...this.state, id: this.props.match.params.id })
            dispatch(getAddress(parseInt(this.props.match.params.id)));
        } else {


            this.setState({
                ...this.state,
                id: this.props.match.params.id,
                loading: false,
                address: this.props.addresses
            });
        }
    }



    componentDidUpdate() {
        let { dispatch } = this.props;
        let { address, status, errors, message, history, isEdit } = this.props
        switch (status) {
            case 'success':
                if (!this.state.reduxSet) {

                    if (isEdit) {

                        this.props.history.push("/account/delivery");

                    } if (address) {
                        let alerts = {}
                        if (message) {
                            alerts = {
                                variant: 'success',
                                message: message,
                                openAlert: true
                            }
                        }
                        let populateSuburb = {
                            ControllingLocation: "",
                            TownCode: address.dsv_town_code,
                            ProvinceID: address.dsv_province_id,
                            ProvinceName: address.province + " (" + address.postal_code + ")",
                            SuburbName: address.suburb
                        }
                        this.setState({
                            ...this.state,
                            form: {

                                name: address.name,
                                street_address: address.street_address,
                                street_number: address.street_number,
                                complex: address.complex,
                                suburb: address.suburb,
                                city: address.city,
                                province: address.province,
                                postal_code: address.postal_code,
                                delivery_notes: address.delivery_notes
                            },
                            suburb: {
                                ...this.state.suburb,
                                typing: address.suburb + ", " + address.province + " (" + address.postal_code + ")",
                                setData: [populateSuburb]
                            },
                            ...alerts,
                            reduxSet: true,
                            loading: false,
                        })


                    }
                }
                dispatch(nullStatus())
                break;
            case 'errors':

                if (!this.state.reduxSet) {

                    if (errors["suburb.SuburbName"]) {
                        errors.suburb = errors["suburb.SuburbName"]
                    }
                    this.setState({
                        ...this.state,
                        errors: errors,
                        loading: false,
                        message: message,
                        variant: 'error',
                        openAlert: true,
                        reduxSet: true
                    })
                    dispatch(nullStatus())
                }

                break;
            default:
                break;

        }
    }
    TopHeader = () => {

        return (
            <div className="heading-main">
                <h1 className="contact-heading">Delivery Addresses</h1>
                <span className="contact-subheading">
                    Enter your address details below
                </span>
            </div>
        );
    };
    onChangedData(k, v) {

        let forms = this.state.form
        forms[k] = v

        this.setState({
            ...this.state,
            form: forms
        })

    }
    rowGen = (itemSizeMd, itemSizeSm, keyItem, name) => {

        return (
            <Grid item md={itemSizeMd} sm={itemSizeSm} style={{ marginBottom: "10px", width: "100%" }}>
                <FC.FormInput
                    name={keyItem}
                    label={name}
                    helperText={this.state.errors[keyItem]}
                    onChange={(key, value) => {
                        this.onChangedData(key, value)
                    }}
                    value={this.state.form[keyItem]}
                >
                </FC.FormInput>
            </Grid>
        );
    }

    apiCaller(value) {

        let sub = this.state.suburb;
        sub.typing = value
        this.setState({ ...this.state, suburb: sub })

    }
    settingData(option) {
        let sub = this.state.suburb;
        sub.setData = option;

        this.setState({ ...this.state, suburb: sub })
    }
    check(value) {
        const token = sessionStorage.getItem("token")
        axios.get(`${process.env.REACT_APP_BACKEND_URL}auth/address/suburb-search?search=${value}`, config(token)).then(succ => {
            let sub = this.state.suburb;
            sub.options = succ.data.SuburbList ? succ.data.SuburbList : [];

            sub.processed = succ.data.SuburbList ? succ.data.SuburbList.map(item => {
                return item.SuburbName + ", " + item.ProvinceName
            }) : []

            this.setState({ ...this.state, suburb: sub, })
        })
    }

    autcompleteForm(itemSizeMd, itemSizeSm) {
        return (
            <Grid item md={itemSizeMd} sm={itemSizeSm} style={{ marginBottom: "10px", width: "100%" }}>

                <Autocomplete
                    freeSolo
                    fullWidth
                    className={`input `}
                    defaultValue={this.state.suburb.setData}
                    value={this.state.suburb.typing}

                    onInputChange={(event, newInputValue) => {

                        this.apiCaller(newInputValue);
                        if (newInputValue.length > 3) {

                            this.check(newInputValue)
                        }
                    }}
                    onChange={(event, newValue) => {

                        this.settingData(newValue)
                    }}
                    options={this.state.suburb.options}
                    loading={this.state.suburb.loading}
                    getOptionSelected={(option, value) => {

                        if (option.SuburbName + ", " + option.ProvinceName == value) {

                            return true
                        }
                    }}
                    getOptionLabel={(option) => (typeof option === 'string' ? option : option.SuburbName + ", " + option.ProvinceName)}
                    renderOption={(option) => (
                        <React.Fragment>

                            {option ? option.SuburbName + ", " + option.ProvinceName : "Loading"}
                        </React.Fragment>
                    )}
                    renderInput={(params) => {

                        return params ? (
                            <><div className="input-container">
                                <TextField className="input" placeholder="Suburb" style={{ backgroundColor: "white" }} {...params} variant="filled" ></TextField>
                            </div>
                            </>
                        ) : (<></>)
                    }}

                >

                </Autocomplete>
                {
                    (this.state.errors?.suburb && this.state.errors?.suburb?.length > 0) ?
                        <FormHelperText error>{this.state.errors.suburb}</FormHelperText> :
                        (<></>)}
            </Grid>)
    }

    renderFormFields = () => {

        return (
            <>
                <Grid container >
                    {/* The Residential form */}
                    <Grid item sm={12} xs={12} className="res-form" style={{ marginTop: 0 }}>
                        <Grid container  >

                            {this.rowGen(4, 12, "name", "Address Reference (eg. My House)")}
                            {this.rowGen(4, 12, "street_address", "Street Address")}
                            {this.rowGen(4, 12, "street_number", "Street Number")}

                        </Grid>
                        <Grid container  >

                            {this.rowGen(4, 12, "complex", "Complex / Building")}
                            {this.rowGen(4, 12, "city", "City")}
                            {this.autcompleteForm(4, 12)}

                        </Grid>

                        <Grid container  >

                            {this.rowGen(4, 12, "delivery_notes", "Delivery Notes")}
                        </Grid>

                    </Grid>

                    <Grid item md={12} style={{ display: "flex" }}>
                        <div style={{ margin: "40px 0px 0px" }}>
                            <Button
                                type="primary yamaha-btn-md"
                                // link={() => { this.submit() }}
                                onClick={this.submit}
                                title="Save Address"
                            > </Button>
                        </div>
                        <div style={{ margin: "40px 30px 0px" }}>
                            <Button
                                type="primary yamaha-btn-md"
                                link="/account/delivery"
                                title="Back"
                            > </Button>
                        </div>
                    </Grid>

                </Grid>
            </>

        );
    }

    handleAlert() {
        this.setState({ ...this.state, openAlert: false })
        this.props.dispatch(nullStatus());
    }

    submit = () => {
        let { dispatch } = this.props;
        let body = {
            name: this.state.form.name,
            street_address: this.state.form.street_address,
            street_number: parseInt(this.state.form.street_number),
            complex: this.state.form.complex,
            city: this.state.form.city,
            suburb: this.state.suburb.setData,
            delivery_notes:this.state.form.delivery_notes
        }

        this.setState({ ...this.state, reduxSet: false, loading: true })
        if (this.props.match.params.id === "create") {
            dispatch(addAddress(body))

        } else {
            dispatch(putAddress(this.state.id, body))

        }
    }

    renderForm = () => {
        return (<Grid container spacing={10} style={{ color: "black" }}>
            <Grid item xs={12} sm={12}>
                {this.TopHeader()}
            </Grid>
            <Toastr
                horizontalPosition="right"
                open={this.state.openAlert}
                onClose={() => { this.handleAlert() }}
                message={this.state.message}
                variant={this.state.variant}
                duration={3000}>
            </Toastr>
            <Grid item xs={12} md={12} >

                {this.state.loading ?
                    <Grid container>
                        <Grid item xs={12} md={12} style={{ textAlign: "center", marginTop: 200 }}>
                            <CircularProgress size={50} color={"primary"} />
                        </Grid>
                    </Grid>
                    : this.renderFormFields()}

            </Grid>

        </Grid>)
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
                <div className="generic-container ">
                    <Toastr
                        horizontalPosition="right"
                        open={this.state.openAlert}
                        message={this.state.message}
                        variant={this.state.variant}
                        duration={3000}>
                    </Toastr>
                    <div style={{ padding: "40px 0px", flexGrow: 1 }}>
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
        address: state.addressReducer.address,
        status: state.addressReducer.status,
        errors: state.addressReducer.error,
        message: state.addressReducer.message,
        isEdit: state.addressReducer.isEdit,

    }
}

export default connect(mapStateToProps)(withRouter(AddressForm))