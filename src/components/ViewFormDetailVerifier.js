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
import React from 'react';
import NaviBar from './AppBarVerifier';
import { useViewFormDetailStyles } from './Style'


export default function ViewFormDetailVerifier(props) {
    const classes = useViewFormDetailStyles();
    const application = props.location.state.application
    const aboriginal_data = application.aboriginal
    const unemployed_data = application.unemployed
    const disability_data = application.disability
    const refugee_data = application.refugee

    function handleBack() {
        const path = {
            pathname: '/viewformsverifier',
            state: props.location.state,
        }
        props.history.push(path)
    }
    function handleSave() {
        
    }

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
                            Aboriginal People
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
                                <TableCell>Current Recruitment&nbsp;(Number Of)</TableCell>
                                <TableCell align="right">Proposed Future Recruitmentt&nbsp;(Number Of)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {aboriginal_data.map(row => (
                                <TableRow >
                                    <TableCell >{row.curr_emp}</TableCell>
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
                            People With Disability
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
                                <TableCell>Current Recruitment&nbsp;(Number Of)</TableCell>
                                <TableCell align="right">Proposed Future Recruitmentt&nbsp;(Number Of)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {disability_data.map(row => (
                                <TableRow >
                                    <TableCell >{row.curr_emp}</TableCell>
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
                            Refugee
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
                                <TableCell>Current Recruitment&nbsp;(Number Of)</TableCell>
                                <TableCell align="right">Proposed Future Recruitmentt&nbsp;(Number Of)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {refugee_data.map(row => (
                                <TableRow >
                                    <TableCell >{row.curr_emp}</TableCell>
                                    <TableCell align="right" >{row.future_emp}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

                <br /><br /><br />

                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Typography component="h2" variant="h5" align="left">
                            Long-term Unemployed People
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
                                <TableCell>Current Recruitment (Number Of)</TableCell>
                                <TableCell align="right">Proposed Future Recruitmentt&nbsp;(Number Of)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {unemployed_data.map(row => (
                                <TableRow >
                                    <TableCell>{row.curr_emp}</TableCell>
                                    <TableCell align="right" >{row.future_emp}</TableCell>
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