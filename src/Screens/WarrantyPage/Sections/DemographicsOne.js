/*
  @desc: this is a section meant to be rendered in a Formik form.
  Formiks renderProps will be passed as the props to this function.
*/
import React from 'react'
import { Field } from 'formik';
import { Form as FC } from 'components';
import { Grid } from '@material-ui/core'
import * as yup from 'yup';

const southAfricanProvinces = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'Northern Cape',
  'North-West',
  'Western Cape',
];

const marineProvinces = [
  ...southAfricanProvinces,
  'Botswana',
  'Mozambique',
  'Namibia',
  'Swaziland',
  'Zambia',
  'Other'
];

const motorcyclesProvinces = [
  ...southAfricanProvinces,
  'Botswana',
  'Namibia',
  'Swaziland',
];

const provinces = {
  'marine': marineProvinces,
  'motorcycles': motorcyclesProvinces,
}

export default function DemographicsOne({ setFieldValue, onChange, type }) {
  return (
    <Grid container item xs={12}>
      <Grid item xs={6}>
        <Field
          id="province"
          name="province"
          type="text"
          render={({ field, form: { values, touched, errors } }) => {
            return (<FC.FormDropdown
              name={field.name}
              label="province"
              helperText={errors.province}
              options={provinces[type] || southAfricanProvinces}
              {...field}
              onChange={(k, v) => {
                setFieldValue(k, v);
                onChange(k, v);
              }}
            />);
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <Field
          id="age_group"
          name="age_group"
          type="text"
          render={({ field, form: { values, touched, errors } }) => {
            return (<FC.FormDropdown
              options={[
                '18-25',
                '26-35',
                '36-45',
                '46-55',
                '56-65',
                '66+'
              ]}
              name={field.name}
              label="Please indicate your age group"
              helperText={errors.age_group}
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
          id="gender"
          name="gender"
          type="text"
          render={({ field, form: { values, touched, errors } }) => {
            return (<FC.FormDropdown
              options={[
                'Female',
                'Male',
                'Prefer not to say',
              ]}
              name={field.name}
              label="Please indicate your gender"
              helperText={errors.gender}
              {...field}
              onChange={(k, v) => {
                setFieldValue(k, v);
                onChange(k, v);
              }}
            />);
          }}
        />
      </Grid>

      {type === 'marine' && <Grid item xs={12}>
        <Field
          id="purpose_of_use_private"
          name="purpose_of_use_private"
          type="text"
          render={({ field, form: { values, touched, errors } }) => {
            return (<FC.CheckboxList
              name={field.name}
              label="Purpose of use (Private)"
              items={[
                {
                  label: 'Ski Boat - Deep Sea',
                  key: 'skiboat_deepsea',
                },
                {
                  label: 'Racing',
                  key: 'racing',
                },
                {
                  label: 'Inflatable',
                  key: 'inflatable',
                },
                {
                  label: 'Waterski',
                  key: 'waterski',
                },
                {
                  label: 'Bass Fishing',
                  key: 'bass_fishing',
                },
                {
                  label: 'Inland Fishing / Estuary',
                  key: 'inland_fishing_or_estuary',
                },
              ]}
              helperText={errors.purpose_of_use_private}
              {...field}
              onChange={(k, v) => {
                setFieldValue(k, v);
                onChange(k, v);
              }}
            />);
          }}
        />
      </Grid>}
      {type === 'marine' && <Grid item xs={12}>
        <Field
          id="purpose_of_use_comercial"
          name="purpose_of_use_comercial"
          type="text"
          render={({ field, form: { values, touched, errors } }) => {
            return (<FC.CheckboxList
              name={field.name}
              label="Purpose of use (Commercial)"
              items={[
                {
                  label: 'Fishing',
                  key: 'fishing',
                },
                {
                  label: 'Jetski Fishing',
                  key: 'jetski_fishing',
                },
                {
                  label: 'Diving',
                  key: 'diving',
                },
                {
                  label: 'Transport',
                  key: 'transport',
                },
                {
                  label: 'Hire',
                  key: 'hire',
                },
                {
                  label: 'Government',
                  key: 'government',
                },
                {
                  label: 'Demo',
                  key: 'demo',
                },
              ]}
              helperText={errors.purpose_of_use_comercial}
              {...field}
              onChange={(k, v) => {
                setFieldValue(k, v);
                onChange(k, v);
              }}
            />);
          }}
        />
      </Grid>}
      {type === 'motorcycles' && <Grid item xs={12}>
        <Field
          id="purpose_of_use_private"
          name="purpose_of_use_private"
          type="text"
          render={({ field, form: { values, touched, errors } }) => {
            return (<FC.CheckboxList
              name={field.name}
              label="Purpose of use"
              items={[
                {
                  label: 'Recreation',
                  key: 'recreation',
                },
                {
                  label: 'Commuter',
                  key: 'commuter',
                },
                {
                  label: 'Business',
                  key: 'business',
                },
              ]}
              helperText={errors.purpose_of_use_private}
              {...field}
              onChange={(k, v) => {
                setFieldValue(k, v);
                onChange(k, v);
              }}
            />);
          }}
        />
      </Grid>}
      {type === 'power_products' && <Grid item xs={12}>
        <Field
          id="purpose_of_use_private"
          name="purpose_of_use_private"
          type="text"
          render={({ field, form: { values, touched, errors } }) => {
            return (<FC.CheckboxList
              name={field.name}
              label="Purpose of use"
              items={[
                'Domestic',
                'Agriculture',
                'Hire',
                'Other',
              ]}
              helperText={errors.purpose_of_use_private}
              {...field}
              onChange={(k, v) => {
                setFieldValue(k, v);
                onChange(k, v);
              }}
            />);
          }}
        />
      </Grid>}
    </Grid>
  )
}

export const DemographicsOneValidationSchema = ({ type }) => ({
  province: yup.string()
    .oneOf([...southAfricanProvinces, ...marineProvinces, ...motorcyclesProvinces])
    .required('Required'),
  gender: yup.string().oneOf([
    'Female',
    'Male',
    'Prefer not to say',
  ]).required('Required'),
  age_group: yup.string().oneOf([
    '18-25',
    '26-35',
    '36-45',
    '46-55',
    '56-65',
    '66+'
  ]).required('Required'),
  other_products: yup.mixed(),
  musiccast_owned: yup.bool(),
  soundbar_owned: yup.bool(),
  purpose_of_use: yup.string(),
  marketing_opt_in: yup.bool(),
});