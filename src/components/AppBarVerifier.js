// Material UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';

// React related package
import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
}));

function AppBarVerifier(props) {
  const classes = useStyles();

  function handleViewProfile() {
    const path = {
      pathname: '/ver-profile',    
      state: props.location.state,
    }
    props.history.push(path)
  }

  function handleLogout(evt) {
    localStorage.removeItem('token');
    props.history.push('/login')
  }

  function handleViewForm(evt){
    axios({
      method: 'get',
      url: `https://shielded-fjord-25564.herokuapp.com/api/verifier/applications`
    }).then(res => {
        console.log(res)
        const data = {}
        data.applications = res.data.applications
        const path = {
          pathname: '/viewformsverifier',
          state: data,
        }
        props.history.push(path)
    }).catch(err => {
        console.log(err)
    });
    


  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>

          <Typography className={classes.title} variant="h6" noWrap>VicSPF</Typography>
          <div className={classes.grow} />

          {/* view all applications to be verified */}
          <Tooltip title="Verify Forms">
            <IconButton color="inherit" onClick={handleViewForm}>
              <FindInPageOutlinedIcon />
            </IconButton>
          </Tooltip>

          {/* profile button */}
          <Tooltip title="My Profile">
            <IconButton color="inherit" onClick={handleViewProfile}>
              <AccountCircleIcon />
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


export default withRouter(AppBarVerifier);