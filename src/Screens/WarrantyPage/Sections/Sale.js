import React from 'react'
import { Field } from 'formik';
import { Form as FC } from 'components';
import { Grid } from '@material-ui/core';
import * as yup from 'yup';
import { FormCalendar } from 'components/Form';

export default function Sale({ values, setFieldValue, onChange }) {
  return (
    <Grid container item xs={12} justify="space-between">
      <Grid item xs={12}>
        <h2>Sale Information</h2>
      </Grid>
      <Grid item xs={12}>
        <Field
          id="invoice"
          name="invoice"
          render={({ field, form: { touched, errors }}) => {
            return (<FC.FileUpload
              id="invoice"
              name="invoice"
              label="Click or tap here to select your invoice to upload"
              value={field.value}
              helperText={errors.invoice}
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
          id="invoice_number"
          name="invoice_number"
          type="text"
          render={({ field, form: { touched, errors }}) => {
            return (<FC.FormInput
              label="Invoice Number"
              value={field.value}
              helperText={errors.invoice_number}
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
            id="date_of_purchase"
            name="date_of_purchase"
            render={({ field, form: { touched, errors }}) => {
              return (
              <FormCalendar
                {...field}
                helperText={errors.date_of_purchase}
                onChange={(k, v) => {
                  setFieldValue(k, v);
                  onChange(k, v);
                }}
              />);
            }}
        />
      </Grid>
    </Grid>
  );
}

export const SaleValidationSchema = ({ type }) => ({
  // invoice_number: yup.string(),
  invoice: yup.object().shape({
    name: yup.string().required('Please select an invoice file'),
  }).nullable(),
  date_of_purchase: yup.string()//.required('Required'),
});
