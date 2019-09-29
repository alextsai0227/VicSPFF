// Material UI
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

// React related package
import React, { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        // width: '90%',
        // margin: 'auto'
    },
}));

export default function FormSocialBenefit(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        columns: [
            { title: 'Social Enterprise ', field: 'company_name' },
            { title: 'Services They Will Provide', field: 'service_name' },
            { title: 'Potential Value', field: 'value', type: 'numeric' }
        ],
        data: window.VIC.socialBenefit,
    });

    useEffect(() => {
        //componentDidMount 及 componentDidUpdate
        const data = state.data
        window.VIC.socialBenefit = data
        console.log(`更新後的 State ${JSON.stringify(data)}`)
        //componentDidUpdate 及 componentWillUnmount
        return (() => {
            console.log(`更新前的 State ${JSON.stringify(data)}`)
        })

    })
    return (
        <div className={classes.root}>
            <h1>Verified Social Benefits</h1>
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

