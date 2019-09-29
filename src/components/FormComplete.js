import React from 'react';
import Alert from 'react-bootstrap/Alert'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: '900',
  }
}));

export default function Complete(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="lg">
      <Alert variant="success">
        <Alert.Heading className={classes.title}> Submitted Successfully!</Alert.Heading>
      </Alert>
    </Container>
  );
}
