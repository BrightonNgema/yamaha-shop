import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Stepper as MaterialStepper }from '@material-ui/core';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Button } from 'components';
import './index.css'
import { primaryTheme } from '../../Theme/CustomTheme';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function Stepper({ steps, activeStep, onNext, handleBack, loading }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ThemeProvider theme={primaryTheme}>
                <MaterialStepper
                    connector={null}
                    activeStep={activeStep-1}
                >
                    {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                    })}
                </MaterialStepper>
            </ThemeProvider>
            <div>
            {activeStep > 0 && <Button title="Back" disabled={activeStep === 0} onClick={handleBack} />}
                <Button
                    type="primary"
                    onClick={onNext}
                    title={loading ? 'Working...' : (activeStep === steps.length - 1 ? 'Submit' : 'Next')}
                />
            </div>
        </div>
  );
}

export default Stepper;