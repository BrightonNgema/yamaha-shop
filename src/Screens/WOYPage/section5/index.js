import React,  {Component} from "react";
import { Grid } from "@material-ui/core";
import { YamahaMap, Form, Button } from "components";
import { colors } from "theme";
import { isMobile } from "react-device-detect";
import Loader from "react-loader-spinner";
import Toastr from "components/Toastr";
const axios = require("axios");


const styles = {
    heading: {
        fontSize: "2.2rem",
        fontFamily: "rift",
        fontWeight: "bold",
        color: "#1e1e1e"
    }
};
const defaultState = {
    fullname: "",
    phone: "",
    email: "",
    comments: "",
    checked:""
};
export default class Section5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...defaultState,
            loading: false,
            open:false
        };
    }

    onChangeHandler = (name, value) => this.setState({ [name]: value });
    formHandler = () => {
        const baseUrl = process.env.REACT_APP_API_URL;
        const { fullname, phone, email, address, comments } = this.state;
        this.setState({ loading: true });
        axios
            .post(baseUrl + "world-contact", {
                fullname: fullname,
                phone: phone,
                email: email,
                address: address,
                comments: comments,
                service:this.state.checked
            })
            .then(response => {
                const {
                    data: { message }
                } = response;
                this.setState({
                    ...defaultState,
                    message,
                    loading: false,
                    open: true
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    ...defaultState
                });
            });
    };

    onCheck = value => {
        this.onChangeHandler("checked", value);
    };

    render() {
        const { fullname, phone, email, comments, checked } = this.state;        
        return (
            <div id="contact">
                <Toastr
                    open={this.state.open}
                    message={this.state.message}
                    onClose={() => this.setState({ open: false })}
                />
                <div
                    style={{
                        backgroundColor: "#fff",
                        padding: "10px 0px 60px",
                        marginTop: 0
                    }}
                >
                    <Grid item xs={11} md={11} style={{ margin: "auto" }}>
                        <p style={styles.heading}>CONTACT US</p>
                        <p
                            style={{
                                marginTop: 0,
                                color: "#1e1e1e",
                                textTransform: "initial"
                            }}
                        >
                         
                            Fill in the details below and we’ll get in contact
                            within 24 hours. You can also contact us directly at{" "}
                            <a
                                alt="fds"
                                href="nn"
                                style={{
                                    color: colors.primary,
                                    textDecoration: "none"
                                }}
                            >
                                011 259 7850.
                            </a>
                        </p>
                    </Grid>
                    <Grid
                        item
                        xs={11}
                        sm={11}
                        md={11}
                        lg={11}
                        style={{ margin: "30px auto" }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Form.FormInput
                                            className="contact-input"
                                            name="fullname"
                                            label="Name & Surname"
                                            onChange={this.onChangeHandler}
                                            value={fullname}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Form.FormInput
                                            className="contact-input"
                                            type="tel"
                                            name="phone"
                                            label="Phone Number"
                                            onChange={this.onChangeHandler}
                                            value={phone}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Form.FormInput
                                            className="contact-input"
                                            type="email"
                                            name="email"
                                            label="Email"
                                            onChange={this.onChangeHandler}
                                            value={email}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        md={12}
                                        style={{ margin: "auto", marginLeft: 5 }}
                                    >
                                        <p
                                            style={{
                                                color: "#1e1e1e",
                                                fontWeight: "500"
                                            }}
                                        >
                                            What service are you looking for?
                                        </p>
                                        <Grid container>
                                            <Grid item xs={12} md={8}>
                                                <Form.RadioButton
                                                    label="Boardroom & Video Conferencing Facilities"
                                                    selectedValue={checked}
                                                    handleChange={this.onCheck}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <Form.RadioButton
                                                    label="Catering"
                                                    selectedValue={checked}
                                                    handleChange={this.onCheck}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <Form.RadioButton
                                                    label="Audio, Visual & Stage Lighting Support"
                                                    selectedValue={checked}
                                                    handleChange={this.onCheck}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <Form.RadioButton
                                                    label="Showroom"
                                                    selectedValue={checked}
                                                    handleChange={this.onCheck}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <Form.RadioButton
                                                    label="Theatre"
                                                    selectedValue={checked}
                                                    handleChange={this.onCheck}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <Form.RadioButton
                                                    label="Lounge Areas"
                                                    selectedValue={checked}
                                                    handleChange={this.onCheck}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Form.FormInput
                                            label="Your Comments..."
                                            name="comments"
                                            onChange={this.onChangeHandler}
                                            value={comments}
                                            multiline
                                        />
                                    </Grid>
                                    <Grid style={{ marginLeft: 10, marginTop: 20 }}>
                                        
                                        {this.state.loading ? (
                                            <Loader
                                                type="RevolvingDot"
                                                color={colors.primary}
                                                height={25}
                                                width={25}
                                            />
                                        ) : (
                                                <Button
                                                    type="yamaha-btn-xs yamaha-btn-primary"
                                                    title="CONTACT ME ABOUT MY BOOKING"
                                                    onClick={this.formHandler}
                                                />
                                            )}
                                    </Grid>
                                </Grid>
                            </Grid>
                            {!isMobile && (
                                <Grid item xs={12} md={6} style={{ marginTop: 15 }}>
                                    <YamahaMap className="woy" />
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </div>
                {isMobile && <YamahaMap className="woy" />}
            </div>
        );
    }
};
