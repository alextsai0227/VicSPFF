// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';


// React related package
import React, { useEffect } from 'react';
import { useToggle, useInputState } from './Hooks';
import NaviBar from './AppBarVerifier';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
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

export default function ViewFormDetailVerifier(props) {
    const classes = useStyles();
    const [abo_existing_data_button, toggleAboExisting] = useToggle(false);
    const [abo_future_data_button, toggleAboFuture] = useToggle(false);
    const [cohorts_data_button, toggleCohorts] = useToggle(false);
    const [social_benefit_data_button, toggleSocialBenefit] = useToggle(false);
    const [job_readiness_data_button, toggleJobReadiness] = useToggle(false);

    const [abo_existing_data_status, setAboExisting] = useInputState('');
    const [abo_future_data_status, setAboFuture] = useInputState('');
    const [cohorts_data_status, setCohorts] = useInputState('');
    const [social_benefit_data_status, setSocialBenefit] = useInputState('');
    const [job_readiness_data_status, setJobReadiness] = useInputState('');


    const application = props.location.state.application
    const abo_existing_data = application.emp_curr_abo
    const abo_future_data = application.emp_recruit_abo
    const cohorts_data = application.emp_cohorts
    const social_benefit_data = application.social_benefit
    const job_readiness_data = application.readiness_act



    function handleBack() {
        const path = {
            pathname: '/viewformsverifier',
            state: props.location.state,
        }
        props.history.push(path)
    }
    function handleSave() {
        console.log(application._id)
        let data = new Object(); 
        if (abo_existing_data_status !== ''){
            data.abo_existing_data = abo_existing_data_status
        }
        axios({
            method: 'put',
            url: `http://localhost:8001/api/supplier/application/${application._id}`,
            data: { data: data },
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {

            const path = {
            pathname: '/viewformsverifier',
            state: props.location.state,
            }
            props.history.push(path)
        }).catch(err => {
            console.log(err)
        });
    }

    function handleStatus(e){
        const str = e.target.getAttribute('value') ? e.target.getAttribute('value'):e.target.parentNode.getAttribute('value') 
        const button =  e.target.getAttribute('value') ? e.target:e.target.parentNode
        console.log(str)
        switch (str) {
            case 'abo_existing_data_confirm':
              toggleAboExisting()
              setAboExisting('confirm')
              document.querySelector("#abo_existing_data_refute").setAttribute('hidden', '')
              break;
            case 'abo_existing_data_refute':
              toggleAboExisting()
              setAboExisting('refute')
              document.querySelector("#abo_existing_data_confirm").setAttribute('hidden', '')
              break;
            default:
              console.log('Sorry, no string match');
        }
    }

    useEffect(() => {
        console.log(`更新後的 State`)
        if (application.abo_existing_data_status !== ''){
            if(application.abo_existing_data_status === 'confirm'){
                document.querySelector("#abo_existing_data_refute").setAttribute('hidden', '')
            }else{
    
            }
        }
        //componentDidUpdate 及 componentWillUnmount
        return (() => {
          console.log(`更新前的 State`)
        })
    
      })

    return (
        <>
            <NaviBar />
            <Container component="main" maxWidth="md">
                <br />
                <h1> Application Details</h1>
                <br />
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Typography component="h2" variant="h5" align="left">
                            Aboriginal Existing Employment
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                            <Button 
                                onClick={handleStatus} 
                                id='abo_existing_data_refute' 
                                value='abo_existing_data_refute' 
                                disabled={abo_existing_data_button} 
                                color='primary' 
                                variant='outlined'>
                                    Refute
                            </Button>
                            <Button 
                                onClick={handleStatus} 
                                id='abo_existing_data_confirm' 
                                value='abo_existing_data_confirm' 
                                disabled={abo_existing_data_button} 
                                color='primary' 
                                variant='outlined'>
                                    Confirm
                            </Button>
                    </Grid>
                </Grid>

                <Paper className={classes.root}>
                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                                <TableCell>Existing Aboriginal Employee Roles</TableCell>
                                <TableCell align="center">Years Recruited</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {abo_existing_data.map(row => (
                                <TableRow >
                                    <TableCell >{row.emp_role}</TableCell>
                                    <TableCell align="center" >{row.emp_year}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

                <br /><br /><br />

                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Typography component="h2" variant="h5" align="left">
                            Aboriginal Future Employment
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                            <Button>Refute</Button>
                            <Button>Confirm</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                <Paper className={classes.root}>
                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                                <TableCell>Aboriginal Roles To Be Recruited </TableCell>
                                <TableCell align="center">Proposed Recruitment Year</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {abo_future_data.map(row => (
                                <TableRow >
                                    <TableCell >{row.recruit_role}</TableCell>
                                    <TableCell align="center" >{row.recruit_year}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

                <br /><br /><br />

                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Typography component="h2" variant="h5" align="left">
                            Cohorts Employment
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                            <Button>Refute</Button>
                            <Button>Confirm</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>

                <Paper className={classes.root}>
                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                                <TableCell>Group</TableCell>
                                <TableCell align="center">Current Number Employed</TableCell>
                                <TableCell align="center">Proposed Future Recruitment&nbsp;(Number of)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {cohorts_data.map(row => (
                                <TableRow >
                                    <TableCell >{row.group_name}</TableCell>
                                    <TableCell align="center" >{row.curr_emp}</TableCell>
                                    <TableCell align="center" >{row.future_emp}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

                <br /><br /><br />

                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Typography component="h2" variant="h5" align="left">
                            Verified Social Benefits
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                            <Button>Refute</Button>
                            <Button>Confirm</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                <Paper className={classes.root}>
                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                                <TableCell>Social Enterprise</TableCell>
                                <TableCell align="center">Services They Will Provide</TableCell>
                                <TableCell align="center">Potential Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {social_benefit_data.map(row => (
                                <TableRow >
                                    <TableCell >{row.company_name}</TableCell>
                                    <TableCell align="center" >{row.service_name}</TableCell>
                                    <TableCell align="center" >{row.value.$numberDecimal}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

                <br /><br /><br />

                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Typography component="h2" variant="h5" align="left">
                            Job Readiness Activities
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                            <Button>Refute</Button>
                            <Button>Confirm</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                <Paper className={classes.root}>
                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                                <TableCell>Group</TableCell>
                                <TableCell align="center">Number of People</TableCell>
                                <TableCell align="center">Number of Hours</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {job_readiness_data.map(row => (
                                <TableRow >
                                    <TableCell >{row.group_name}</TableCell>
                                    <TableCell align="center" >{row.num_people}</TableCell>
                                    <TableCell align="center" >{row.num_hour}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <br /><br />
                <div>
                    <Button onClick={handleBack} variant="contained" className={classes.button} >Back</Button>
                    <Button onClick={handleSave} variant="contained" color="primary" className={classes.button} >Save</Button>
                </div>
            </Container>
        </>
    );
}