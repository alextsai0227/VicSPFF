// Material UI
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

export default function FormPreview(props) {
  const abo_data = window.VIC.abo
  const unemployed_data = window.VIC.unemployed
  const disability_data = window.VIC.disability
  const refugee = window.VIC.refugee

  return (
    <div>
      <h1>Preview</h1>
      <Container component="main" maxWidth="lg">
                <br />
                <Typography component="h2" variant="h5" align="left">
                    Aboriginal People
                </Typography>
                <Paper>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>Current Recruitment (Number Of)</TableCell>
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
                <br /><br /><br />
                <Typography component="h2" variant="h5" align="left">
                    People With Disability
                </Typography>
                <Paper>
                    <Table >
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
                <br /><br /><br />
                <Typography component="h2" variant="h5" align="left">
                    Refugee
                </Typography>
                <Paper>
                    <Table>
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
                <br /><br /><br />
                <Typography component="h2" variant="h5" align="left">
                    Long-term Unemployed People
                </Typography>
                <Paper>
                    <Table>
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
                <br /><br />
            </Container>
    </div>
  );
}



