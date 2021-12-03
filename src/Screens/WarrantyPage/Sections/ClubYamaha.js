/*
  @desc: this is a section meant to be rendered in a Formik form.
  Formiks renderProps will be passed as the props to this function.
*/
import React from 'react'
import { Field } from 'formik';
import { Form as FC } from 'components';
import { Grid } from '@material-ui/core'
import * as yup from 'yup';

export default function ClubYamaha({ setFieldValue, onChange, type }) {
    return (
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <h2>{type !== 'motor' ? 'Club Yamaha' : 'Blu Cru'}</h2>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            id="vehicle_registration"
            name="vehicle_registration"
            type="text"
            render={({ field, form: { values, touched, errors }}) => {
              return (<FC.FormInput
                name={field.name}
                label="Vehicle Registration"
                helperText={errors.vehicle_registration}
                {...field} 
                onChange={(k, v) => {
                    setFieldValue(k, v);
                    onChange(k, v);
                }}
              />);
            }} 
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            id="vehicle_make"
            name="vehicle_make"
            type="text"
            render={({ field, form: { values, touched, errors }}) => {
              return (<FC.FormInput
                name={field.name}
                label="Vehicle Make"
                helperText={errors.vehicle_make}
                {...field} 
                onChange={(k, v) => {
                    setFieldValue(k, v);
                    onChange(k, v);
                }}
              />);
            }} 
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            id="customer_id"
            name="customer_id"
            type="text"
            render={({ field, form: { values, touched, errors }}) => {
              return (<FC.FormInput
                name={field.name}
                label="Customer ID"
                helperText={errors.customer_id}
                {...field} 
                onChange={(k, v) => {
                    setFieldValue(k, v);
                    onChange(k, v);
                }}
              />);
            }} 
          />
        </Grid>
      </Grid>
    )
}

export const ClubYamahaValidationSchema = ({ type }) => ({
  vehicle_registration: yup.string(),
  vehicle_make: yup.string(),
  customer_id: yup.string(),
});