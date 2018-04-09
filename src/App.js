import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import VoiceInterface from './voice_interface'
import CiceroNavbar from './CiceroNavbar'
import InfoPage from './info'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <CiceroNavbar />
          <div className="container">
            <Route exact path="/" component={VoiceInterface} />
            <Route exact path="/info" component={InfoPage} />
          </div>
        </div>
      </Router>
    )
  }

  componentDidMount() {
    // prepare voices
    window.speechSynthesis.getVoices()
  }
}

export default App;
