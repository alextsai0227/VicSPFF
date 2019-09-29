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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// React related package
import React from 'react';
import NaviBar from './PrimarySearchAppBar';
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

export default function ViewFormDetail(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const application = props.location.state.application
    const application_id = application._id
    const abo_existing_data = application.emp_curr_abo
    const abo_future_data = application.emp_recruit_abo
    const cohorts_data = application.emp_cohorts
    const social_benefit_data = application.social_benefit
    const job_readiness_data = application.readiness_act
    
    function handleDelete() {
        axios({
            method: 'delete',
            url: `https://shielded-fjord-25564.herokuapp.com/api/supplier/application/${application_id}`
          }).then(res => {
              const data = props.location.state
              let applications = props.location.state.applications
              data.applications = applications.filter(application => application_id !== application._id)
              const path = {
                pathname: '/viewforms',
                state: data,
              }
              props.history.push(path)
          }).catch(err => {
              console.log(err)
          });
    }

    function handleBack() {
        const path = {
            pathname: '/viewforms',
            state: props.location.state,
        }
        props.history.push(path)
    }
    function showDialog() {
        setOpen(true);
    }
    function closeDialog() {
        setOpen(false);
    }

    return (
        <>
            <NaviBar />
            <Container component="main" maxWidth="md">
                <br />
                <h1> Application Details</h1>
                <br />
                <Typography component="h2" variant="h5" align="left">
                    Aboriginal Existing Employment
                </Typography>
                <Paper className={classes.root}>
                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                                <TableCell>Existing Aboriginal Employee Roles</TableCell>
                                <TableCell align="right">Years Recruited</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {abo_existing_data.map(row => (
                                <TableRow >
                                    <TableCell >{row.emp_role}</TableCell>
                                    <TableCell align="right" >{row.emp_year}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <br /><br /><br />
                <Typography component="h2" variant="h5" align="left">
                    Aboriginal Future Employment
                </Typography>
                <Paper className={classes.root}>
                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                                <TableCell>Aboriginal Roles To Be Recruited </TableCell>
                                <TableCell align="right">Proposed Recruitment Year</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {abo_future_data.map(row => (
                                <TableRow >
                                    <TableCell >{row.recruit_role}</TableCell>
                                    <TableCell align="right" >{row.recruit_year}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <br /><br /><br />
                <Typography component="h2" variant="h5" align="left">
                    Cohorts Employment
                </Typography>
                <Paper className={classes.root}>
                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                                <TableCell>Group</TableCell>
                                <TableCell align="center">Current Number Employed</TableCell>
                                <TableCell align="right">Proposed Future Recruitment&nbsp;(Number of)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {cohorts_data.map(row => (
                                <TableRow >
                                    <TableCell >{row.group_name}</TableCell>
                                    <TableCell align="center" >{row.curr_emp}</TableCell>
                                    <TableCell align="right" >{row.future_emp}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <br /><br /><br />
                <Typography component="h2" variant="h5" align="left">
                    Verified Social Benefits
                </Typography>
                <Paper className={classes.root}>
                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                                <TableCell>Social Enterprise</TableCell>
                                <TableCell align="center">Services They Will Provide</TableCell>
                                <TableCell align="right">Potential Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {social_benefit_data.map(row => (
                                <TableRow >
                                    <TableCell >{row.company_name}</TableCell>
                                    <TableCell align="center" >{row.service_name}</TableCell>
                                    <TableCell align="right" >{row.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <br /><br /><br />
                <Typography component="h2" variant="h5" align="left">
                    Job Readiness Activities
                </Typography>
                <Paper className={classes.root}>
                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                                <TableCell>Group</TableCell>
                                <TableCell align="center">Number of People</TableCell>
                                <TableCell align="right">Number of Hours</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {job_readiness_data.map(row => (
                                <TableRow >
                                    <TableCell >{row.group_name}</TableCell>
                                    <TableCell align="center" >{row.num_people}</TableCell>
                                    <TableCell align="right" >{row.num_hour}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <br /><br />
                <div>
                    <Button onClick={handleBack} className={classes.button} >Back</Button>
                    <Button variant="contained" color="secondary" onClick={showDialog} className={classes.button}>Withdraw</Button>
                </div>
                <Dialog open={open} onClose={closeDialog}>
                    <DialogTitle id="alert-dialog-title">{"Withdraw application?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">Are you sure you want to withdraw this application?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDelete} color="primary">Withdraw</Button>
                        <Button onClick={closeDialog} color="primary" autoFocus>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
}