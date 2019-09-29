// Material UI
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

// React related package
import React, { useState, useEffect } from 'react';

export default function FormCohortsEmp(props) {
    const [state, setState] = useState({
        columns: [
            { title: 'Group ', field: 'group_name' },
            { title: 'Current Number Employed', field: 'curr_emp', type: 'numeric' },
            { title: 'Proposed Future Recruitment', field: 'future_emp', type: 'numeric' }
        ],
        data: window.VIC.cohortEmp,
    });

    useEffect(() => {
        //componentDidMount 及 componentDidUpdate
        const data = state.data
        window.VIC.cohortEmp = data
        console.log(`更新後的 State ${JSON.stringify(data)}`)
        //componentDidUpdate 及 componentWillUnmount
        return (() => {
            console.log(`更新前的 State ${JSON.stringify(data)}`)
        })

    })

    return (
        <div>
            <h1>Cohorts Employment</h1>
            <Container component="main" maxWidth="lg">
                <Paper>
                    <MaterialTable
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
