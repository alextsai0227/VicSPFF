// Material UI
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

// React related package
import React, { useEffect } from 'react';

export default function FormAboEmp(props) {
    const tableOneColumns = [
        { title: 'Existing Aboriginal Employee Roles ', field: 'emp_role'},
        { title: 'Years Recruited', field: 'emp_year', type: 'numeric' }
    ]
    const tableTwoColumns = [
        { title: 'Aboriginal Roles To Be Recruited ', field: 'recruit_role' },
        { title: 'Proposed Recruitment Year', field: 'recruit_year', type: 'numeric' }
    ]
    
    const [oneData, setOneData] = React.useState({
        data: window.VIC.aboCur
    });
    
    const [twoData, setTwoData] = React.useState({
        data: window.VIC.aboEmp
    });

    useEffect(() => {
        //componentDidMount 及 componentDidUpdate
        window.VIC.aboEmp = twoData.data
        window.VIC.aboCur = oneData.data
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
                    {/* existing employment table */}
                    <MaterialTable
                        title="Existing Employment"
                        columns={tableOneColumns}
                        data={oneData.data}
                        editable={{
                            onRowAdd: newData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [...oneData.data];
                                        data.push(newData);
                                        setOneData({ ...oneData, data });
                                    }, 600);
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [...oneData.data];
                                        data[data.indexOf(oldData)] = newData;
                                        setOneData({ ...oneData, data });
                                    }, 600);
                                }),
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [...oneData.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        setOneData({ ...oneData, data });
                                    }, 600);
                                }),
                        }}
                    /></Paper>
                {/* future employment table */}
                <br /><br />
                <Paper>
                    <MaterialTable
                        title="Future Employment"
                        columns={tableTwoColumns}
                        data={twoData.data}
                        editable={{
                            onRowAdd: newData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [...twoData.data];
                                        data.push(newData);
                                        setTwoData({ ...twoData, data });
                                    }, 600);
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [...twoData.data];
                                        data[data.indexOf(oldData)] = newData;
                                        setTwoData({ ...twoData, data });
                                    }, 600);
                                }),
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [...twoData.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        setTwoData({ ...twoData, data });
                                    }, 600);
                                }),
                        }}
                    />
                </Paper>
            </Container>
        </div>
    );
}