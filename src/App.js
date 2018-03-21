import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import VoiceInterface from './voice_interface';
import CiceroNavbar from './CiceroNavbar';

class App extends Component {
  render() {
    // <Route path="/voice_interface" component={VoiceInterface} />
    // <Route path="/user_study" component={UserStudy} />

    return (
      <Router>
        <div className="App">
          <CiceroNavbar />
          <div className="container">
            <Route exact path="/" component={VoiceInterface} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
