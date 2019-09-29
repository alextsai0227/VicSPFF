// Material UI
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

// React related package
import React, { useState, useEffect } from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        // width: '100%',
        // marginTop: theme.spacing(3),
        // overflowX: 'auto',
    },
}));

export default function FormJobReadiness(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        columns: [
            { title: 'Group ', field: 'group_name' },
            { title: 'Number of People', field: 'num_people', type: 'numeric' },
            { title: 'Number of Hours', field: 'num_hour', type: 'numeric' }
        ],
        data: window.VIC.jobReadiness,
    });

    useEffect(() => {
        //componentDidMount 及 componentDidUpdate
        const data = state.data
        window.VIC.jobReadiness = data
        console.log(`更新後的 State ${JSON.stringify(data)}`)
        //componentDidUpdate 及 componentWillUnmount
        return (() => {
            console.log(`更新前的 State ${JSON.stringify(data)}`)
        })

    })

    return (
        <div className={classes.root}>
            <h1>Job Readiness Activities</h1>
            <Container component="main" maxWidth="lg">
                <Paper className={classes.root}>
                    <MaterialTable
                        className={classes.table}
                        columns={state.columns}
                        data={state.data}
                        editable={{
                            onRowAdd: newData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [...state.data];
                                        data.push(newData);
                                        setState({ ...state, data });
                                    }, 600);
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [...state.data];
                                        data[data.indexOf(oldData)] = newData;
                                        setState({ ...state, data });
                                    }, 600);
                                }),
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [...state.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        setState({ ...state, data });
                                    }, 600);
                                }),
                        }}
                    />
                </Paper>
            </Container>
        </div>
    );
}

