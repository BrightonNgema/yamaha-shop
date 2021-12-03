/*
  @desc: this is a section meant to be rendered in a Formik form.
  Formiks renderProps will be passed as the props to this function.
*/
import React from "react";
import { Field } from "formik";
import { Form as FC } from "components";
import { Grid } from "@material-ui/core";

export default function ProductExtended({ setFieldValue, onChange, type }) {
    return (
        <Grid container item xs={12}>
            {/* Marine */}
            {type === "marine" && (
                <Grid item xs={12}>
                    <Field
                        id="outboard_motor_1"
                        name="outboard_motor_1"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    name={field.name}
                                    label="Outboard motor 1"
                                    helperText={errors.outboard_motor_1}
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
            {type === "marine" && (
                <Grid item xs={12}>
                    <Field
                        id="outboard_motor_1_new_used"
                        name="outboard_motor_1_new_used"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormDropdown
                                    placeholer="Outboard 1 - New or used"
                                    name={field.name}
                                    options={["New", "Used"]}
                                    label="Outboard 1 - New or used"
                                    helperText={
                                        errors.outboard_motor_1_new_used
                                    }
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
            {type === "marine" && (
                <Grid item xs={12}>
                    <Field
                        id="outboard_motor_1"
                        name="outboard_motor_1_serial_number"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    name={field.name}
                                    label="Outboard motor 1 - Serial Number"
                                    helperText={errors.outboard_motor_1}
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
            {type === "marine" && (
                <Grid item xs={12}>
                    <Field
                        id="outboard_motor_2"
                        name="outboard_motor_2"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    name={field.name}
                                    label="Outboard motor 2"
                                    helperText={errors.outboard_motor_2}
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
            {type === "marine" && (
                <Grid item xs={12}>
                    <Field
                        id="outboard_motor_2_new_used"
                        name="outboard_motor_2_new_used"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormDropdown
                                    placeholer="Outboard 2 - New or used"
                                    name={field.name}
                                    options={["New", "Used"]}
                                    label="Outboard 2 - New or used"
                                    helperText={
                                        errors.outboard_motor_2_new_used
                                    }
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
            {type === "marine" && (
                <Grid item xs={12}>
                    <Field
                        id="outboard_motor_2"
                        name="outboard_motor_2_serial_number"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    name={field.name}
                                    label="Outboard motor 2 - Serial Number"
                                    helperText={errors.outboard_motor_2}
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
            {type === "marine" && (
                <Grid item xs={12}>
                    <Field
                        id="outboard_motor_3"
                        name="outboard_motor_3"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    name={field.name}
                                    label="Outboard motor 3"
                                    helperText={errors.outboard_motor_3}
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
            {type === "marine" && (
                <Grid item xs={12}>
                    <Field
                        id="outboard_motor_3_new_used"
                        name="outboard_motor_3_new_used"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormDropdown
                                    placeholer="Outboard 3 - New or used"
                                    name={field.name}
                                    options={["New", "Used"]}
                                    label="Outboard 3 - New or used"
                                    helperText={
                                        errors.outboard_motor_3_new_used
                                    }
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
            {type === "marine" && (
                <Grid item xs={12}>
                    <Field
                        id="outboard_motor_3"
                        name="outboard_motor_3_serial_number"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    name={field.name}
                                    label="Outboard motor 3 - Serial Number"
                                    helperText={errors.outboard_motor_3}
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
            {type === "marine" && (
                <Grid item xs={12}>
                    <Field
                        id="outboard_motor_4"
                        name="outboard_motor_4"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    name={field.name}
                                    label="Outboard motor 4"
                                    helperText={errors.outboard_motor_4}
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
            {type === "marine" && (
                <Grid item xs={12}>
                    <Field
                        id="outboard_motor_4_new_used"
                        name="outboard_motor_4_new_used"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormDropdown
                                    placeholer="Outboard 4 - New or used"
                                    name={field.name}
                                    options={["New", "Used"]}
                                    label="Outboard 4 - New or used"
                                    helperText={
                                        errors.outboard_motor_4_new_used
                                    }
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
            {type === "marine" && (
                <Grid item xs={12}>
                    <Field
                        id="outboard_motor_4"
                        name="outboard_motor_4_serial_number"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    name={field.name}
                                    label="Outboard motor 4 - Serial Number"
                                    helperText={errors.outboard_motor_4}
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
            {/* Marine */}
            {/* Pro Audio */}

            {/* {type === "pro_audio" && (
                <Grid item xs={12}>
                    <Field
                        id="model_number_1"
                        name="model_number_1"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    name={field.name}
                                    label="Model Number 1"
                                    helperText={errors.model_number_1}
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
            )} */}
            {/* {type === "pro_audio" && (
                <Grid item xs={12}>
                    <Field
                        id="model_number_1_serial_number"
                        name="model_number_1_serial_number"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormDropdown
                                    placeholer="Model 1 Serial Number"
                                    name={field.name}
                                    options={["New", "Used"]}
                                    label="Model 1 Serial Number"
                                    helperText={
                                        errors.model_number_1_serial_number
                                    }
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
            )} */}
            {type === "pro_audio" && (
                <Grid item xs={12}>
                    <Field
                        id="model_number_2"
                        name="model_number_2"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    name={field.name}
                                    label="Model Number 2"
                                    helperText={errors.model_number_2}
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
            {type === "pro_audio" && (
                <Grid item xs={12}>
                    <Field
                        id="model_number_2_serial_number"
                        name="model_number_2_serial_number"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    placeholer="Model 2 Serial Number"
                                    label="Model 2 Serial Number"
                                    helperText={
                                        errors.model_number_2_serial_number
                                    }
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
            {type === "pro_audio" && (
                <Grid item xs={12}>
                    <Field
                        id="model_number_3"
                        name="model_number_3"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    name={field.name}
                                    label="Model Number 3"
                                    helperText={errors.model_number_3}
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
            {type === "pro_audio" && (
                <Grid item xs={12}>
                    <Field
                        id="model_number_3_serial_number"
                        name="model_number_3_serial_number"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    placeholer="Model 3 Serial Number"
                                    label="Model 3 Serial Number"
                                    helperText={
                                        errors.model_number_3_serial_number
                                    }
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
            {type === "pro_audio" && (
                <Grid item xs={12}>
                    <Field
                        id="model_number_4"
                        name="model_number_4"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    name={field.name}
                                    label="Model Number 4"
                                    helperText={errors.model_number_4}
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
            {type === "pro_audio" && (
                <Grid item xs={12}>
                    <Field
                        id="model_number_4_serial_number"
                        name="model_number_4_serial_number"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    placeholer="Model 4 Serial Number"
                                    label="Model 4 Serial Number"
                                    helperText={
                                        errors.model_number_2_serial_number
                                    }
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
            {type === "pro_audio" && (
                <Grid item xs={12}>
                    <Field
                        id="model_number_5"
                        name="model_number_5"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    name={field.name}
                                    label="Model Number 5"
                                    helperText={errors.model_number_5}
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
            {type === "pro_audio" && (
                <Grid item xs={12}>
                    <Field
                        id="model_number_5_serial_number"
                        name="model_number_5_serial_number"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    placeholer="Model 5 Serial Number"
                                    label="Model 5 Serial Number"
                                    helperText={
                                        errors.model_number_5_serial_number
                                    }
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
            {/* Pro Audio */}
        </Grid>
    );
}
