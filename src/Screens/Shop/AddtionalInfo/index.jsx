import React, { Component } from "react";
import { NavBar, Footer, Button, Toastr } from "components";
import { colors } from "theme";
import { isIE } from "react-device-detect";
import { Grid } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import "./additional-info.css";
import { connect } from 'react-redux';
import { addAdditionalInfo } from '../../../Redux/Actions/cart';
// import "../../../../Assets/styles/global.css";

class HomeAudio extends Component {
    state = {
        professtional_installer: "Authorised Installer",
  
        visit_dealer: "Yes",
        accept_tcs: false,
        further_details: "Yes",
    };

    TopHeader = () => {
        return (
            <Grid container style={{ position: "relative", marginBottom: 40 }}>
                <Grid item xs={12} sm={12}>
                    <h2 className="contact-heading">Additional Information</h2>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <div style={{ color: "#56585A", marginTop: -30 }}>
                        We need a bit more information for some of the products
                        in your cart before we can finalise the order, please
                        complete the options below.
                    </div>
                </Grid>
            </Grid>
        );
    };

    genQuestions(data) {
        return (
            <div className="max-width-modal">

                <this.TopHeader />
                <Grid item md={12} xs={12} style={{ marginTop: 20 }}>
                    <FormControl component="fieldset">

                        {data.map((val) => (
                            <>
                                <FormLabel component="legend">
                                    <div className="form-labels">{val.text}</div>
                                </FormLabel>
                                {val.type == 'radio' ?
                                    <>
                                        <RadioGroup
                                            style={{ marginTop: 10 }}
                                            row
                                            aria-label="position"
                                            name={val.name}
                                            defaultValue="top"
                                            value={val.answer}
                                            onChange={(e) => this.handleRadio(e, val.name)}
                                        >
                                            {val.options.map((option) => (
                                                <>
                                                    <FormControlLabel
                                                        value={option.value}
                                                        control={<Radio color="default" />}
                                                        label={
                                                            <Typography className="labels-color">
                                                                {option.label}
                                                            </Typography>
                                                        }
                                                    />
                                                </>
                                            ))}

                                        </RadioGroup>
                                    </>
                                    :
                                    <></>
                                }
                            </>
                        ))}
                    </FormControl>
                </Grid>
            </div>
        )
    }


    Questions = ({
        question,
        rValue,
        fValue1,
        fValue2,
        fLabel1,
        FLabel2,
        name,
    }) => {
        return (
            <Grid item md={12} xs={12} style={{ marginTop: 20 }}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        <div className="form-labels">{question}</div>
                    </FormLabel>
                    <RadioGroup
                        style={{ marginTop: 10 }}
                        row
                        aria-label="position"
                        name={name}
                        defaultValue="top"
                        value={rValue}
                        onChange={(e) => this.handleRadio(e, name)}
                    >
                        <FormControlLabel
                            value={fValue1}
                            control={<Radio color="default" />}
                            label={
                                <Typography className="labels-color">
                                    {fLabel1}
                                </Typography>
                            }
                        />
                        <FormControlLabel
                            value={fValue2}
                            control={<Radio color="default" />}
                            label={
                                <Typography className="labels-color">
                                    {FLabel2}
                                </Typography>
                            }
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
        );
    };

    handleRadio(e, name) {
        this.setState({ ...this.state, [name]: e.target.value });
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
                style={{ marginTop: 20, marginBottom: 10 }}
            >
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        <div className="form-labels">
                            Have you read and agreed to the terms and conditions
                            regarding our{" "}
                            <a className="return-color" href="">
                                return policy
                            </a>
                            ?
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
                                    I confirm that I have read the return
                                    policy.
                                </Typography>
                            }
                        />
                    </FormGroup>
                </FormControl>
            </Grid>
        );
    };

    onSubmit = () => {
        
    }

    BottomButton = () => {
        let buttonType = this.state.accept_tcs ?
            "primary yamaha-btn-md float-right-btn"
            : "disabled yamaha-btn-md float-right-btn";

        return (
            <Grid container spacing={3} style={{ marginTop: 20 }}>
                <Grid item xs={12} sm={12}>
                    <div className="additional-info">
                        <span style={{}}>
                            *Additional 3rd party charges will apply
                        </span>
                        <Button
                            type={buttonType}
                            title="Pay Now"
                            onClick={() => this.props.onSubmit(this.state)}
                        />

                    </div>
                </Grid>
            </Grid>
        );
    };

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
            <div className="max-width-modal">

                <this.TopHeader />
                <this.Questions
                    question="Will you require this product to be fully installed by a professional authorised Yamaha installer* or will you install yourself?"
                    rValue={this.state.professtional_installer}
                    name="professtional_installer"
                    fValue1="Authorised Installer"
                    fValue2="I will install myself"
                    fLabel1="Authorised Installer"
                    FLabel2="I will install myself"
                />
                <this.Questions
                    question="Will you require telephonic assistance in setting up the product parameters?"
                    rValue={this.state.phone_assistance}
                    name="phone_assistance"
                    fValue1="Yes"
                    fValue2="No"
                    fLabel1="Yes"
                    FLabel2="No"
                />
                <this.Questions
                    question="Did you visit a Yamaha dealership to audition the product prior to making your purchase decision at Yamaha Online?"
                    rValue={this.state.visit_dealer}
                    name="visit_dealer"
                    fValue1="Yes"
                    fValue2="No"
                    fLabel1="Yes"
                    FLabel2="No"
                />
                <this.ReturnTerms />
                <this.Questions
                    question="Would you like to received further details on the FREE training programmes?"
                    rValue={this.state.further_details}
                    name="further_details"
                    fValue1="Yes"
                    fValue2="No"
                    fLabel1="Yes"
                    FLabel2="No"
                />

                <this.BottomButton />
            </div>
        );
    }
}

export default connect()(HomeAudio);