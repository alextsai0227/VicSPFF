import React from 'react';
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import ViewForms from './components/ViewForms';
import ViewFormDetail from './components/ViewFormDetail';
import ViewFormsVerifier from './components/ViewFormsVerifier';
import ViewFormDetailVerifier from './components/ViewFormDetailVerifier';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import FormStepper from './components/FormStepper';
import './App.css';
import FormSupplierDetail from './components/FormSupplierDetail';
import FormVerifierDetail from './components/FormVerifierDetail';
import Home from './components/Home';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={withRouter(Home)} />
          <Route exact path='/viewforms' component={withRouter(ViewForms)} />
          <Route exact path='/viewformsverifier' component={withRouter(ViewFormsVerifier)} />
          <Route exact path='/viewformdetail' component={withRouter(ViewFormDetail)} />
          <Route exact path='/viewformdetailverifier' component={withRouter(ViewFormDetailVerifier)} />
          <Route exact path='/signup' component={withRouter(SignUp)} />
          <Route exact path='/login' component={withRouter(LogIn)} />
          <Route exact path='/form' component={withRouter(FormStepper)} />
          <Route exact path='/sup-profile' component={withRouter(FormSupplierDetail)} />
          <Route exact path='/ver-profile' component={withRouter(FormVerifierDetail)} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
