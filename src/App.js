import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home';
import VoiceInterface from './voice_interface';
import UserStudy from './user_study';
import CiceroNavbar from './CiceroNavbar';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <CiceroNavbar />
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/voice_interface" component={VoiceInterface} />
            <Route path="/user_study" component={UserStudy} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
