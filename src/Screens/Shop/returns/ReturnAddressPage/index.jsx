import React, { Component } from "react";
import { NavBar, Footer, Button, Alerts } from "components";
import { colors } from "theme";
import { isIE } from "react-device-detect";
import { Grid } from "@material-ui/core";
import '../../../../Assets/styles/global.css';
import { FormDropdown, FormInput } from "components/Form";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import Paper from '@material-ui/core/Paper';

export default class extends Component {
    state = {
        addresses: [],
        pick_date: "2017-05-24T10:30",
        delivery_instructions: "",
        accept_tcs: false,
    }


    TopHeader = () => {
        return (
            <div className="heading-main">
                <h1 className="contact-heading">Returns Address</h1>
                <span className="contact-subheading">
                    Please confirm your details.
                </span>
            </div>
        );
    };

    /* This is the user personal details */
    onChangeHandler = (key, value) => {
        let tempForm = this.state.pick_date;
        tempForm[key] = value;

        this.setState({ pick_date: tempForm });

    };

    rowGen = (itemSizeMd, itemSizeSm, keyItem, name, type, defaultValue) => {
        return (
            <Grid
                item
                md={itemSizeMd}
                sm={itemSizeSm}
                style={{ marginBottom: "10px" }}
            >
                <FormInput
                    name={keyItem}
                    label={name}
                    type={type}
                    defaultValue={defaultValue}
                    // helperText={states.errors[keyItem]}
                    onChange={(key, value) => {

                        this.onChangeHandler(key, value);
                    }}
                    value={this.state.keyItem}
                ></FormInput>
            </Grid>
        );
    };

    optionsAddress = () => {
        let addresses = [];
        this.state.addresses.map((address, i) => {
            addresses.push(address.referenceName.toString());
        });
        return addresses;
    };

    onSelectAddress = (name, value) => {
        this.setState((state, props) => {
            let currentFields = state.selected_address;
            currentFields = value;
            return { selected_address: currentFields };
        });

    };

    Delivery = () => {
        return (
            <div style={{ paddingTop: 30, flexGrow: 1 }}>
                <Grid container>
                    <h3 className="color">
                        Select Collection Address
                    </h3>
                    <Grid container>
                        <Grid item xs={12} sm={3}>
                            <FormDropdown
                                placeholer="Select Address"
                                name="addresses"
                                options={this.optionsAddress()}
                                label="Addresses"
                                value={this.state.selected_address}
                                onChange={(k, v) => {
                                    this.onSelectAddress(k, v);
                                }}
                            />
                        </Grid>

                        {/* <Grid item xs={12} sm={3}>
                            <this.CustomButton name="Business" />
                        </Grid> */}

                        <Grid item xs={12} sm={3}>
                            {this.rowGen(
                                12,
                                12,
                                "pick_date",
                                "Pick Delivery Date",
                                "datetime-local",
                                "2017-05-24T10:30"
                            )}
                        </Grid>
                    </Grid>
                    <div className="color" style={{ marginLeft: 20, marginTop: -5 }}>
                        {/* {this.state.delivery_address
                            ? this.state.form.street_address_2
                            : this.state.form.street_address} */}
                        {/* <span style={{ marginLeft: 200 }}><a href="">EDIT</a></span> */}
                        <span><a href="">EDIT</a></span>
                    </div>
                </Grid>
            </div >
        );
    };

    onChangeComment = (name, value) => this.setState({ [name]: value });

    DeliveryInstruction = () => {
        return (
            <div style={{ paddingTop: 30, flexGrow: 1, paddingBottom: 50 }}>
                <Grid container>
                    <h3 className="color">Collection Instructions</h3>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <FormInput
                                name="delivery_instructions"
                                onChange={this.onChangeComment}
                                value={this.state.delivery_instructions}
                                multiline
                            />
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <div style={{ float: "right", paddingTop: 90 }}>
                                <BTN
                                    title="NEXT"
                                    type="primary yamaha-btn-md float-right"
                                    onClick={this.onSubmit}
                                // link="/cart/delivery/additional-info"
                                />
                            </div>
                        </Grid> */}
                    </Grid>
                </Grid>
            </div >
        );
    }

    handleChange = (name) => (event) => {
        this.setState({ accept_tcs: event.target.checked });
    };

    ReturnTerms = () => {
        return (
            <Grid
                item
                md={12}
                xs={12}
                style={{ marginBottom: 10 }}
            >
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        <div className="form-labels">
                            I hereby confirm that the item(s) being returned including all product accessories and or manuals, will be in their original packaging.
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
                                    I confirm the above requirements.
                                </Typography>
                            }
                        />
                    </FormGroup>
                </FormControl>
            </Grid>
        );
    };

    BadgeWarning = () => {
        return (
            <Grid container>
                <Grid item xs={12} md={10} style={{ marginTop: 30 }}>
                    <Alerts
                        header="You will bear the cost of returning the product to Yamaha via the elected courier within the 7 day cooling off period."
                        paragraph1="After the 7 day cooling off period, the return transportation cost will be assessed against ther related product warranty policy."
                        paragraph2="Should there be no fault found with the product after assessment by Yamaha, related transportation costs will be billed to the customer."
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <div style={{ float: "right", paddingTop: 60 }}>
                        <Button
                            title="Confirm Return"
                            type="primary yamaha-btn-md float-right"
                            link="/account/order/return summary"
                        />
                    </div>
                </Grid>
            </Grid>
        )
    }

    /*
    
    You will bear the cost of returning the product to the dealer
within both the 7 day cooling off period, after the 7 day cooling off period transportation cost forms part of the warranty process for which the customer is liable

    */

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
                />
                <div className="generic-container">
                    <this.TopHeader />
                    <this.Delivery />
                    <this.DeliveryInstruction />
                    <this.ReturnTerms />
                    <this.BadgeWarning />
                </div>
                <Footer fixed mainFooter />
            </div>
        );
    }
}