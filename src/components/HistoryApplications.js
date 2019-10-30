// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MyResponsiveBar from './MyBarChart'


// React related package
import React, { useEffect } from 'react';
import { useToggle, useInputState } from './Hooks';
import NaviBar from './AppBarVerifier';
import { useViewFormDetailStyles } from './Style'
import axios from 'axios';



export default function HistoryDetail(props) {



    const company_name = props.location.state.company_name
    const title = props.location.state.data[0].name
    const data = props.location.state.data

    // const user = props.location.state.user
    // const companyName = user.company_name
    // const abn = user.abn
    // const email = user.email
    // const phone = user.phone
    // const street = user.street
    // const suburb = user.suburb
    // const state = user.state

    const classes = useViewFormDetailStyles();
    function handleBack() {
        props.history.goBack()
    }
    

    useEffect(() => {
        console.log(`更新後的 State`)
        //componentDidUpdate 及 componentWillUnmount
        return (() => {
            console.log(`更新前的 State`)
        })


    })

    return (
        <div>
            <NaviBar />
            <Container component="main" maxWidth="md">
                <br />
                <h1> {company_name}: {title}</h1>
                <br />
                {/*<div>
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <Typography component="h2" variant="h5" align="left">
                                Supplier Detail
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <br />
                <Paper className={classes.paper}>
                    <h6>Company Name: {companyName}</h6>
                    <h6>ABN: {abn}</h6>
                    <h6>Email: {email}</h6>
                    <h6>Phone: {phone}</h6>
                    <h6>Address: {street} {suburb} {state}</h6>
                </Paper>*/}
                <div style={{height:500 + 'px'}}><MyResponsiveBar data={data} /></div>

                <div>
                    <Button onClick={handleBack} variant="contained" className={classes.button} style={{marginLeft:0 + 'px'}}>Back</Button>
                </div>
            </Container>
        </div>
    );
}