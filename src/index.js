import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// global object (global variable) 
const VIC= {};
window.VIC = VIC

ReactDOM.render((
    <MuiThemeProvider>
        <BrowserRouter>
            <App />
        </ BrowserRouter>
    </MuiThemeProvider>
), document.getElementById('root'));
