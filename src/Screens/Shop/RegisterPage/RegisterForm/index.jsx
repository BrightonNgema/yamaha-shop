import React from "react";
import { Grid } from "@material-ui/core";
import { Form as FC, Button } from "components";
//import * as Yup from "yup";
import "../register.css";

const yamahaProducts = [
    {
        label: "Audio Visual Products",
        key: "audio_visual_products",
    },
    {
        label: "Motorcycle/ATV Products",
        key: "motorcycle_atv_products",
    },
    {
        label: "Power Products",
        key: "power_products",
    },
    {
        label: "Music Products",
        key: "music_products",
    },
    {
        label: "Pro Audio Products",
        key: "pro_audio_products",
    },
];

// Class structure for LoginForm
const RegisterForm = ({
    type,
    onChange,
    onChangeHandler,
    states,
    onFormSubmit,
    buttonName,
    buttonName2, disableSubmit,
    props
}) => {
    /* Added type */
    const rowGen = (itemSizeMd, itemSizeSm, keyItem, name, type) => {
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
                    helperText={states.errors[keyItem]}
                    onChange={(key, value) => {

                        onChangeHandler(key, value);
                    }}
                    value={states.form[keyItem]}
                ></FC.FormInput>
            </Grid>
        );
    };

    return (
        <div style={{ paddingTop: 30, flexGrow: 1 }}>
            <Grid container>
                <Grid container>
                    <Grid item xs={12} sm={3}>
                        {rowGen(12, 12, "name", "Name", 'text')}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        {rowGen(12, 12, "surname", "Surname", 'text')}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        {rowGen(12, 12, "phone", "Phone", 'number')}
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} sm={3}>
                        {rowGen(12, 12, "email", "Email", 'email')}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        {rowGen(12, 12, "retype_email", "Retype E-mail", 'email')}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        {rowGen(12, 12, "password", "Password", 'password')}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        {rowGen(12, 12, "c_password", "Retype Password", 'password')}
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item><span className="contact-subheading">
                        Register Business Information:
                    </span></Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={3}>
                        {rowGen(
                            12,
                            12,
                            "company",
                            "Business Name",
                            'text'
                        )}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        {rowGen(
                            12,
                            12,
                            "tax_number",
                            "Business Tax Number",
                            'number'
                        )}
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: 0 }}>
                    <Grid item xs={12} sm={12}>
                        <FC.CheckboxList
                            //values={values}
                            label="What other products are you interested in?"
                            // helperText={errors.other_products}
                            // {...field}
                            name="fields"
                            items={yamahaProducts}
                            onChange={(k, v) => {
                                // setFieldValue(k, v);
                                onChange(k, v);
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <div className="input-container">


                            <FC.Checkbox
                                name="promotional"
                                checked={states.form.promotional}
                                onChange={(k, v) => {
                                    onChangeHandler(k, v)
                                }}
                                label="I agree to receive future marketing communication from Yamaha South Africa including but not limited to promotional offers, events and news bulletins."
                            ></FC.Checkbox>
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: 15 }}>
                    <Grid item xs={12} sm={12}>
                        <Button
                            type={disableSubmit ? 'disabled yamaha-btn-lg' : 'primary yamaha-btn-lg'}
                            title={buttonName}
                            onClick={onFormSubmit}
                        />
                        <span style={{ marginLeft: 30 }}></span>
                        {buttonName2 === '' ?
                            <></> :
                            <Button
                                type="secondary yamaha-btn-lg"
                                title={buttonName2}
                            // onClick={onFormSubmit}
                            />
                        }

                        <Button
                            type="primary yamaha-btn-lg"
                            title="Back"
                            onClick={() => props.history.goBack()}
                        />

                    </Grid>
                </Grid>

            </Grid>
        </div>
    );
};

export default RegisterForm;
