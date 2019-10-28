// Material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { signUpStyles } from './Style'

// React Bootstrap
import Alert from 'react-bootstrap/Alert'

// React related package
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInputState } from './Hooks';
import { saveToken, setSupplierData } from '../Helper';
import axios from 'axios';

export default function SignUp(props) {
    const classes = signUpStyles();
    const [signUpFailed, setSignUpFailed] = useState(false);
    const [email, updateEmail] = useInputState('');
    const [password, updatePassword] = useInputState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const user = {
            email: email,
            password: password
        };
        axios.post(`https://shielded-fjord-25564.herokuapp.com/api/supplier`, { user }).then(res => {
            saveToken(res['data']['user'])
            const { user } = res['data'];
            const data = user;
            setSupplierData(data);
            const path = {
                pathname: '/sup-profile',
                state: data,
            }
            props.history.push(path)
        }).catch(err => {
            setSignUpFailed(true);
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            {/* <CssBaseline /> */}
            <Paper className={classes.paper}>

                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                {signUpFailed &&
                    <Alert variant="danger" className={classes.succBar}>Invalid email address or password. </Alert>
                }
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
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
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        value="submit"
                        className={classes.submit}
                    >Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2">
                                Already have an account? Log In
                        </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}
