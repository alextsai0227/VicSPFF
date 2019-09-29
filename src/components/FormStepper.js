// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// React related package
import FormAboEmp from './FormAboEmp';
import FormCohortsEmp from './FormCohortsEmp';
import FormSocialBenefit from './FormSocialBenefit';
import FormJobReadiness from './FormJobReadiness';
import FormPreview from './FormPreview';
import FormComplete from './FormComplete';
import NaviBar from './PrimarySearchAppBar';
import React from 'react';
import axios from 'axios';
import { getApplications } from '../Helper';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: 'auto'
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  buttons: {
    width: '100%',
    position: 'fixed',
    bottom: '10px',
    textAlign: 'center',
    // zIndex: '100000000,'
  },
  backButton: {
    backgroundColor: 'white',
    marginLeft: '25px',
    marginRight: '25px',
  },
  nextButton: {
    marginLeft: '25px',
    marginRight: '25px',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
}));

export default function FormStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  console.log("FormStepper")
  // init global variable for submit new form
  window.VIC.aboEmp = window.VIC.aboEmp || []
  window.VIC.aboCur = window.VIC.aboCur || []
  window.VIC.cohortEmp = window.VIC.cohortEmp || []
  window.VIC.jobReadiness = window.VIC.jobReadiness || []
  window.VIC.socialBenefit = window.VIC.socialBenefit || []
  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);

    if (activeStep === 4) {
      const data = {
        'supplier_id': window.localStorage.u_id,
        'aboEmp': window.VIC.aboEmp,
        'aboCur': window.VIC.aboCur,
        'cohortEmp': window.VIC.cohortEmp,
        'jobReadiness': window.VIC.jobReadiness,
        'socialBenefit': window.VIC.socialBenefit
      };
      // submited, so reset variable
      window.VIC.aboEmp = []
      window.VIC.aboCur = []
      window.VIC.cohortEmp = []
      window.VIC.jobReadiness = []
      window.VIC.socialBenefit = []
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
        return <FormAboEmp props={props} />;
      case 1:
        return <FormCohortsEmp props={props} />;
      case 2:
        return <FormSocialBenefit props={props} />;
      case 3:
        return <FormJobReadiness props={props} />;
      case 4:
        return <FormPreview props={props} />;
      case 5:
        return <FormComplete props={props} />;
    }
  }

  function getSteps() {
    return ['Aboriginal Employment', 'Cohorts Employment',
      'Verified Social Benefits', 'Job Readiness Activities', 'Preview', 'Complete'];
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
        <Stepper activeStep={activeStep} alternativeLabel>
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
                  <Button
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