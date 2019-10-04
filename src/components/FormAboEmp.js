// Material UI
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

// React related package
import React, { useEffect } from 'react';

export default function FormAboEmp(props) {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Current Recruitment (Number Of)', field: 'curr_emp', type: 'numeric'},
            { title: 'Proposed Future Recruitment (Number Of)', field: 'future_emp', type: 'numeric'},
        ],
        data: window.VIC.abo,
    });

    useEffect(() => {
        //componentDidMount 及 componentDidUpdate
        const data = state.data
        window.VIC.abo = data
        console.log(`更新後的 State`)
        //componentDidUpdate 及 componentWillUnmount
        return(()=>{
            console.log(window.VIC)
            // oneData.data = window.VIC.aboCur
            // twoData.data = window.VIC.aboEmp
            console.log(`更新前的 State `)
        })

    })
    return (
        <div>
            <h1>Aboriginal People</h1>
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