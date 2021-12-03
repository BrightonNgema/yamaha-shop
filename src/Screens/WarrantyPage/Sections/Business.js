/*
  @desc: this is a section meant to be rendered in a Formik form.
  Formiks renderProps will be passed as the props to this function.
*/
import React from 'react'
import { Field } from 'formik';
import { Form as FC } from 'components';
import { Grid } from '@material-ui/core'
import * as yup from 'yup';

export default function Business({ setFieldValue, onChange, type }) {
  return (
    <Grid container item xs={12}>
      <Grid item xs={12} sm={6}>
        <Field
          id="business_name"
          name="business_name"
          type="text"
          render={({ field, form: { values, touched, errors } }) => {
            return (<FC.FormInput
              name={field.name}
              label="Business Name"
              helperText={errors.business_name}
              {...field}
              onChange={(k, v) => {
                setFieldValue(k, v);
                onChange(k, v);
              }}
            />);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Field
          id="business_email"
          name="business_email"
          type="text"
          render={({ field, form: { values, touched, errors } }) => {
            return (<FC.FormInput
              name={field.name}
              label="Business Email"
              helperText={errors.business_email}
              {...field}
              onChange={(k, v) => {
                setFieldValue(k, v);
                onChange(k, v);
              }}
            />);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Field
          id="business_phone"
          name="business_phone"
          type="text"
          render={({ field, form: { values, touched, errors } }) => {
            return (<FC.FormInput
              name={field.name}
              label="Business Contact Number"
              helperText={errors.business_phone}
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

export const BusinessValidationSchema = ({ purposes, type }) => ({
  business_name: yup.string(),
  business_email: yup.string().email('Please enter a valid email address'),
  business_phone: yup.string().matches(/\+?\d{10,12}/, 'Please enter a valid contact number with no spaces between numbers..'),
});