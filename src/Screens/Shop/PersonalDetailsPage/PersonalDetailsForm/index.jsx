import React from "react";
import { Grid } from "@material-ui/core";
import { Form as FC, Button } from "components";
//import * as Yup from "yup";
import "../../RegisterPage/register.css";

// Class structure for LoginForm
const PersonalDetailsForm = ({
    type,
    onChange,
    onChangeHandler,
    states,
    onFormSubmit,
    buttonName,
    buttonName2,
    isChecked,
    setFieldValue,
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
                    <Grid item xs={12} sm={3}>
                        {rowGen(12, 12, "phone", "Phone", 'number')}
                    </Grid>

                </Grid>

                <Grid container>
                    <Grid item xs={12} sm={3}>
                        {rowGen(12, 12, "email", "Email", 'email')}
                    </Grid>
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
                        <FC.FormCheckboxes
                            //values={values}
                            label="What other products are you interested in?"
                            // helperText={errors.other_products}
                            // {...field}
                            name="fields"
                            items={states.yamahaProducts}
                            onChange={(k, v, index) => {
                                setFieldValue(k, v, index);
                                // onChange(k, v);
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: 15 }}>
                    <Grid item xs={12} sm={12}>
                        <Button
                            type="primary yamaha-btn-lg"
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

export default PersonalDetailsForm;
