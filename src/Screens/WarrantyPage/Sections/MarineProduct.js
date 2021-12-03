/*
  @desc: this is a section meant to be rendered in a Formik form.
  Formiks renderProps will be passed as the props to this function.
*/
import React from 'react'
import { Field } from 'formik';
import { Form as FC } from 'components';
import { Grid } from '@material-ui/core'
import * as yup from 'yup';

export default function MarineProduct({ setFieldValue, onChange }) {
  return (
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <Field
          id="title"
          name="title"
          type="text"
          render={({ field, form: { values, touched, errors } }) => {
            return (<FC.FormInput
              name={field.name}
              label="Title"
              helperText={errors.title}
              {...field}
              onChange={(k, v) => {
                setFieldValue(k, v);
                onChange(k, v);
              }}
            />);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          id="names"
          name="names"
          type="text"
          render={({ field, form: { values, touched, errors } }) => {
            return (<FC.FormInput
              name={field.name}
              label="Firstname &amp; Surname"
              helperText={errors.names}
              {...field}
              onChange={(k, v) => {
                setFieldValue(k, v);
                onChange(k, v);
              }}
            />);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          id="email"
          name="email"
          type="text"
          render={({ field, form: { values, touched, errors } }) => {
            return (<FC.FormInput
              name={field.name}
              label="Email address"
              helperText={errors.email}
              {...field}
              onChange={(k, v) => {
                setFieldValue(k, v);
                onChange(k, v);
              }}
            />);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          id="phone_number"
          name="phone_number"
          type="text"
          render={({ field, form: { values, touched, errors } }) => {
            return (<FC.FormInput
              name={field.name}
              label="Contact number"
              helperText={errors.phone_number}
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

export const MarineProductValidationSchema = type => ({
  title: yup.string().oneOf(['Mr', 'Mrs', 'Ms', 'Miss']).required('Required'),
  names: yup.string().required('Required'),
  email: yup.string()
    .required('Required')
    .email('Please enter a valid email address'),
  phone_number: yup.string()
    .required('Required')
    .matches(/\+?\d{10,12}/, 'Please enter a valid contact number with no spaces between numbers.'),
});