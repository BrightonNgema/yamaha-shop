/*
  @desc: this is a section meant to be rendered in a Formik form.
  Formiks renderProps will be passed as the props to this function.
*/
import React, { useState, useEffect} from "react";
import { Field } from "formik";
import { Form as FC } from "components";
import { Grid } from "@material-ui/core";
import * as yup from "yup";
import { withRouter } from 'react-router-dom';
import axios  from 'axios';

function Dealership({ setFieldValue, onChange, history, match, location }) {
    const {type} = match.params
    const [dealerships,setDealership ] = useState([]);

    useEffect(() => {
        const getDealerships = async () => {
            try {
                const baseUrl = process.env.REACT_APP_API_URL;
                let dealers = await axios.get(baseUrl + "dealers");
                let { data } = dealers.data  
                const filteredData = data.filter((item) => item.category.toLowerCase().includes(type.replace('_', " ").toLowerCase()))
                return setDealership(filteredData.map((i) => { return i.name }))
            } catch (error) {
                return []
            }
        }
        return getDealerships();
    }, [type]);

    return (
        <Grid item xs={12}>
            <h2>Yamaha dealer information</h2>
            <Field
                id="dealership_name"
                name="dealership_name"
                type="text"
                render={({ field, form: { values, touched, errors } }) => {
                    return (
                        
                        <FC.FormDropdown

                            placeholer="Dealership name"
                            name={field.name}
                            options={dealerships}
                            label={dealerships.length < 1 ? "Loading...." : "Dealership name"}
                            helperText={errors.dealership_name}
                            {...field}
                            onChange={(k, v) => {
                                setFieldValue(k, v);
                                onChange(k, v);
                            }}
                        />
                    );
                }}
            />
            <Grid container item xs={12}>
                <Grid item xs={12}>
                    <Field
                        id="dealership_email"
                        name="dealership_email"
                        type="text"
                        render={({
                            field,
                            form: { values, touched, errors }
                        }) => {
                            return (
                                <FC.FormInput
                                    label="Dealership email address"
                                    helperText={errors.dealership_email}
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
            </Grid>
        </Grid>
    );
}

export const DealershipValidationSchema = ({ type }) => ({
    dealership_name: yup.string().required("Required"),
    // dealership_email: type === "pro_audio" ? yup.string() : yup.string().required('Required')
    //   .email('Please enter a valid email address'),
});


export default withRouter(Dealership)