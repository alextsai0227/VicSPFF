import React from 'react';
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import ViewForms from './components/ViewForms';
import ViewFormDetail from './components/ViewFormDetail';
import ViewFormsVerifier from './components/ViewFormsVerifier';
import ViewFormDetailVerifier from './components/ViewFormDetailVerifier';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import FormStepper from './components/FormStepper';
import ProfileSupplier from './components/ProfileSupplier';
import ProfileVerifier from './components/ProfileVerifier';
import GovernmentView from './components/GovernmentView';
import Home from './components/Home';
import NotFound from './components/NotFound'
import Admin from './components/Admin'
import FutureResultTable from './components/FutureResultTable'
import HistoryDetail from './components/HistoryApplications'
import './App.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={withRouter(Home)} />
          <Route exact path='/admin' component={withRouter(Admin)} />
          <Route exact path='/viewforms' component={withRouter(ViewForms)} />
          <Route exact path='/viewformsverifier' component={withRouter(ViewFormsVerifier)} />
          <Route exact path='/viewformdetail' component={withRouter(ViewFormDetail)} />
          <Route exact path='/viewformdetailverifier' component={withRouter(ViewFormDetailVerifier)} />
          <Route exact path='/signup' component={withRouter(SignUp)} />
          <Route exact path='/login' component={withRouter(LogIn)} />
          <Route exact path='/form' component={withRouter(FormStepper)} />
          <Route exact path='/sup-profile' component={withRouter(ProfileSupplier)} />
          <Route exact path='/ver-profile' component={withRouter(ProfileVerifier)} />
          <Route exact path='/gov' component={withRouter(GovernmentView)} />
          <Route exact path='/future_result' component={withRouter(FutureResultTable)} />
          <Route exact path='/history_detail' component={withRouter(HistoryDetail)} />
          <Route component={withRouter(NotFound)} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
