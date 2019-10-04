// Material UI
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FilterListIcon from '@material-ui/icons/FilterList';
import Container from '@material-ui/core/Container';

// React related package
import React from 'react';
import NaviBar from './AppBarSupplier';
import PropTypes from 'prop-types';
import { useGovenmentTalbeStyles, useToolbarStyles } from './Style'

const headCells = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Company Name' },
    { id: 'aboriginal', numeric: true, disablePadding: false, label: 'aboriginal' },
    { id: 'disability', numeric: true, disablePadding: false, label: 'disability' },
    { id: 'refugee', numeric: true, disablePadding: false, label: 'refugee' },
    { id: 'unemployed', numeric: true, disablePadding: false, label: 'unemployed' },
    { id: 'overall', numeric: true, disablePadding: false, label: 'overall' },
];

const rows = [
    { name: "RA company", aboriginal: 5, disability: 24, refugee: 4, unemployed: 11, overall: 22.5 },
    { name: "G company", aboriginal: 30, disability: 53, refugee: 5, unemployed: 0, overall: 98.4 },
    { name: "KF company", aboriginal: 64, disability: 4, refugee: 53, unemployed: 65, overall: 68.4 },
];

function getOverall(aboriginal_cur, aboriginal_fut, disability_cur, disability_fut, refugee_cur, refugee_fut, unemployed_cur, unemployed_fut) {
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
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
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


const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const [showRed, setShowRed] = React.useState(false);
    const handleChangeRed = event => {
        setShowRed(event.target.checked);
    };

    return (
        <Toolbar>
            <div className={classes.spacer} />
            <FormControlLabel
                control={<Switch checked={showRed} onChange={handleChangeRed} />}
                label="Show Red"
            />
            <div className={classes.actions}>
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </Toolbar>
    );
};


export default function GovernmentView() {
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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <>
            <NaviBar />
            <Container component="main" maxWidth="md">
                <br />
                <h1> Results </h1>
                <Paper className={classes.root}>
                    <EnhancedTableToolbar />
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
                                {stableSort(rows, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={row.name}
                                            >
                                                <TableCell component="th" id={labelId} scope="row" padding="default">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.aboriginal}</TableCell>
                                                <TableCell align="right">{row.disability}</TableCell>
                                                <TableCell align="right">{row.refugee}</TableCell>
                                                <TableCell align="right">{row.unemployed}</TableCell>
                                                <TableCell align="right">{row.overall}</TableCell>
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
                        count={rows.length}
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
