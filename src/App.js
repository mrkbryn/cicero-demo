import React, { Component } from 'react';
import './App.css';
import { Button } from '@blueprintjs/core';
import { Row, Col } from 'react-bootstrap';
import CiceroNavbar from './CiceroNavbar';
import Intro from './Intro';
import TimeRangeSlider from './TimeRangeSlider';
import VocalizationResult from './VocalizationResult';
import NotChromeWarning from './NotChromeWarning';
import { getDateStringFromRangeValue } from './util';

const api_url = process.env.REACT_APP_CICERO_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      range: [0,95],
      vocalization: {
        fetching: false,
      },
      userID: ''
    }
  }

  componentDidMount() {
    window.speechSynthesis.getVoices();
  }

  getURLDateParam(value) {
    let month = (value % 12) + 1;
    let year = 2011 + Math.trunc(value / 12);
    return `${year}-${month}-01`; // yyyy-MM-dd
  }

  handleValueChange = (values) => {
    this.setState({
      range: values
    })
  }

  setTimeRange = (values) => {
    this.setState({
      range: values
    });
  }

  getVocalization = (e) => {
    window.speechSynthesis.cancel();

    if (this.state.userID === '') {
      this.setState({
        vocalization: {
          error: 'Please type your user AMT ID in the provided input'
        }
      });
      return;
    }

    this.setState({
      vocalization: {
        fetching: true
      }
    });

    let startDateParam = getDateStringFromRangeValue(this.state.range[0]);
    let endDateParam = getDateStringFromRangeValue(this.state.range[1]);

    console.log(startDateParam);
    console.log(endDateParam);

    let url = `${api_url}/query/timeseries/vocalization`
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        relationName: 'bitstampusd',
        timeColumnName: 'timestamp',
        variableColumnName: 'close',
        startDate: startDateParam,
        endDate: endDateParam,
        userID: this.state.userID
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(response => response.json())
    .then(json => {
      if (json.error) {
        this.setState({ vocalization: { fetching: false, error: json.message }});
      } else {
        this.setState({ vocalization: { fetching: false, result: json.vocalization }});
        this.playVoiceOutput(json.vocalization);
      }
    })
    .catch(error => {
      console.log(error);
      this.setState({ vocalization: { fetching: false, error: 'We were unable to connect to CiceroDB' }});
    });
  }

  playVoiceOutput(msg) {
    var synth = window.speechSynthesis;
    var voices = synth.getVoices();
    var voiceOutput = new SpeechSynthesisUtterance(msg);
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].voiceURI === 'Google UK English Female') {
        voiceOutput.voice = voices[i];
        break;
      }
    }
    synth.speak(voiceOutput);
  }

  handleUserIDChange = (event) => {
    this.setState({ userID: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <CiceroNavbar />

        <div className="container">
          <NotChromeWarning />

          <Intro />

          <Row>
            <Col md={6} style={{ textAlign: "left", marginLeft: "20px" }}>
              <input
                style={{ width: "300px" }}
                className="pt-input"
                type="text"
                placeholder="Enter your AMT user ID"
                onChange={this.handleUserIDChange}
              />
            </Col>
          </Row>

          <TimeRangeSlider
            range={this.state.range}
            setTimeRange={this.setTimeRange}
          />

          <Row style={{ margin: "10px", textAlign: "center" }}>
            <Col md={12}>
              <Button
                disabled={this.state.vocalization.fetching}
                onClick={this.getVocalization}
              >
                Get Vocalization
              </Button>
            </Col>
          </Row>

          <VocalizationResult
            fetching={this.state.vocalization.fetching}
            error={this.state.vocalization.error}
            result={this.state.vocalization.result}
          />
        </div>
      </div>
    );
  }
}

export default App;
