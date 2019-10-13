import { makeStyles } from '@material-ui/core/styles';

export const signUpStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
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

export const supProfileStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
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

// GovernmentView.js
export const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    // color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

export const useGovenmentTalbeStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
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


// AppBarGov & AppBarSupplier & AppBarVerifier
export const useAppBarStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
}));


// ViewForms & ViewFormsVerifier
export const useViewFormsStyles = makeStyles(theme => ({
  root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
  },
  table: {
      minWidth: 650,
  },
}));

// ViewFormDetail & ViewFormDetailVerifier
export const useViewFormDetailStyles = makeStyles(theme => ({
  root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
  },
  table: {
      minWidth: 650,
  },
  button: {
      marginLeft: '50px',
  },
}));