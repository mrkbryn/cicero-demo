import React, { Component } from 'react';
import './App.css';
import {
  Button,
  RangeSlider,
} from '@blueprintjs/core';
import { Row, Col } from 'react-bootstrap';
import CiceroNavbar from './CiceroNavbar';
import IntroductionComponent from './IntroductionComponent';
import Footer from './Footer';
import ConfigPanel from './ConfigPanel';
import VocalizationResult from './VocalizationResult';
import { getMonthDisplayForIndex } from './util';

const api_url = process.env.REACT_APP_CICERO_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samplingAlgorithm: true,
      range: [0,95],
      vocalization: {
        fetching: false,
      }
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

  toggleSamplingMethod = () => {
    this.setState({ samplingAlgorithm: !this.state.samplingAlgorithm });
  }

  getVocalization = (e) => {
    this.setState({
      vocalization: {
        fetching: true
      }
    });
    window.speechSynthesis.cancel();
    let startDateParam = this.getURLDateParam(this.state.range[0]);
    let endDateParam = this.getURLDateParam(this.state.range[1]);
    let url = `${api_url}/query/timeseries?relationName=bitstampusd&startDate=${startDateParam}&endDate=${endDateParam}&timeColumnName=timestamp&variableColumnName=close&sampling=${this.state.samplingAlgorithm}`
    fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      console.log(response.error);
      throw new Error('Failed to fetch vocalization');
    })
    .then(json => {
      this.setState({ vocalization: { fetching: false, result: json.vocalization }});
      console.log(json);
      this.playVoiceOutput(json.vocalization);
    })
    .catch(error => {
      this.setState({ vocalization: { fetching: false, error: error.message }})
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

  render() {
    return (
      <div className="App">
        <CiceroNavbar />

        <div className="container">
          <IntroductionComponent />
          <ConfigPanel
            samplingAlgorithm={this.state.samplingAlgorithm}
            toggleSamplingMethod={this.toggleSamplingMethod}
          />

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

        <Footer />
      </div>
    );
  }
}

export default App;
