/*
  @desc: this is a section meant to be rendered in a Formik form.
  Formiks renderProps will be passed as the props to this function.
*/
import React, { Fragment } from "react";
import { Field } from "formik";
import { Form as FC } from "components";
import { Grid } from "@material-ui/core";
import * as yup from "yup";

const marineProductTypes = [
    {
        text: "Boat",
        value: "boat"
    },
    {
        text: "Outboard Motor",
        value: "outboard_motor"
    },
    {
        text: "Waverunner",
        value: "waverunner"
    }
];

const powerProductTypes = [
    {
        text: "Lawn Mower",
        value: "lawn_mower"
    },
    {
        text: "Engine",
        value: "engine"
    },
    {
        text: "Water Pump",
        value: "water_pump"
    },
    "Other"
];

const getProductTypes = type => {
    switch (type) {
        case "marine":
            return marineProductTypes;
        case "power_products":
            return powerProductTypes;
        default:
            return [];
    }
};

const getMakeModelDescription = type => {
    switch (type) {
        case "marine":
            return `Boat type & size`;
        case "power_products":
            return `Yamaha Engine Number`;
        default:
            return `Model Number`;
    }
};

const getSerialDescription = type => {
    switch (type) {
        case "marine":
            return `Engine Serial Prefix`;
        case "motorcycles":
            return `VIN Number`;
        case "golf_cars":
            return `Car Serial Number`;
        default:
            return `Serial Number`;
    }
};
export default function Product({ setFieldValue, onChange, type }) {
    const productTypes = getProductTypes(type);
    const isMusic = type.includes("audio") || type.includes("music") ;
    return (
        <Grid container item xs={12}>
            <Grid container item xs={12}>
                {productTypes.length > 0 ? (
                    <Grid item xs={12} sm={6}>
                        <Field
                            id="product_purchased"
                            name="product_purchased"
                            type="text"
                            render={({
                                field,
                                form: { values, touched, errors }
                            }) => {
                                return (
                                    <FC.FormDropdown
                                        placeholer="Product purchased"
                                        name={field.name}
                                        options={getProductTypes(type)}
                                        label="Product purchased"
                                        helperText={errors.product_purchased}
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
                ) : null}
                <Grid item xs={12} sm={productTypes.length === 0 ? 12 : 6}>
                    <Field
                        id="new_used"
                        name="new_used"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <Fragment>
                                <FC.FormDropdown
                                    placeholer="New or Used"
                                    name={field.name}
                                    options={
                                        isMusic ? ["New"] : ["New", "Used"]
                                    }
                                    label="New or Used"
                                    helperText={errors.new_used}
                                    {...field}
                                    onChange={(k, v) => {
                                        setFieldValue(k, v);
                                        onChange(k, v);
                                    }}
                                    
                                    />
                                    {values.new_used ==="Used" && (<div style={{ marginLeft: 10, marginTop: 10, color: 'red' }}>
                                        Please note that standard Yamaha Factory warranty could be expired
                                    </div>)}
                                </Fragment>
                            );
                        }}
                    />
                   
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Field
                    id="model_description"
                    name="model_description"
                    type="text"
                    render={({ field, form: { values, touched, errors } }) => {
                        return (
                            <FC.FormInput
                                name={field.name}
                                label={
                                    type !== "power_products"
                                        ? "Model Description"
                                        : "Model Description and Model Number"
                                }
                                helperText={errors.model_description}
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
            {type === "marine" && (
                <Grid item xs={12}>
                    <Field
                        id="boat_jetski_serial_number"
                        name="boat_jetski_serial_number"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    name={field.name}
                                    label="Boat or Waverunner serial number"
                                    helperText={
                                        errors.boat_jetski_serial_number
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
            <Grid item xs={12}>
                <Field
                    id="make_model_description"
                    name="make_model_description"
                    type="text"
                    render={({ field, form: { values, touched, errors } }) => {
                        return (
                            <FC.FormInput
                                name={field.name}
                                label={getMakeModelDescription(type)}
                                helperText={errors.make_model_description}
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
            <Grid item xs={12}>
                <Field
                    id="serial_number"
                    name="serial_number"
                    type="text"
                    render={({ field, form: { values, touched, errors } }) => {
                        return (
                            <FC.FormInput
                                name={field.name}
                                label={getSerialDescription(type)}
                                helperText={errors.serial_number}
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
            {type === "golf_cars" && (
                <Grid item xs={12}>
                    <Field
                        id="charger_model_number"
                        name="charger_model_number"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    name={field.name}
                                    label="Charger Model Number"
                                    helperText={errors.charger_model_number}
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
            {type === "golf_cars" && (
                <Grid item xs={12}>
                    <Field
                        id="charger_serial_number"
                        name="charger_serial_number"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    name={field.name}
                                    label="Charger Serial Number"
                                    helperText={errors.charger_serial_number}
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
                        id="ignition_key_number"
                        name="ignition_key_number"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    name={field.name}
                                    label="Ignition key number"
                                    helperText={errors.ignition_key_number}
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
                        id="product_installation"
                        name="product_installation"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormDropdown
                                    placeholer="Product installation"
                                    name={field.name}
                                    options={["Single", "Dual"]}
                                    label="Product installation"
                                    helperText={errors.product_installation}
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
        </Grid>
    );
}

export const ProductValidationSchema = ({ type }) => {
    const defaultSchema = {
        new_used: yup.string().required("Required"),
        model_description: type === "motorcycles" ? yup.string() : yup.string().required("Required"),
        make_model_description:
            type !== "marine"
                ? yup.string().required("Required")
                : yup.string(),
        product_make: yup.string(),
        charger_model_number: type === "golf_cars" ? yup.string().required("Required") : yup.string(),
        charger_serial_number: type === "golf_cars" ? yup.string().required("Required") : yup.string(),
        serial_number: type === "motorcycles"  ? yup
                  .string()
                  .min(17, "A minimum of 17 characters required")
                  .required("Required")
            : yup.string().required("Required")
    };
    if (getProductTypes(type).length === 0) {
        return defaultSchema;
    }
    return {
        product_purchased: yup.string().required("Required"),
        ...defaultSchema
    };
};
