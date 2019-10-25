// Material UI
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/paper';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';

// React related package
import React, { useEffect } from 'react';
import NaviBar from './AppBarSupplier';
import { useInputState, useToggle } from './Hooks';
import { supProfileStyles } from './Style'
import axios from 'axios';

export default function ProfileSupplier(props) {
  let r_companyName = ''
  let r_abn = ''
  let r_email = ''
  let r_phone = ''
  let r_street = ''
  let r_suburb = ''
  let r_state = ''

  if (props.location && props.location.state) {
    //componentDidMount 及 componentDidUpdate
    const data = props.location.state
    if (data.company_name) {
      r_companyName = data.company_name
    }
    if (data.phone) {
      r_phone = data.phone
    }
    if (data.abn) {
      r_abn = data.abn
    }
    if (data.email) {
      r_email = data.email
    }
    if (data.street) {
      r_street = data.street
    }
    if (data.suburb) {
      r_suburb = data.suburb
    }
    if (data.state) {
      r_state = data.state
    }
  } else {
    if (window.localStorage.token) {
      axios({
        method: 'get',
        url: `https://shielded-fjord-25564.herokuapp.com/api/supplier/current`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${window.localStorage.token}`
        },
      }).then(res => {
        r_companyName = res.data.user.company_name
        r_abn = res.data.user.abn
        r_email = res.data.user.email
        r_phone = res.data.user.phone
        r_street = res.data.user.street
        r_suburb = res.data.user.suburb
        r_state = res.data.user.state
        updateCompanyName(r_companyName)
        updateEmail(r_email)
        updateAbn(r_abn)
        updatePhone(r_phone)
        updateStreet(r_street)
        updateSuburb(r_suburb)
        updateState(r_state)
      })
        .catch((err) => {
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
  const [email, updateEmail] = useInputState(r_email);
  const [phone, updatePhone] = useInputState(r_phone);
  const [street, updateStreet] = useInputState(r_street);
  const [suburb, updateSuburb] = useInputState(r_suburb);
  const [state, updateState] = useInputState(r_state);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (readOnly) {
      const data = {
        'phone': phone,
        'street': street,
        'suburb': suburb,
        'state': state,
        'abn': abn,
        'company_name': companyName
      };
      axios({
        method: 'put',
        url: `https://shielded-fjord-25564.herokuapp.com/api/supplier/user/${window.localStorage.u_id}`,
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
    //componentDidUpdate 及 componentWillUnmount
    return (() => {
      console.log(`更新前的 State`)
    })
  })

  return (
    <>
      <NaviBar props={props} />
      <Container component="main" maxWidth="sm">
        <br />
          <h1>Supplier Profile</h1>
          <Paper className={classes.paper} >
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    floatingLabelText="Email Address"
                    type="email"
                    id="email"
                    readOnly={true}  // ALWAYS TRUE
                    value={email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    hintText="Enter Your Company Name"
                    floatingLabelText="Company Name*"
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
                    hintText="Enter Your Phone Number"
                    floatingLabelText="Phone*"
                    type="text"
                    id="phone"
                    readOnly={readOnly}
                    value={phone}
                    onChange={e => updatePhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    hintText="Enter Your Street"
                    floatingLabelText="Street*"
                    type="text"
                    id="street"
                    readOnly={readOnly}
                    value={street}
                    onChange={e => updateStreet(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    hintText="Enter Your Suburb"
                    floatingLabelText="Suburb*"
                    type="text"
                    id="suburb"
                    readOnly={readOnly}
                    value={suburb}
                    onChange={e => updateSuburb(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {readOnly ? (<TextField
                    required
                    fullWidth
                    floatingLabelText="State*"
                    value={state}
                    readOnly={true}
                  ></TextField>)
                    :
                    (<Select
                      required
                      fullWidth
                      hintText="Select Your State"
                      floatingLabelText="State"
                      value={state}
                      onChange={updateState}
                      input={<Input name="state" id="state" />}
                    >
                      <MenuItem value=""></MenuItem>
                      <MenuItem value="NSW">NSW</MenuItem>
                      <MenuItem value="VIC">VIC</MenuItem>
                      <MenuItem value="QLD">QLD</MenuItem>
                      <MenuItem value="WA">WA</MenuItem>
                      <MenuItem value="SA">SA</MenuItem>
                      <MenuItem value="TAS">TAS</MenuItem>
                      <MenuItem value="ACT">ACT</MenuItem>
                      <MenuItem value="NT">NT</MenuItem>
                    </Select>)}
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