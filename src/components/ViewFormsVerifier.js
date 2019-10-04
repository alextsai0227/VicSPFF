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
import { useViewFormsStyles } from './Style'


export default function ViewFormsVerifier(props) {
    const classes = useViewFormsStyles();
    // conditions if (props.applications) use props.applications, if not use state
    const applications = props.location.state.applications
    const role = props.location.state.role
    const filter_application = applications.filter(application => {
        switch (role) {
            case 'aboriginal':
                if(application.emp_abo.length > 0){
                    return true
                }else{
                    return false
                }
            case 'disability':
                if(application.emp_disability.length > 0){
                    return true
                }else{
                    return false
                }
            case 'refugee':
                if(application.emp_refugee.length > 0){
                    return true
                }else{
                    return false
                }
            case 'unemployed':
                if(application.emp_unemploy.length > 0){
                    return true
                }else{
                    return false
                }
            default:
              console.log('Sorry, no string match');
        }
    })
    function showApplicationDetail(evt) {
        axios({
            method: 'get',
            url: `https://shielded-fjord-25564.herokuapp.com/api/supplier/application/${evt.target.parentNode.getAttribute('value')}`
          }).then(res => {
              const data = props.location.state
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
                                <TableCell align="right">Company Name</TableCell>
                                <TableCell align="right">Created Date</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody onClick={showApplicationDetail}>
                            {filter_application.map((row, index) => (
                                <TableRow value={row._id} hover={true} >
                                    <TableCell >{(index + 1).toString().padStart(3,'0')}</TableCell>
                                    <TableCell align="right" >{row.company_name}</TableCell>
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
