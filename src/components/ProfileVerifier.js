// Material UI
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import {Paper} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

// React related package
import React, { useEffect } from 'react';
import NaviBar from './AppBarVerifier';
import { useInputState, useToggle } from './Hooks';
import { supProfileStyles } from './Style'
import axios from 'axios';

export default function ProfileVerifier(props) {
  let r_companyName = ''
  let r_abn = ''
  let r_actType = ''

  if (props.location && props.location.state) {
    const data = props.location.state
    if (data.company_name) {
      r_companyName = data.company_name
    }
    if (data.activity_type) {
      r_actType = data.activity_type
    }
    if (data.abn) {
      r_abn = data.abn
    }
  } else {
    if (window.localStorage.token) {
      axios({
        method: 'get',
        url: `https://shielded-fjord-25564.herokuapp.com/api/verifier/current`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${window.localStorage.token}`
        },
      }).then(res => {
        r_companyName = res.data.user.company_name
        r_abn = res.data.user.abn
        r_actType = res.data.user.activity_type
        updateCompanyName(r_companyName)
        updateAbn(r_abn)
        updateActType(r_actType)
      }).catch((err) => {
        console.log(err.response)
      });
    } else {
      props.history.push('login')
    }
  }

  const classes = supProfileStyles();
  const [readOnly, toggle] = useToggle(true);
  const [companyName, updateCompanyName] = useInputState(r_companyName);
  const [abn, updateAbn] = useInputState(r_abn);
  const [activity_type, updateActType] = useInputState(r_actType);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (readOnly) {
      const data = {
        'activity_type': activity_type,
        'abn': abn,
        'company_name': companyName
      };
      axios({
        method: 'put',
        url: `https://shielded-fjord-25564.herokuapp.com/api/verifier/user/${window.localStorage.u_id}`,
        data: { data: data },
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => {
        console.log(res)
      })
        .catch(err => {
          console.log(err)
        });
    }
  }

  useEffect(() => {
    console.log(`更新後的 State`)
    return (() => {
      console.log(`更新前的 State`)
    })
  })

  return (
    <>
      <NaviBar props={props} />
      <Container component="main" maxWidth="sm">
        <br />
          <h1> Verifier Profile</h1>

          <Paper className={classes.paper} >
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  hintText="Enter Your Company Name"
                  floatingLabelText="Verifier Company Name*"
                  type="text"
                  id="companyName"
                  readOnly={readOnly}
                  value={companyName}
                  onChange={e => updateCompanyName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  hintText="Enter Your ABN"
                  floatingLabelText="ABN*"
                  type="text"
                  id="abn"
                  readOnly={readOnly}
                  value={abn}
                  onChange={e => updateAbn(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  hintText="Enter Your Activity Type"
                  floatingLabelText="Activity Type*"
                  type="text"
                  id="actType"
                  readOnly={readOnly}
                  value={activity_type}
                  onChange={e => updateActType(e.target.value)}
                />
              </Grid>
            </Grid>
            <br />
            <Button
              type="submit"
              value="Submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={toggle}
            >{readOnly ? "Edit" : "Save"}
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
}