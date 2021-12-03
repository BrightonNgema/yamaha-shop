import React, { Component } from "react";
import { NavBar, Footer, Button as BTN, Toastr } from "components";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "theme";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { FormDropdown, FormInput } from "components/Form";
import { isIE } from "react-device-detect";
import { Helmet } from "react-helmet";
import { animateScroll } from "react-scroll";
import { Form as FC } from "components";
import Schema from "validate";
import "./../../../Assets/styles/global.css";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getDeliveryInfo } from '../../../Redux/Actions/orderProcess'
import axios from 'axios';
import { config } from '../../../Redux/service';

class DeliveryAddress extends Component {
    state = {
        check: false
    }
    allowDrop() {
        this.setState({
            check: true
        })
    }
    componentDidMount() {
        let { dispatch } = this.props;
        animateScroll.scrollToTop();

        // TODO dispatch
        // dispatch(getDeliveryInfo())
    }
    componentDidUpdate() {

    }
    rowGen = (itemSizeMd, itemSizeSm, keyItem, name, type, defaultValue) => {
        return (
            <Grid
                item
                md={itemSizeMd}
                sm={itemSizeSm}
                style={{ marginBottom: "10px" }}
            >
                <FC.FormInput
                    name={keyItem}
                    label={name}
                    type={type}
                    defaultValue={defaultValue}
                    // helperText={states.errors[keyItem]}
                    onChange={(key, value) => {

                        this.onChangeHandler(key, value);
                    }}
                    value={this.props.state.user[keyItem]}
                ></FC.FormInput>
            </Grid>
        );
    };

    /* This is the user personal details */
    onChangeHandler = (key, value) => {
        let tempForm = this.props.state.user;
        tempForm[key] = value;

        this.setState({ user: tempForm });

    };

    Recipient = () => {
        return (
            <div style={{ paddingTop: 30, flexGrow: 1 }}>

                <Grid container alignContent="space-around">
                    <Grid item xs={12} md={12}>

                        <h3 className="color">RECIPIENT</h3>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        {this.rowGen(12, 12, "name", "Name")}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {this.rowGen(12, 12, "surname", "Surname")}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {this.rowGen(12, 12, "email", "Email")}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {this.rowGen(
                            12,
                            12,
                            "company",
                            "Business Name"
                        )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {this.rowGen(
                            12,
                            12,
                            "business_tax_no",
                            "Business Tax Number"
                        )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {this.rowGen(12, 12, "phone", "Phone")}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {this.props.collectionOnly ? <>
                            <FormDropdown
                                placeholer="Select Address"
                                name="setAddress"
                                options={this.optionsAddress()}
                                label="Address Book"
                                value={this.props.state.setAddress?.name}
                                onChange={(k, v) => {
                                    this.onSelectAddress(k, v);
                                }}
                            />
                        </> : <>

                            </>}

                    </Grid>
                    <Grid item xs={12} md={4}>
                        {this.props.collectionOnly ? <>
                            <div style={{ marginLeft: 5, marginTop: 25 }}>
                                <BTN
                                    title="+ NEW ADDRESS"
                                    type="primary yamaha-btn-md float-right"
                                    onClick={() => this.props.goToAddress()}
                                // link="/cart/delivery/additional-info"
                                />
                            </div>
                        </> : <></>}

                    </Grid>

                </Grid>
            </div>
        );
    };

    defaultInputStyle = makeStyles((theme) => ({
        root: {
            border: "2px solid #e2e2e1",
            overflow: "hidden",
            borderRadius: 4,
            backgroundColor: "#fff",

            "&$disabled": {
                color: "white",
            },
            transition: theme.transitions.create([
                "border-color",
                "box-shadow",
            ]),
            "&$focused": {
                backgroundColor: "#fff",
            },
            "&:hover": {
                background: "none",
            },
            height: "4.2em",

        },
        disabled: {
            backgroundColor: "#009DD2",
            color: "white",
        },
        input: {
            "&::placeholder": {
                textOverflow: "ellipsis !important",
                color: "#000",
            },
        },
        icon: {
            fontSize: 40,
            paddingTop: "0.2em"
        },
        btn_styled_label: {
            width: "-webkit-fill-available",
            textAlign: "left",
            float: "left"
        }
    }));

    CustomButton = ({ name, disabled }) => {
        const classes = this.defaultInputStyle();
        return (
            <div className="input-container">
                <Button
                    variant="raised"
                    disabled={disabled}
                    fullWidth
                    classes={{ root: classes.root, disabled: classes.disabled, }}

                >
                    <span className={classes.btn_styled_label}>{name}</span>
                    <span>{!disabled ? (<></>) : (<CheckCircleIcon fontSize="default" className={classes.icon} />)}</span>
                </Button>
            </div>
        );
    };

    handleChange() {
        this.setState((prevState) => ({
            delivery_address: !prevState.delivery_address,
        }));
    }
    getAvailableDates() {


        if (this.props.state.setAddress?.id) {
            let token = sessionStorage.getItem("token");
            axios.get(`${process.env.REACT_APP_BACKEND_URL}auth/address/delivery-dates/${this.props.state.setAddress.id}`, config(token)).then(succ => {

                this.props.state.availDate = succ.data.BookingAvailabilitySlots.map(val => {
                    return {
                        value: val.DailyTripID,
                        fullData: val,
                        text: val.ServiceDate.replace("T00:00:00", "") + " " + val.ServiceTime
                    }
                })
                this.setState({
                    ...this.state,
                    availDate: succ.data.BookingAvailabilitySlots
                })
            }).catch(error => {

            })
        }
    }
    Delivery = () => {
        return (
            <div style={{ paddingTop: 10, flexGrow: 1 }}>
                {this.props.collectionOnly ? <>
                    <Grid container>
                        <Grid item xs={12} sm={8}>
                            <Grid>
                                <h3 className="color">
                                delivery address for the shopping cart
                            </h3>
                                <div style={{ marginLeft: 10, marginTop: 30 }}>
                                    {
                                        this.props.state.setAddress ?
                                            <>

                                                {this.props.state.setAddress?.street_number} {this.props.state.setAddress?.complex}, {this.props.state.setAddress?.street_address}, {this.props.state.setAddress?.suburb}, {this.props.state.setAddress?.city}, {this.props.state.setAddress?.postal_code}
                                            </> : <>

                                            </>
                                    }
                                </div>
                            </Grid>

                            <h3 className="color">
                                {this.props.return ? "AVAILABLE COLLECTION DATES" : "AVAILABLE DELIVERY DATES"}
                            </h3>
                            <Grid container>
                                <Grid item xs={12} sm={4}>
                                    <div style={{ marginTop: 30 }}>
                                        <BTN
                                            title="CHECK AVAILABLE DATES"
                                            type="primary yamaha-btn-md float-right"
                                            onClick={() => {
                                                this.getAvailableDates();
                                                this.allowDrop();
                                            }}
                                        // link="/cart/delivery/additional-info"
                                        />

                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    {
                                        this.state.check ?
                                            <FormDropdown
                                                placeholder="Select Available Date"
                                                name="availDate"
                                                options={this.props.state.availDate}
                                                label="Pick Delivery Date"
                                                value={this.props.state.availDateSet?.value}
                                                onChange={(k, v) => {
                                                    this.setAvailableDate(k, v)
                                                    // this.onSelectAddress(k, v);
                                                }}
                                            />
                                            :
                                            <><p style={{ color: "black" }}>Please check available delivery date.</p></>
                                    }

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <h3 className="color">
                                {this.props.return ? "COLLECTION INSTRUCTIONS" : "DELIVERY INSTRUCTIONS"}
                            </h3>
                            <FormInput
                                name="delivery_instructions"
                                onChange={(k, v) => { this.onChangeComment(k, v) }}
                                value={this.props.state.delivery_instructions}
                                multiline
                            />
                        </Grid>
                    </Grid>
                </> : <></>}

            </div >
        );
    };

    optionsAddress = () => {
        let addresses = [];
        this.props.state.addresses.map((address, i) => {
            addresses.push(address.name.toString());
        });
        return addresses;
    };

    onSelectAddress = (name, value) => {
        if (this.props.state.addresses) {


            let currentAddress = this.props.state.addresses.filter(val => val.name == value)
            this.props.state.setAddress = currentAddress[0]


            this.setState({
                ...this.state,
                setAddress: currentAddress
            })

        }

    };


    onSelect = (name, value) => {
        this.setState((state, props) => {
            let currentFields = state.selected_province;
            currentFields = value;
            return { selected_province: currentFields };
        });

    };

    options = () => {
        let provinces = [];
        this.props.state.form_2.map((province, i) => {
            provinces.push(province.province.toString());
        });
        return provinces;
    };

    dealerOptions = () => {
        let provinces = this.props.state.form_2.filter((province) => {
            return province.province === this.props.state.selected_province;
        });


        let stores = [];
        provinces[0].dealer.map((place, i) => {
            stores.push(place);
        });

        return stores;
    };

    Collection = () => {
        return (
            <div style={{ paddingTop: 30, flexGrow: 1 }}>
                <Grid container>
                    <h3 className="color">Collection Address</h3>
                    <Grid container>
                        <Grid item xs={6} sm={3}>
                            <FormDropdown
                                placeholer="Province"
                                name="province"
                                options={this.options()}
                                label="Province"
                                value={this.props.state.selected_province}
                                onChange={(k, v) => {
                                    this.onSelect(k, v);
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <FormDropdown
                                placeholer="Dealer"
                                name="dealer"
                                options={this.dealerOptions()}
                                label="Dealer"
                                // value={state.province}
                                onChange={(k, v) => {
                                    this.onSelect(k, v);
                                }}
                            />
                        </Grid>
                    </Grid>
                    <div className="color">Delivery Address</div>
                </Grid>
            </div>
        );
    };

    onSubmit = () => {
        /* Handle */
        this.props.history.push('/cart/delivery/additional-info');
    };

    onChangeComment(name, value) {

        this.props.state.delivery_instructions = value;
        this.setState({ ...this.state, delivery_instructions: value })
    }
    setAvailableDate(k, v) {

        this.props.state.availDateSet = this.props.state.availDate.filter(val => val.value == v)[0];

        this.setState({
            ...this.state,
            availDateSet: this.props.state.availDateSet
        })
    }
    DeliveryInstruction = () => {
        return (
            <div style={{ flexGrow: 1, paddingBottom: 20 }}>
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <div style={{ float: "right", paddingTop: 90 }}>
                            <BTN
                                title="Next"
                                type="primary yamaha-btn-md float-right"
                                onClick={() => this.props.onSubmitDelivery(this.state)}
                            // link="/cart/delivery/additional-info"
                            />
                        </div>
                    </Grid>
                </Grid>
            </div >
        );
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

        const TopHeader = () => {
            return (
                <div className="heading-main">
                    <h1 className="contact-heading">{this.props.return || this.props.collectionOnly === false ? "collection information" : "delivery information"}</h1>
                    <span className="contact-subheading">
                        Please fill and confirm your details
                    </span>
                </div>
            );
        };

        return (


            <div className="max-width-modal">

                <TopHeader />
                {this.props.state.loading ?
                    <>
                        <CircularProgress size={50} color={"primary"} />

                    </> :
                    <>
                        <this.Recipient />

                        {this.props.state.forDelivery ? <this.Delivery /> : <></>}
                        {this.props.state.forCollection ? <this.Collection /> : <></>}
                        <this.DeliveryInstruction />
                    </>
                }
                {/* TODO: ADD OPTIONAL DELIVERY INSTRUCTIONS */}

            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        deliveryInfo: state.orderProcessReducer.deliveryInfo,
        message: state.orderProcessReducer.message,
        errors: state.orderProcessReducer.error,
        status: state.orderProcessReducer.status,
    }
}

export default connect(mapStateToProps)(DeliveryAddress)
