import React from 'react';

import './App.css';

import Header from './components/Layouts/Header'
import { Switch, Route } from 'react-router';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Login from './components/Auth/Login/Login';
import Signup from './components/Auth/Signup/Signup';


function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/profile' component={Profile} />
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
