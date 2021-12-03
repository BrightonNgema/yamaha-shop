/*
  @desc: this is a section meant to be rendered in a Formik form.
  Formiks renderProps will be passed as the props to this function.
*/
import React from "react";
import { Field } from "formik";
import { Form as FC } from "components";
import { Grid } from "@material-ui/core";
import * as yup from "yup";

const otherYamahaProducts = [
    {
        label: "Marine",
        key: "marine"
    },
    {
        label: "Motorcycles",
        key: "motorcycles"
    },
    {
        label: "Power Products",
        key: "power_products"
    },
    {
        label: "Golf Cars",
        key: "golf_cars"
    },
    {
        label: "Home Audio",
        key: "home_audio"
    },
    {
        label: "Music",
        key: "music"
    },
    {
        label: "Pro Audio",
        key: "pro_audio"
    }
];

export default function DemographicsTwo({ setFieldValue, onChange, type }) {
    return (
        <Grid container item xs={12}>
            <Grid item>
                <Field
                    id="marketing_opt_in"
                    name="marketing_opt_in"
                    type="text"
                    render={({ field, form: { values, touched, errors } }) => {
                        // console.log("values", values);
                        return (
                            <FC.Checkbox
                                values={values}
                                checked={
                                    typeof values.marketing_opt_in !==
                                    "undefined"
                                        ? values.marketing_opt_in
                                        : true
                                }
                                label="Send me information pertaining to future product launches and events."
                                helperText={errors.marketing_opt_in}
                                {...field}
                                onChange={(k, v) => {
                                    setFieldValue(k, v);
                                    onChange(k, v);
                                }}
                            />
                        );
                    }}
                />
            </Grid>
            
 
            {type.includes("home") && (
                <Grid item xs={12}>
                    <Field
                        id="musiccast_owned"
                        name="musiccast_owned"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.Checkbox
                                    name={field.name}
                                    label="Do you own any Musiccast products?"
                                    helperText={errors.musiccast_owned}
                                    {...field}
                                    onChange={(k, v) => {
                                        setFieldValue(k, v);
                                        onChange(k, v);
                                    }}
                                />
                            );
                        }}
                    />
                </Grid>
            )}
            {type.includes("home") && (
                <Grid item xs={12}>
                    <Field
                        id="soundbar_owned"
                        name="soundbar_owned"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.Checkbox
                                    name={field.name}
                                    label="Do you own a soundbar?"
                                    helperText={errors.soundbar_owned}
                                    {...field}
                                    onChange={(k, v) => {
                                        setFieldValue(k, v);
                                        onChange(k, v);
                                    }}
                                />
                            );
                        }}
                    />
                </Grid>
            )}
            <Grid item xs={12}>
                <Field
                    id="other_products"
                    name="other_products"
                    type="text"
                    render={({ field, form: { values, touched, errors } }) => {
                        return (
                            <FC.CheckboxList
                                values={values}
                                label="Do you own any other Yamaha products?"
                                helperText={errors.other_products}
                                {...field}
                                items={otherYamahaProducts.filter(
                                    yp => yp.key !== type
                                )}
                                onChange={(k, v) => {
                                    setFieldValue(k, v);
                                    onChange(k, v);
                                }}
                            />
                        );
                    }}
                />
            </Grid>
        </Grid>
    );
}

export const DemographicsTwoValidationSchema = ({ type }) => ({
    other_products: yup.mixed(),
    musiccast_owned: yup.bool(),
    soundbar_owned: yup.bool(),
    marketing_opt_in: yup.bool()
});
