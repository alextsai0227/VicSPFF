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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// React related package
import React, { useEffect } from 'react';
import NaviBar from './AppBarSupplier';
import axios from 'axios';
import { useViewFormDetailStyles } from './Style'


export default function ViewFormDetail(props) {
    const classes = useViewFormDetailStyles();
    const [open, setOpen] = React.useState(false);
    const application = props.location.state.application
    const application_id = application._id
    const abo_data = application.emp_abo
    const unemployed_data = application.emp_unemploy
    const disability_data = application.emp_disability
    const refugee = application.emp_refugee

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
    
    useEffect(() => {
        console.log(`更新後的 State`)
        if (application.status !== 'Unverified'){
            document.querySelector("#withdraw").setAttribute('hidden', '')
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
                {(abo_data.length > 0) && 
                    <div>
                        <Typography component="h2" variant="h5" align="left">
                            Aboriginal People
                        </Typography>
                        <Paper className={classes.root}>
                            <Table className={classes.table} >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Current Recruitment&nbsp;(Number Of)</TableCell>
                                        <TableCell align="right">Proposed Future Recruitmentt&nbsp;(Number Of)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {abo_data.map(row => (
                                        <TableRow >
                                            <TableCell >{row.curr_emp}</TableCell>
                                            <TableCell align="right" >{row.future_emp}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                }
                
                {(disability_data.length > 0) && 
                    <div>
                    <br /><br />
                        <Typography component="h2" variant="h5" align="left">
                            People With Disability
                        </Typography>
                        <Paper className={classes.root}>
                            <Table className={classes.table} >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Current Recruitment (Number Of)</TableCell>
                                        <TableCell align="right">Proposed Future Recruitmentt&nbsp;(Number Of)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {disability_data.map(row => (
                                        <TableRow >
                                            <TableCell >{row.curr_emp}</TableCell>
                                            <TableCell align="right" >{row.future_emp}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                }
                
                {(refugee.length > 0) && 
                    <div>
                    <br /><br />
                        <Typography component="h2" variant="h5" align="left">
                            Refugee
                        </Typography>
                        <Paper className={classes.root}>
                            <Table className={classes.table} >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Current Recruitment&nbsp;(Number Of)</TableCell>
                                        <TableCell align="right"> Proposed Future Recruitment&nbsp;(Number Of)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {refugee.map(row => (
                                        <TableRow >
                                            <TableCell >{row.curr_emp}</TableCell>
                                            <TableCell align="right" >{row.future_emp}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                }

                {(unemployed_data.length > 0) && 
                    <div>
                    <br /><br />
                        <Typography component="h2" variant="h5" align="left">
                            Long-term Unemployed People
                        </Typography>
                        <Paper className={classes.root}>
                            <Table className={classes.table} >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Current Recruitment (Number Of)</TableCell>
                                        <TableCell align="right">Proposed Future Recruitmentt&nbsp;(Number Of)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {unemployed_data.map(row => (
                                        <TableRow >
                                            <TableCell >{row.curr_emp}</TableCell>
                                            <TableCell align="right" >{row.future_emp}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                }                
                <br /><br />
                <div>
                    <Button onClick={handleBack} className={classes.button} >Back</Button>
                    <Button variant="contained" color="secondary" onClick={showDialog} className={classes.button} id='withdraw'>Withdraw</Button>
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