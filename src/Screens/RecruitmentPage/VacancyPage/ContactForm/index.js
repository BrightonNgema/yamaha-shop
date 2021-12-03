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
    const inputValid =
        fullnamevalid && emailvalid && phonenumbervalid 
    const buttonType = inputValid ? "primary" : "disabled";

    return (
        <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ margin: "auto" }}
            id="about-contact-form"
        >
            <Grid container spacing={3}>
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
                                SEND US YOUR CV
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
                                confidential. We will not distribute the information
                                that you provide to us to any other source for
                                solicitation or other purposes.
                            </span>
                        </div>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={3}>
                            <Form.FormInput
                            label="Name & Surname"
                            name="fullname"
                            onChange={onChangeHandler}
                            value={state.fullname}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                        <Form.FormInput label="E-mail" name="email" onChange={onChangeHandler}
                            value={state.email}/>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Form.FormInput
                                label="Phone number"
                                name="phone"
                            onChange={onChangeHandler} 
                            value={state.phone}

                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Form.FileUpload label="Upload CV " name="cv" onChange={onChangeHandler} />
                        </Grid>
                        <Grid item xs={12}>
                            <Form.FormInput
                                label="Type your cover letter..."
                                name="cover_letter"
                                fullWidth
                                multiline
                                rows={3}
                            onChange={onChangeHandler} 
                            value={state.cover_letter}

                            />
                        </Grid>
                    </Grid>
                    <Grid style={{ marginTop: 15, marginLeft: 5 }}>
                    {state.button_loading ? (
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
    );
};

export default ContactForm;
