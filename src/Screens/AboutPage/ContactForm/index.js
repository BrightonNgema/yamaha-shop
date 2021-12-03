import React from "react";
import { Grid } from "@material-ui/core";
import { Form, Button } from "components";
import Loader from "react-loader-spinner";
import { colors, regex } from "theme";
const ContactForm = ({
    onChangeHandler,
    state,
    formHandler,
    onCancel,
    activeData
}) => {
    const fullnamevalid = regex.fullname.test(state.fullname);
    const emailvalid = regex.email.test(state.email);
    const phonenumbervalid = regex.cellnumber.test(state.phone);
    const inputValid = fullnamevalid && emailvalid && phonenumbervalid;
    const buttonType = inputValid ? "primary" : "disabled";
    let title =
        activeData.title.toLowerCase() === "3000hr club"
            ? "Share Your Yamaha Outboard Story"
            : activeData.title.toLowerCase() ===
              "mobile servicing & tech support"
            ? "Contact us for more information"
            : `Join ${activeData.title}`;

    if (
        activeData.title.toLowerCase() === "yamaha" ||
        activeData.title.toLowerCase() === "racing" ||
        activeData.title.toLowerCase() === "club yamaha"
    )
        return null;
    return (
        <Grid
            item
            xs={11}
            sm={11}
            md={11}
            lg={11}
            style={{ margin: "auto" }}
            id="about-contact-form"
        >
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div>
                            <p
                                style={{
                                    marginTop: 30,
                                    marginBottom: 10,
                                    fontSize: "2.2rem",
                                    fontFamily: "rift",
                                    fontWeight: "bold",
                                    color: "#1E1E1E"
                                }}
                            >
                                {title}
                            </p>
                            <span
                                style={{
                                    fontSize: "1rem",
                                    color: "#56585A",
                                    textTransform: "initial",
                                    marginBottom: 30
                                }}
                            >
                                Your contact information is kept strictly
                                confidential. One of our {activeData.title}{" "}
                                representatives will contact you within 48
                                hours.
                            </span>
                        </div>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Form.FormInput
                                className="contact-input"
                                label="Name & Surname"
                                name="fullname"
                                onChange={onChangeHandler}
                                value={state.fullname}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <Form.FormInput
                                className="contact-input"
                                type="email"
                                name="email"
                                label="Email"
                                onChange={onChangeHandler}
                                value={state.email}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <Form.FormInput
                                className="contact-input"
                                type="tel"
                                name="phone"
                                label="Phone Number"
                                onChange={onChangeHandler}
                                value={state.phone}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Form.FormInput
                            label="Your Comments..."
                            name="comments"
                            onChange={onChangeHandler}
                            value={state.comments}
                            multiline
                        />
                    </Grid>
                    <Grid style={{ marginTop: 15, marginLeft: 5 }}>
                        {state.buttonloading ? (
                            <Loader
                                type="RevolvingDot"
                                color={colors.primary}
                                height={25}
                                width={25}
                            />
                        ) : (
                            <Button
                                type={buttonType}
                                title="SUBMIT"
                                onClick={formHandler}
                            />
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ContactForm;
