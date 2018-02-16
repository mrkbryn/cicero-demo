import React, { Component } from 'react';
import './App.css';
import {
  Button,
  RangeSlider,
} from '@blueprintjs/core';
import { Row, Col } from 'react-bootstrap';
import CiceroNavbar from './CiceroNavbar';
import Intro from './Intro';
import ConfigPanel from './ConfigPanel';
import VocalizationResult from './VocalizationResult';
import NotChromeWarning from './NotChromeWarning';
import { getMonthDisplayForIndex } from './util';

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

  getMonthYearString(value) {
    let month = value % 12;
    let year = 2011 + Math.trunc(value / 12);
    return `${getMonthDisplayForIndex(month)} ${year}`;
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

  selectSampling = () => {
    this.setState({
      sampling: true
    });
  }

  selectFullData = () => {
    this.setState({
      sampling: false
    });
  }

  getVocalization = (e) => {
    window.speechSynthesis.cancel();

    if (this.state.sampling === undefined) {
      this.setState({
        vocalization: {
          error: 'Please select a method for voice generation'
        }
      });
      return;
    }

    if (this.state.userID === '') {
      this.setState({
        vocalization: {
          error: 'Please type your user ID in the provided input'
        }
      });
      return;
    }

    this.setState({
      vocalization: {
        fetching: true
      }
    });

    let startDateParam = this.getURLDateParam(this.state.range[0]);
    let endDateParam = this.getURLDateParam(this.state.range[1]);

    let url = `${api_url}/query/timeseries?relationName=bitstampusd&startDate=${startDateParam}&endDate=${endDateParam}&timeColumnName=timestamp&variableColumnName=close&sampling=${this.state.sampling}&userID=${this.state.userID}`
    fetch(url, {
      method: 'GET',
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

          <ConfigPanel
            selectSampling={this.selectSampling}
            selectFullData={this.selectFullData}
            sampling={this.state.sampling}
            setUserID={this.setUserID}
          />

          <Row>
            <Col md={6} style={{ textAlign: "left", marginLeft: "20px" }}>
              <input
                style={{ width: "300px" }}
                className="pt-input"
                type="text"
                placeholder="Enter your assigned user ID"
                onChange={this.handleUserIDChange}
              />
            </Col>
          </Row>

          <Row style={{ margin: "40px" }}>
            <Col md={12}>
              <RangeSlider
                min={0}
                max={95}
                stepSize={1}
                labelStepSize={12}
                onChange={this.handleValueChange}
                value={this.state.range}
                renderLabel={this.getMonthYearString}
              />
            </Col>
          </Row>

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
