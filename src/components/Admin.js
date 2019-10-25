// Material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { signUpStyles } from './Style'

// React Bootstrap
import Alert from 'react-bootstrap/Alert'

// React related package
import React, { useState, useEffect } from 'react';
import { useInputState } from './Hooks';
import Notifications ,{notify} from 'react-notify-toast';
import axios from 'axios';

export default function Admin(props) {
    const classes = signUpStyles();
    const [email, updateEmail] = useInputState('');
    const [role, updateRole] = useInputState('');
    const [v_role, updateVRole] = useInputState('aboriginal');
    const [abn, updateAbn] = useInputState('');
    const [company_name, updateCompanyName] = useInputState('');
    const [password, updatePassword] = useInputState('');
    const [isAuth, updateAuth] = useState(false)
    const roles = [
        { value: 'verifier', label: 'Verifier' },
        { value: 'gov', label: 'Gov' }
    ];
    // ==================   config verifier field  =====================
    const v_roles = [
        { value: 'aboriginal', label: 'Aboriginal' },
        { value: 'disability', label: 'Disability' },
        { value: 'refugee', label: 'Refugee' },
        { value: 'unemployed', label: 'Unemployed'}
    ];
    let v_role_field;
    if (role === 'verifier'){
        v_role_field = <Grid item xs={12}>
        <TextField
            required
            fullWidth
            type="text"
            variant="outlined"
            select
            id="v_role"
            label="VRole"
            name="v_role"
            value={v_role}
            onChange={updateVRole}
        >
            {v_roles.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    </Grid>
    }else{
        v_role_field = null
    }
    // ==================  End config verifier field  =====================



    const clearField = () => {
        updateEmail('')
        updateRole('')
        updateVRole('')
        updateAbn('')
        updateCompanyName('')
        updatePassword('')
    }
    const checkField = () => {
        if (email === '' || password === '' || role === '' || abn === '' || company_name === ''){
            return false
        }else{
            return true
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let greenColor = { background:'green', text: "#FFFFFF" };
        let redColor = { background:'red', text: "#FFFFFF" };
        if (checkField()){
            if(role === 'verifier'){
                const user = {
                    email: email,
                    password: password,
                    company_name: company_name,
                    abn: abn,
                    role: v_role,
                };
                axios.post(`https://shielded-fjord-25564.herokuapp.com/api/verifier`, { user }).then(res => {
                    notify.show('Created Successfully' , "custom", 5000, greenColor)
                    clearField()
                }).catch(err => {
                    notify.show(err , "custom", 5000, redColor)
                    clearField()
                })
            }else{
                const user = {
                    email: email,
                    password: password,
                    company_name: company_name,
                    abn: abn,
                    role: role,
                };
                axios.post(`https://shielded-fjord-25564.herokuapp.com/api/gov`, { user }).then(res => {
                    notify.show('Created Successfully' , "custom", 5000, greenColor)
                    clearField()
                }).catch(err => {
                    notify.show(err , "custom", 5000, redColor)
                    clearField()
                })
            }
            
        }else{
            notify.show('Please fill all fields' , "custom", 5000, redColor)
        }
        

    }
    
    useEffect(() => {
        console.log(`更新後的 State`)
        //componentDidUpdate 及 componentWillUnmount
        if (props.location && props.location.state) {
            const data = props.location.state
            console.log("==========68")
            if(data.role === 'admin'){
              updateAuth(true) 
            }else{
              props.history.push('/NotFound')
            }
          } else {
            if (window.localStorage.token) {
              axios({
                method: 'get',
                url: `https://shielded-fjord-25564.herokuapp.com/api/gov/current`,
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${window.localStorage.token}`
                },
              }).then(res => {
                if(res.data.user.role === 'admin'){
                  updateAuth(true)
                }else{
                  props.history.push('/NotFound')
                }
              }).catch((err) => {
                  props.history.push('/NotFound')
              });
            } else {
              props.history.push('/NotFound')
            }
            console.log("==========94")
          }
        return (() => {
          console.log(`更新前的 State`)
        })
    })

    return (
        <div>
        {isAuth && 
            <Container component="main" maxWidth="xs">
                <Notifications />
                <div className={classes.paper}>

                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Create User
                    </Typography>

                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="text"
                                    variant="outlined"
                                    select
                                    id="role"
                                    label="Role"
                                    name="role"
                                    value={role}
                                    onChange={updateRole}
                                >
                                    {roles.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            {v_role_field}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    variant="outlined"
                                    type="text"
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={email}
                                    onChange={updateEmail}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    variant="outlined"
                                    type="password"
                                    id="password"
                                    label="Password"
                                    name="password"
                                    value={password}
                                    onChange={updatePassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    variant="outlined"
                                    type="text"
                                    id="abn"
                                    label="ABN"
                                    name="abn"
                                    value={abn}
                                    onChange={updateAbn}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    variant="outlined"
                                    type="text"
                                    id="company_name"
                                    label="Company Name"
                                    name="company_name"
                                    value={company_name}
                                    onChange={updateCompanyName}
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            value="submit"
                            className={classes.submit}
                        >Submit
                        </Button>
                    </form>
                </div>
            </Container>
        }
        
        </div>
    );
}
