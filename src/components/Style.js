import { makeStyles } from '@material-ui/core/styles';

// login & signup
export const signUpStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: "#eeeeee",
    },
  },
  paper: {    
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    paddingTop: theme.spacing(6),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingBottom: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  succBar: {
    width: '100%',
    marginTop: theme.spacing(3),
  }
}));

// ProfileSupplier & ProfileVerifier
export const supProfileStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: "#eeeeee",
    },
  },
  paper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  flex: {
    display: 'flex',
    flexDirection: 'row'
  }
}));

// Government' toolbar
export const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  spacer: {
    flex: '1 1 100%',
  },
  title: {
    flex: '0 0 auto',
  },
}));

// GovernmentView.js
export const useGovenmentTalbeStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: "#eeeeee",
    },
  },
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    padding : theme.spacing(2),
    margin : theme.spacing(2),
  },
  table: {
    minWidth: 1050,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));


// FormStepper.js
export const useFormStepperStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: "#eeeeee",
    },
  },
  root: {
    width: '100%',
    margin: 'auto'
  },
 stepper: {
    backgroundColor: "#eeeeee",
  },
  buttons: {
    width: '100%',
    position: 'fixed',
    bottom: '10px',
    textAlign: 'center',
  },
  backButton: {
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


// AppBarGov & AppBarSupplier & AppBarVerifier
export const useAppBarStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
}));


// ViewForms & ViewFormsVerifier
export const useViewFormsStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: "#eeeeee",
    },
  },
  root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
  },
  table: {
      minWidth: 650,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

// ViewFormDetail & ViewFormDetailVerifier
export const useViewFormDetailStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: "#eeeeee",
    },
  },
  root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
  },
  paper:{
      padding: theme.spacing(3),
      textAlign: 'left',
      color: '#717171',
  },
  table: {
      minWidth: 650,
  },
  button: {
      marginLeft: '50px',
  },
}));