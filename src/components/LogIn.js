// Material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

// React Bootstrap
import Alert from 'react-bootstrap/Alert'

// React related package
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInputState } from './Hooks';
import { signUpStyles } from './Style'
import { saveToken, setSupplierData, setVerifierData, setGovData } from '../Helper'
import axios from 'axios';

export default function LogIn(props) {
    const classes = signUpStyles();
    const [loginFailed, setLoginFailed] = useState(false);
    const [email, updateEmail] = useInputState('');
    const [role, updateRole] = useInputState('');
    const [password, updatePassword] = useInputState('');

    const roles = [
        { value: 'supplier', label: 'Supplier' },
        { value: 'verifier', label: 'Verifier' },
        { value: 'gov', label: 'Gov' }
    ];

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const user = {
            email: email,
            password: password
        };

        if (role === 'supplier') {
            // login supplier
            axios.post(`https://shielded-fjord-25564.herokuapp.com/api/supplier/login`, { user }).then(res => {
                saveToken(res['data']['user'])
                const { user } = res['data']
                const data = user
                setSupplierData(data)
                const path = {
                    pathname: '/sup-profile',
                    state: data,
                }
                props.history.push(path)
            }).catch(() => {
                setLoginFailed(true);
            })
        } else if(role === 'verifier') {
            // login verifier
            axios.post(`https://shielded-fjord-25564.herokuapp.com/api/verifier/login`, { user }).then(res => {
                saveToken(res['data']['user'])
                const { user } = res['data']
                const data = user;
                setVerifierData(data)
                const path = {
                    pathname: `/ver-profile`,
                    state: data,
                }
                props.history.push(path)
            }).catch(() => {
                setLoginFailed(true);
            })
        } else if(role === 'gov') {
            // login verifier
            axios.post(`https://shielded-fjord-25564.herokuapp.com/api/gov/login`, { user }).then(res => {
                saveToken(res['data']['user'])
                const { user } = res['data']
                const data = user;
                setGovData(data)
                let path;
                if (user.role === 'admin'){
                    path = {
                        pathname: `/admin`,
                        state: data,
                    }
                }else{
                    path = {
                        pathname: `/gov`,
                        state: data,
                    }
                }
                props.history.push(path)
            }).catch(() => {
                setLoginFailed(true);
            })
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Log In
                </Typography>

                {loginFailed &&
                    <Alert variant="danger" className={classes.succBar}>Incorrect email address or password. </Alert>
                }
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
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
                        <Grid item xs={12}>
                            <TextField
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
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        value="submit"
                        className={classes.submit}
                    >Log In
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to='/signup' variant="body2">
                                Don't have an account? Sign up
                        </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}