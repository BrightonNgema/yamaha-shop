import React from "react";
import { Grid } from "@material-ui/core";
import { Form, Button } from "components";
import Loader from "react-loader-spinner";
import { colors } from "theme";
import { FormDropdown } from "components/Form";
const ContactForm = ({
    buttonType,
    onChangeHandler,
    state,
    formHandler,
    onCancel
}) => {
    return (
        <div style={{ paddingTop: 30, flexGrow: 1 }}>
            <Grid container spacing={10}>
                <Grid item xs={12} sm={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Form.FormInput
                                className="contact-input"
                                label="Name & Surname"
                                name="fullname"
                                onChange={onChangeHandler}
                                value={state.fullname}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Form.FormInput
                                className="contact-input"
                                type="tel"
                                name="phone"
                                label="Phone Number"
                                onChange={onChangeHandler}
                                value={state.phone}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Form.FormInput
                                className="contact-input"
                                type="email"
                                name="email"
                                label="Email"
                                onChange={onChangeHandler}
                                value={state.email}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ marginTop: -20 }}>
                            <Form.FormInput
                                className="contact-input"
                                label="City you are based"
                                name="city"
                                onChange={onChangeHandler}
                                value={state.city}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ marginTop: -20 }}>
                            <FormDropdown
                                placeholer="Province"
                                name="province"
                                options={[
                                    "Eastern Cape",
                                    "Free State",
                                    "Gauteng",
                                    "KwaZulu Natal",
                                    "Limpopo",
                                    "Mpumalanga",
                                    "North West",
                                    "Northern Cape",
                                    "Western Cape",
                                ]}
                                label="Province"
                                value={state.province}
                                onChange={(k, v) => {
                                    onChangeHandler(k, v);
                                }}
                            />
                        </Grid>

                        {/* <Form.Address
                            value={state.address}
                            addressPick={onChangeHandler}
                        /> */}
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Form.FormInput
                            label="Your Comments..."
                            name="comments"
                            onChange={onChangeHandler}
                            value={state.comments}
                            multiline
                        />
                    </Grid>
                    <Grid style={{ marginTop: 15, marginLeft: 5 }}>
                        {state.loading ? (
                            <Loader
                                type="RevolvingDot"
                                color={colors.primary}
                                height={25}
                                width={25}
                            />
                        ) : (
                                <Button
                                    type={buttonType}
                                    title="Contact Me"
                                    onClick={formHandler}
                                />
                            )}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default ContactForm;
