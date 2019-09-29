// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

// React related package
import React from 'react';
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
}));

const rows = [
    { realId: "a094rgj9", showId: "0001", date: "2019/09/20", status: "Unverified" },
    { realId: "b09erwj9", showId: "0002", date: "2019/09/01", status: "Verifying" },
    { realId: "cwre4rj9", showId: "0003", date: "2019/08/11", status: "Completed" },
]

export default function ViewFormsVerifier(props) {
    const classes = useStyles();
    // conditions if (props.applications) use props.applications, if not use state
    console.log(props.location.state)
    const applications = props.location.state.applications
    function showApplicationDetail(evt) {
        axios({
            method: 'get',
            url: `https://shielded-fjord-25564.herokuapp.com/api/supplier/application/${evt.target.parentNode.getAttribute('value')}`
          }).then(res => {
              const data = {}
              data.application = res.data.application
              data.applications = applications
              const path = {
                pathname: '/viewformdetailverifier',
                state: data,
              }
              props.history.push(path)
          }).catch(err => {
              console.log(err)
          });
    }

    return (
        <>
            <NaviBar />
            <Container component="main" maxWidth="md">
                <br />
                <h1> Application To Be Verified </h1>
                <Paper className={classes.root}>
                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                                <TableCell>Application ID</TableCell>
                                <TableCell align="right">Created Date</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody onClick={showApplicationDetail}>
                            {applications.map((row, index) => (
                                <TableRow value={row._id} hover={true} >
                                    <TableCell >{(index + 1).toString().padStart(3,'0')}</TableCell>
                                    <TableCell align="right" >{row.created_date.slice(0,10)}</TableCell>
                                    <TableCell align="right" >{row.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        </>
    );
}
