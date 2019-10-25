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
import React from 'react';
import NaviBar from './AppBarVerifier';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useViewFormsStyles } from './Style'

export default function ViewFormsVerifier(props) {
    const classes = useViewFormsStyles();
    const headCells = [
        { id: 'Application ID', alignright: false, label: 'Application ID' },
        { id: 'company_name', alignright: true, label: 'Company Name' },
        { id: 'created_date', alignright: true, label: 'Created Date' },
        { id: 'status', alignright: true, label: 'Status' },
    ];
    // conditions if (props.applications) use props.applications, if not use state
    const applications = props.location.state.applications
    const role = props.location.state.role
    let status = ''
    const filter_application = applications.filter(application => {
        switch (role) {
            case 'aboriginal':
                if(application.emp_abo.length > 0){
                    status = 'abo_existing_data_status'
                    return true
                } else {
                    return false
                }
            case 'disability':
                if(application.emp_disability.length > 0){
                    status = 'disability_data_status'
                    return true
                } else {
                    return false
                }
            case 'refugee':
                if(application.emp_refugee.length > 0){
                    status = 'refugee_data_status'
                    return true
                } else {
                    return false
                }
            case 'unemployed':
                if(application.emp_unemploy.length > 0){
                    status = 'unemployed_data_status'
                    return true
                } else {
                    return false
                }
            default:
                console.log('Sorry, no string match');
        }
    })

    function showApplicationDetail(evt) {
        console.log(evt.target.parentNode)
        axios({
            method: 'get',
            url: `https://shielded-fjord-25564.herokuapp.com/api/supplier/application/${evt.target.parentNode.getAttribute('value')}`
        }).then(res => {
            const data = props.location.state
            data.application = res.data.application
            data.applications = applications
            axios({
                method: 'get',
                url: `https://shielded-fjord-25564.herokuapp.com/api/supplier/user/${data.application.supplier_id}`
            }).then(res =>{
                data.user = res.data.user
                const path = {
                    pathname: '/viewformdetailverifier',
                    state: data,
                }
                props.history.push(path)
            }).catch(err => {

            })
            
            
        }).catch(err => {
            console.log(err)
        });
    }

    // ************** For Sorting & Pagination ***************

    const a = filter_application.map(application => {
        return {_id:application._id, company_name: application.company_name, created_date: application.created_date, status: application[status]}
    })
    
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
                            align={headCell.alignright ? 'right' : 'left'}
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

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('Status');
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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, applications.length - page * rowsPerPage);

    // *******************************************************
  
    return (
        <>
            <NaviBar />
            <Container component="main" maxWidth="md">
                <br />
                <h1> Applications To Be Verified </h1>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} >
                            <EnhancedTableHead
                                classes={classes}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody onClick={showApplicationDetail}>
                                {stableSort(a, getSorting(order, orderBy))
                                    .map((row, index) => (
                                    <TableRow value={row._id} hover >
                                        <TableCell >{(index + 1).toString().padStart(3, '0')}</TableCell>
                                        <TableCell align="right" >{row.company_name}</TableCell>
                                        <TableCell align="right" >{row.created_date.slice(0, 10)}</TableCell>
                                        <TableCell align="right" >{row.status}</TableCell>
                                    </TableRow>
                                ))}
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
                        count={filter_application.length}  
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
