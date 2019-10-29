// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from 'material-ui/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// React related package
import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import NaviBar from './AppBarGov';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useInputState } from './Hooks';
import { useGovenmentTalbeStyles } from './Style'

const headCells = [
    { id: 'company_name', aligncenter: 'left', label: 'Company Name' },
    { id: 'aboriginal', aligncenter: 'center', label: 'Aboriginal' },
    { id: 'disability', aligncenter: 'center', label: 'Disability' },
    { id: 'refugee', aligncenter: 'center', label: 'Refugee' },
    { id: 'unemployed', aligncenter: 'center', label: 'Unemployed' },
    { id: 'overall', aligncenter: 'center', label: 'overall' },
    { id: 'created_date', aligncenter: 'right', label: 'Created Date' },
];

function getOverall(w_curr, w_fut, aboriginal_cur, aboriginal_fut, disability_cur, disability_fut, refugee_cur, refugee_fut, unemployed_cur, unemployed_fut) {
    const abo_score = (aboriginal_cur * w_curr + aboriginal_fut * w_fut)
    const disa_score = (disability_cur * w_curr + disability_fut * w_fut)
    const refu_score = (refugee_cur * w_curr + refugee_fut * w_fut)
    const unemp_score = (unemployed_cur * w_curr + unemployed_fut * w_fut)
    const overall = (abo_score + disa_score + refu_score + unemp_score) / 4
    const rounded_overall = Math.round(overall * 100) / 100
    return rounded_overall;
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={(() => {
                            switch (headCell.aligncenter) {
                                case 'left': return 'left';
                                case 'right': return 'right';
                                default: return 'center';
                            }
                        })()}
                        padding='default'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={order}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default function GovernmentView(props) {


    let r_role = ''
    if (props.location && props.location.state) {
        const data = props.location.state
        r_role = data.role
    } else {
        if (window.localStorage.token) {
            axios({
                method: 'get',
                url: `https://shielded-fjord-25564.herokuapp.com/api/gov/current`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${window.localStorage.token}`
                },
            }).then(res => {
                r_role = res.data.user.role
                updateRole(r_role)
            }).catch((err) => {
                console.log(err.response)
            });
        } else {
            props.history.push('login')
        }
    }

    const classes = useGovenmentTalbeStyles();
    const [open, setOpen] = React.useState(false);
    const [applications, setApplications] = useState([]);
    const [role, updateRole] = useState(r_role);
    const [w_curr, update_w_curr] = useInputState(0.3);
    const [w_fut, update_w_fut] = useInputState(0.7);

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('overall');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        axios.get(`https://shielded-fjord-25564.herokuapp.com/api/verifier/applications`)
            .then((res) => {
                setApplications(res.data.applications);
                window.applications = res.data.applications
            })

    }, applications)

    const a = applications.map(application => {
        const abo_status = application.abo_existing_data_status;
        const disa_status = application.disability_data_status;
        const ref_status = application.refugee_data_status;
        const unemp_status = application.unemployed_data_status;
        const abo_future = (application.emp_abo.length > 0 && application.emp_abo[0].future_emp != null) ? Number(application.emp_abo[0].future_emp) : 0;
        const abo_current = (application.emp_abo.length > 0 && application.emp_abo[0].curr_emp != null) ? Number(application.emp_abo[0].curr_emp) : 0;
        const disa_future = (application.emp_disability.length > 0 && application.emp_disability[0].future_emp != null) ? Number(application.emp_disability[0].future_emp) : 0;
        const disa_current = (application.emp_disability.length > 0 && application.emp_disability[0].curr_emp != null) ? Number(application.emp_disability[0].curr_emp) : 0;
        const ref_future = (application.emp_refugee.length > 0 && application.emp_refugee[0].future_emp != null) ? Number(application.emp_refugee[0].future_emp) : 0;
        const ref_current = (application.emp_refugee.length > 0 && application.emp_refugee[0].curr_emp != null) ? Number(application.emp_refugee[0].curr_emp) : 0;
        const unemp_future = (application.emp_unemploy.length > 0 && application.emp_unemploy[0].future_emp != null) ? Number(application.emp_unemploy[0].future_emp) : 0;
        const unemp_current = (application.emp_unemploy.length > 0 && application.emp_unemploy[0].curr_emp != null) ? Number(application.emp_unemploy[0].curr_emp) : 0;
        const overall = getOverall(w_curr, w_fut, abo_current, abo_future, disa_current, disa_future, ref_current, ref_future, unemp_current, unemp_future)
        return {
            abo_status: abo_status, disa_status: disa_status,
            ref_status: ref_status, unemp_status: unemp_status,
            abo_current: abo_current, disa_current: disa_current,
            ref_current: ref_current, unemp_current: unemp_current,
            overall: overall,
            company_name: application.company_name,
            created_date: application.created_date
        }
    })

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleFuture = () => {
        const data = { role: role }
        const path = {
            pathname: '/future_result',
            state: data,
        }
        props.history.push(path)
    }

    const showHistoryDetails = (evt) => {
        const filter_applications = window.applications.filter(application => application.company_name === evt.target.parentNode.getAttribute('value'))
        const chart_data = filter_applications.map(application => {
            return ({
                "year": application.created_date.substring(0, 4),
                "aboriginal": application.emp_abo[0] ? application.emp_abo[0].curr_emp : 0,
                "aboriginalColor": "hsl(98, 70%, 50%)",
                "disability": application.emp_disability[0] ? application.emp_disability[0].curr_emp : 0,
                "disabilityColor": "hsl(111, 70%, 50%)",
                "refugee": application.emp_refugee[0] ? application.emp_refugee[0].curr_emp : 0,
                "refugeeColor": "hsl(268, 70%, 50%)",
                "unemployed": application.emp_unemploy[0] ? application.emp_unemploy[0].curr_emp : 0,
                "unemployedColor": "hsl(170, 70%, 50%)"
            })
        })
        const data = { data: chart_data, company_name: evt.target.parentNode.getAttribute('value') }
        const path = {
            pathname: '/history_detail',
            state: data,
        }
        props.history.push(path)
    }

    function showDialog() {
        setOpen(true);
    }

    function closeDialog() {
        setOpen(false);
    }

    function validateWeight() {
        console.log("w_curr = " + w_curr + "   w_fut = " + w_fut);
        if (w_curr + w_fut != 1) {
            showDialog()
        }
    };


    var GovView;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, applications.length - page * rowsPerPage);

    if (role === 'gov') {
        GovView =

            <div>
                <NaviBar />
                <Container component="main" maxWidth="lg">
                    <br />
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <Typography component="h2" variant="h5" align="left">
                                Current Employment Results
                        </Typography>
                        </Grid>
                        <Grid item xs={4} align="right">
                            <Button onClick={handleFuture} color="primary"  >Future Employee</Button>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={6}
                        direction="row"
                        alignItems="center"
                        justify="center">
                        <Grid item xs={3}><h6>Weight For Current Recruitment</h6></Grid>
                        <Grid item xs={1}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                defaultValue="0.3"
                                type="number"
                                min="0" max="1" step="0.05"
                                id="w_curr"
                                label="Weight For Current Employment"
                                name="w_curr"
                                value={w_curr}
                                onChange={e => update_w_curr(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}><h6>Weight For Future Recruitment</h6></Grid>
                        <Grid item xs={1}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                defaultValue="0.7"
                                type="number"
                                min="0" max="1" step="0.05"
                                id="w_fut"
                                label="Weight For Future Recruitment"
                                name="w_fut"
                                value={w_fut}
                                onChange={e => update_w_fut(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={validateWeight}
                            >Recalculate Overall</Button>
                        </Grid>
                    </Grid>
                    <Paper className={classes.root}>
                        <div className={classes.tableWrapper}>
                            <Table
                                className={classes.table}
                                size='medium'
                            >
                                <EnhancedTableHead
                                    classes={classes}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody onClick={showHistoryDetails}>
                                    {stableSort(a, getSorting(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((application, index) => {

                                            return (
                                                <TableRow
                                                    hover
                                                    tabIndex={-1}
                                                    key={index}
                                                    value={application.company_name}
                                                >
                                                    <TableCell component="th" id={index} scope="application" padding="default">
                                                        {application.company_name}
                                                    </TableCell>
                                                    <TableCell align="center" style={(() => {
                                                        switch (application.abo_status) {
                                                            case "confirm": return { color: "#32CD32", };
                                                            case "refute": return { color: "#FF0000", };
                                                            default: return { color: "#000000", };
                                                        }
                                                    })()}>{application.abo_current}</TableCell>

                                                    <TableCell align="center" style={(() => {
                                                        switch (application.disa_status) {
                                                            case "confirm": return { color: "#32CD32", };
                                                            case "refute": return { color: "#FF0000", };
                                                            default: return { color: "#000000", };
                                                        }
                                                    })()}>{application.disa_current}</TableCell>

                                                    <TableCell align="center" style={(() => {
                                                        switch (application.refugee_status) {
                                                            case "confirm": return { color: "#32CD32", };
                                                            case "refute": return { color: "#FF0000", };
                                                            default: return { color: "#000000", };
                                                        }
                                                    })()}>{application.ref_current}</TableCell>

                                                    <TableCell align="center" style={(() => {
                                                        switch (application.unemp_status) {
                                                            case "confirm": return { color: "#32CD32", };
                                                            case "refute": return { color: "#FF0000", };
                                                            default: return { color: "#000000", };
                                                        }
                                                    })()}>{application.unemp_current}</TableCell>

                                                    <TableCell align="center">{application.overall} </TableCell>
                                                    <TableCell align="center">{application.created_date.slice(0, 10)} </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <TablePagination
                            rowsPerPageOptions={[10, 20]}
                            component="div"
                            count={applications.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>

                    <Dialog open={open} onClose={closeDialog}>
                        <DialogTitle id="alert-dialog-title">{"Incorrect Weight Sum"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">The two weights must sum to 1.</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeDialog} color="primary" autoFocus>OK</Button>
                        </DialogActions>
                    </Dialog>

                </Container>
            </div>
    } else {
        GovView = <Redirect to="/notFound" />
    }


    return (
        <div>
            {GovView}
        </div>


    );
}