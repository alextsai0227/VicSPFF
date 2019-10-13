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

// React related package
import React, { useEffect, useState } from 'react';
import NaviBar from './AppBarSupplier';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useGovenmentTalbeStyles } from './Style'


const headCells = [
    { id: 'name', numeric: false, label: 'Company Name' },
    { id: 'aboriginal', numeric: true, label: 'aboriginal' },
    { id: 'disability', numeric: true, label: 'disability' },
    { id: 'refugee', numeric: true, label: 'refugee' },
    { id: 'unemployed', numeric: true,  label: 'unemployed' },
    { id: 'overall', numeric: true, label: 'overall' },
];

function getOverall(aboriginal_cur, aboriginal_fut, disability_cur, disability_fut, refugee_cur, refugee_fut, unemployed_cur, unemployed_fut) {
    console.log("abo cur " + aboriginal_cur + "abo fut " + aboriginal_fut);
    console.log("disa cur " + disability_cur + "dis fut " + disability_fut);
    console.log("ref cur " + refugee_cur + "ref fut " + refugee_fut);
    console.log("unem cur " + unemployed_cur + "unem fut " + unemployed_fut);

    const abo_score = (aboriginal_cur * 0.3 + aboriginal_fut * 0.7)
    const disa_score = (disability_cur * 0.3 + disability_fut * 0.7)
    const refu_score = (refugee_cur * 0.3 + refugee_fut * 0.7)
    const unemp_score = (unemployed_cur * 0.3 + unemployed_fut * 0.7)
    const overall = (abo_score + disa_score + refu_score + unemp_score) / 4
    return overall;
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
                        align={headCell.numeric ? 'center' : 'left'}
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

export default function GovernmentView() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        axios.get(`https://shielded-fjord-25564.herokuapp.com/api/verifier/applications`)
            .then((res) => {
                setApplications(res.data.applications);
            })
    }, applications)
    console.log("000000000000000");
    console.log(applications);

    const classes = useGovenmentTalbeStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('overall');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

    return (
        <>
            <NaviBar />
            <Container component="main" maxWidth="lg">
                <br />
                <h1> Results </h1>
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
                            <TableBody>
                                {stableSort(applications, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((application, index) => {

                                        const abo_future = (application.emp_abo.length > 0) ? application.emp_abo[0].future_emp : 0;
                                        const abo_current = (application.emp_abo.length > 0) ? application.emp_abo[0].curr_emp : 0;
                                        const disa_future = (application.emp_disability.length > 0) ? application.emp_disability[0].future_emp : 0;
                                        const disa_current = (application.emp_disability.length > 0) ? application.emp_disability[0].curr_emp : 0;
                                        const ref_future = (application.emp_refugee.length > 0) ? application.emp_refugee[0].future_emp : 0;
                                        const ref_current = (application.emp_refugee.length > 0) ? application.emp_refugee[0].curr_emp : 0;
                                        const unemp_future = (application.emp_unemploy.length > 0) ? application.emp_unemploy[0].future_emp : 0;
                                        const unemp_current = (application.emp_unemploy.length > 0) ? application.emp_unemploy[0].curr_emp : 0;
                                        return (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={application.company_name}
                                            >
                                                <TableCell component="th" scope="application" padding="default">
                                                    {application.company_name}
                                                </TableCell>
                                                <TableCell align="center">{abo_future}</TableCell>
                                                <TableCell align="center">{disa_future}</TableCell>
                                                <TableCell align="center">{ref_future}</TableCell>
                                                <TableCell align="center">{unemp_future}</TableCell>
                                                <TableCell align="center"> {getOverall(abo_current, abo_future, disa_current, disa_future, ref_current, ref_future, unemp_current, unemp_future)} </TableCell>
                                            </TableRow>
                                        );
                                    })}

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
            </Container>
        </>
    );
}