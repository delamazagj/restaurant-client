import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch } from 'react-router-dom'
import EventDashBoard from "../../features/event/EventDashboard/EventDashBoard";
import NavBar from "../../features/nav/NavBar/NavBar";
import EventForm from '../../features/event/EventForm/EventForm'
import ReceiptPage from '../../features/event/EventForm/ReceiptPage'
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard'
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage'
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard' 
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage'
import HomePage from '../../features/home/HomePage'
import TestComponent from '../../features/testarea/TestComponent'
import ModalManager from '../../features/modals/ModalManager'
import PayForm from '../../features/event/EventForm/PayForm'
//import logo from './logo.svg';
//import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <ModalManager/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
        </Switch>

        <Route path="/(.+)" render={() => (
          <div>
            <NavBar />
            <Container className="main">
              <Switch>
                <Route path='/events' component={EventDashBoard}/>
                <Route path='/test' component={TestComponent}/>
                <Route path='/event/:id' component={EventDetailedPage}/>
                <Route path='/manage/:id' component={EventForm}/>
                <Route path='/people' component={PeopleDashboard}/>
                <Route path='/profile/:id' component={UserDetailedPage}/>
                <Route path='/settings' component={SettingsDashboard}/>
                <Route path='/createEvent' component={EventForm}/>
                <Route path='/pay' component={PayForm}/>
                <Route path='/receipt' component={ReceiptPage}/>
              </Switch> 
            </Container>
          </div>
        )}/>
        
      </div>
    );
  }
}

export default App;
