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
import { useViewFormDetailStyles } from './Style'
import axios from 'axios';



export default function ViewFormDetailVerifier(props) {
    const application = props.location.state.application
    const aboriginal_data = application.emp_abo
    const unemployed_data = application.emp_unemploy
    const disability_data = application.emp_disability
    const refugee_data = application.emp_refugee
    const processing = 'Processing'
    // check the role
    let abo_role = false
    let disability_role = false
    let refugee_role = false
    let unemployed_role = false
    // check the button
    let abo_button = application.abo_existing_data_status ? true : false
    let disability_button = application.disability_data_status ? true : false
    let refugee_button = application.refugee_data_status ? true : false
    let unemployed_button = application.unemployed_data_status ? true : false

    const classes = useViewFormDetailStyles();

    const [abo_existing_data_button, toggleAboExisting] = useToggle(abo_button);
    const [disability_data_button, toggleDisability] = useToggle(disability_button);
    const [refugee_data_button, toggleRefugee] = useToggle(refugee_button);
    const [unemployed_data_button, toggleUnemployed] = useToggle(unemployed_button);

    const [abo_existing_data_status, setAboExisting] = useInputState('');
    const [disability_data_status, setDisability] = useInputState('');
    const [refugee_data_status, setRefugee] = useInputState('');
    const [unemployed_data_status, setUnemployed] = useInputState('');

    switch (window.localStorage.role) {
        case 'aboriginal':
          abo_role = true
          break;
        case 'disability':
          disability_role = true
          break;
        case 'refugee':
          refugee_role = true
          break;
        case 'unemployed':
          unemployed_role = true
          break;
        default:
          console.log('Sorry, no string match');
    }

    function handleBack() {
        const path = {
            pathname: '/viewformsverifier',
            state: props.location.state,
        }
        props.history.push(path)
    }
    function handleSave() {
        let update_data = application; 
        if (abo_existing_data_status !== ''){
            update_data.emp_abo[0].abo_existing_data_status = abo_existing_data_status
            update_data.abo_existing_data_status = abo_existing_data_status
            update_data.status = processing
        }else if(disability_data_status !== ''){
            update_data.emp_abo[0].disability_data_status = disability_data_status
            update_data.disability_data_status = disability_data_status
            update_data.status = processing
        }else if(refugee_data_status !== ''){
            update_data.emp_abo[0].refugee_data_status = refugee_data_status
            update_data.refugee_data_status = refugee_data_status
            update_data.status = processing
        }else if(unemployed_data_status !== ''){
            update_data.emp_abo[0].unemployed_data_status = unemployed_data_status
            update_data.unemployed_data_status = unemployed_data_status
            update_data.status = processing
        }
        axios({
            method: 'put',
            url: `http://localhost:8001/api/supplier/application/${application._id}`,
            data: { data: update_data },
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            const data = props.location.state
            let foundIndex = data.applications.findIndex(x => x._id == application._id);
            data.applications[foundIndex] = update_data;
            const path = {
            pathname: '/viewformsverifier',
            state: data,
            }
            props.history.push(path)
        }).catch(err => {
            console.log(err)
        });
    }

    function handleStatus(e){
        const str = e.target.getAttribute('value') ? e.target.getAttribute('value'):e.target.parentNode.getAttribute('value') 

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
            case 'disability_data_confirm':
              toggleDisability()
              setDisability('confirm')
              document.querySelector("#disability_data_refute").setAttribute('hidden', '')
              break;
            case 'disability_data_refute':
              toggleDisability()
              setDisability('refute')
              document.querySelector("#disability_data_confirm").setAttribute('hidden', '')
              break;
            case 'refugee_data_confirm':
              toggleRefugee()
              setRefugee('confirm')
              document.querySelector("#refugee_data_refute").setAttribute('hidden', '')
              break;
            case 'refugee_data_refute':
              toggleRefugee()
              setRefugee('refute')
              document.querySelector("#refugee_data_confirm").setAttribute('hidden', '')
              break;
            case 'unemployed_data_confirm':
              toggleUnemployed()
              setUnemployed('confirm')
              document.querySelector("#unemployed_data_refute").setAttribute('hidden', '')
              break;
            case 'unemployed_data_refute':
              toggleUnemployed()
              setUnemployed('refute')
              document.querySelector("#unemployed_data_confirm").setAttribute('hidden', '')
              break;
            default:
              console.log('Sorry, no string match');
        }
    }

    useEffect(() => {
        console.log(`更新後的 State`)
        if (application.abo_existing_data_status && abo_role){
            if(application.abo_existing_data_status === 'confirm'){
                document.querySelector("#abo_existing_data_refute").setAttribute('hidden', '')
            }else{
                document.querySelector("#abo_existing_data_confirm").setAttribute('hidden', '')
            }
        }else if(application.disability_data_status && disability_role){
            if(application.disability_data_status === 'confirm'){
                document.querySelector("#disability_data_refute").setAttribute('hidden', '')
            }else{
                document.querySelector("#disability_data_confirm").setAttribute('hidden', '')
            }
        }else if(application.refugee_data_status && refugee_role){
            if(application.refugee_data_status === 'confirm'){
                document.querySelector("#refugee_data_refute").setAttribute('hidden', '')
            }else{
                document.querySelector("#refugee_data_confirm").setAttribute('hidden', '')
            }
        }else if(application.unemployed_data_status && unemployed_role){
            if(application.unemployed_data_status === 'confirm'){
                document.querySelector("#unemployed_data_refute").setAttribute('hidden', '')
            }else{
                document.querySelector("#unemployed_data_confirm").setAttribute('hidden', '')
            }
        }
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
                <h1> Application Details</h1>
                <br />
                {abo_role && 
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={8}>
                                <Typography component="h2" variant="h5" align="left">
                                    Aboriginal People
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
                    </div>
                }

                {disability_role && 
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={8}>
                                <Typography component="h2" variant="h5" align="left">
                                    People With Disability
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                    <Button 
                                        onClick={handleStatus} 
                                        id='disability_data_refute' 
                                        value='disability_data_refute' 
                                        disabled={disability_data_button} 
                                        color='primary' 
                                        variant='outlined'>
                                            Refute
                                    </Button>
                                    <Button 
                                        onClick={handleStatus} 
                                        id='disability_data_confirm' 
                                        value='disability_data_confirm' 
                                        disabled={disability_data_button} 
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
                    </div>
                }

                {refugee_role && 
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={8}>
                                <Typography component="h2" variant="h5" align="left">
                                    Refugee
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                    <Button 
                                        onClick={handleStatus} 
                                        id='refugee_data_refute' 
                                        value='refugee_data_refute' 
                                        disabled={refugee_data_button} 
                                        color='primary' 
                                        variant='outlined'>
                                            Refute
                                    </Button>
                                    <Button 
                                        onClick={handleStatus} 
                                        id='refugee_data_confirm' 
                                        value='refugee_data_confirm' 
                                        disabled={refugee_data_button} 
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
                    </div>
                }

                {unemployed_role && 
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={8}>
                                <Typography component="h2" variant="h5" align="left">
                                    Long-term Unemployed People
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                    <Button 
                                        onClick={handleStatus} 
                                        id='unemployed_data_refute' 
                                        value='unemployed_data_refute' 
                                        disabled={unemployed_data_button} 
                                        color='primary' 
                                        variant='outlined'>
                                            Refute
                                    </Button>
                                    <Button 
                                        onClick={handleStatus} 
                                        id='unemployed_data_confirm' 
                                        value='unemployed_data_confirm' 
                                        disabled={unemployed_data_button} 
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
                    </div>
                }
                <br /><br />
                <div>
                    <Button onClick={handleBack} variant="contained" className={classes.button} >Back</Button>
                    <Button onClick={handleSave} variant="contained" color="primary" className={classes.button} >Save</Button>
                </div>
            </Container>
        </div>
    );
}