
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToApp from '@material-ui/icons/ExitToApp';

// React related package
import React from 'react';
import { withRouter } from 'react-router-dom';
import { getApplications, getResult } from '../Helper'
import { useAppBarStyles } from './Style'

function AppBarGov(props) {
  const classes = useAppBarStyles();

  function handleLogout(evt) {
    localStorage.removeItem('token');
    props.history.push('/login')
  }

  function handleViewResult(evt){
    getResult(props)
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>

          <Typography className={classes.title} variant="h6" noWrap>VicSPF</Typography>
          <div className={classes.grow} />

          {/* view results button */}
          <Tooltip title="View Results">
            <IconButton color="inherit" onClick={handleViewResult}>
              <FindInPageOutlinedIcon />
            </IconButton>
          </Tooltip>

          {/* logout button */}
          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={handleLogout} >
              <ExitToApp />
            </IconButton>
          </Tooltip>

        </Toolbar>
      </AppBar>
    </div >
  );
}


export default withRouter(AppBarGov);