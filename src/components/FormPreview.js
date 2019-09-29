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

// React related package
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    // width: '100%',
    // marginTop: theme.spacing(3),
    // overflowX: 'auto',
  },
}));

export default function FormPreview(props) {
  const classes = useStyles();
  const abo_existing_data = window.VIC.aboCur
  const abo_future_data = window.VIC.aboEmp
  const cohorts_data = window.VIC.cohortEmp
  const social_benefit_data = window.VIC.socialBenefit
  const job_readiness_data = window.VIC.jobReadiness

  return (
    <div className={classes.root}>
      <h1>Preview</h1>
      <Container component="main" maxWidth="lg">
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
            </Container>
    </div>
  );
}



