// Material UI
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// React related package
import FormAboriginal from './FormAboriginal';
import FormUnemployed from './FormUnemployed';
import FormDisability from './FormDisability';
import FormRefugee from './FormRefugee';
import FormPreview from './FormPreview';
import FormComplete from './FormComplete';
import NaviBar from './AppBarSupplier';
import React from 'react';
import axios from 'axios';
import { getApplications } from '../Helper';
import { useFormStepperStyles } from './Style'

export default function FormStepper(props) {
  const classes = useFormStepperStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  // init global variable for submit new form
  window.VIC.aboriginal = window.VIC.aboriginal || []
  window.VIC.disability = window.VIC.disability || []
  window.VIC.refugee = window.VIC.refugee || []
  window.VIC.unemployed = window.VIC.unemployed || []

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);

    if (activeStep === 4) {
      const data = {
        'supplier_id': window.localStorage.u_id,
        'abo': window.VIC.aboriginal,
        'disability': window.VIC.disability,
        'refugee': window.VIC.refugee,
        'unemployed': window.VIC.unemployed,
        'company_name': window.localStorage.company_name
      };
      // submited, so reset variable
      window.VIC.aboriginal = []
      window.VIC.disability = []
      window.VIC.refugee = []
      window.VIC.unemployed = []
      
      axios({
        method: 'post',
        url: `https://shielded-fjord-25564.herokuapp.com/api/supplier/application/${window.localStorage.u_id}`,
        data: { data: data },
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        });
    }
    if (activeStep === 5) {
      getApplications(props)
    }
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <FormAboriginal props={props} />;
      case 1:
        return <FormDisability props={props} />;
      case 2:
        return <FormRefugee props={props} />;
      case 3:
        return <FormUnemployed props={props} />;
      case 4:
        return <FormPreview props={props} />;
      case 5:
        return <FormComplete props={props} />;
    }
  }

  function getSteps() {
    return ['Aboriginal People', 'People With Disability',
      'Refugee', 'Long-term Unemployed People', 'Preview', 'Complete'];
  }
  function sitchButton() {
    if (activeStep === steps.length - 1) {
      return 'Finish'
    } else if (activeStep === steps.length - 2) {
      return 'Submit'
    } else {
      return 'Next'
    }
  }
  return (
    <div>
      <NaviBar />
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div />
          ) : (
              <div>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                <br /><br />
                <div className={classes.buttons}>
                  <Button color="text.secondary"
                    disabled={activeStep === 0 || activeStep === 5}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                </Button>
                  <Button variant="contained" color="primary" onClick={handleNext} className={classes.nextButton}>
                    {sitchButton()}
                  </Button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}