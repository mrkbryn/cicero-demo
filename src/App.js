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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samplingAlgorithm: true,
      minimumTimestamp: 1325317920,
      maximiumTimestamp: 1515369600,
      range: [0,100],
      vocalization: {
        fetching: false,
      }
    }
  }

  componentDidMount() {
    window.speechSynthesis.getVoices();
  }

  getLeftTimestamp() {
    let timeRange = this.state.maximiumTimestamp - this.state.minimumTimestamp;
    let leftTimestamp = (this.state.range[0] / 100) * timeRange + this.state.minimumTimestamp;
    return Math.round(leftTimestamp);
  }

  getRightTimestamp() {
    let timeRange = this.state.maximiumTimestamp - this.state.minimumTimestamp;
    let rightTimestamp = (this.state.range[1] / 100) * timeRange + this.state.minimumTimestamp;
    return Math.round(rightTimestamp);
  }

  handleValueChange = (values) => {
    this.setState({
      range: values
    })
  }

  renderSliderLabel = (value) => {
    let timeRange = this.state.maximiumTimestamp - this.state.minimumTimestamp;
    let timestamp = Math.round(this.state.minimumTimestamp + ((value / 100) * timeRange));
    let date = new Date(timestamp * 1000);
    return `${getMonthDisplayForIndex(date.getMonth())} ${date.getFullYear()}`;
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
    let url = `https://cicero-2.herokuapp.com/query/timeseries?relationName=bitstampusd&startTime=${this.getLeftTimestamp()}&endTime=${this.getRightTimestamp()}&timeColumnName=timestamp&variableColumnName=close&sampling=${this.state.samplingAlgorithm}`
    fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    })
    .then(response => {
      if (response.ok) {
        return response.text();
      }
      console.log(response.error);
      throw new Error('Failed to fetch vocalization');
    })
    .then(response => {
      this.setState({ vocalization: { fetching: false, result: response }});
      console.log(response);
      this.playVoiceOutput(response);
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
                max={100}
                stepSize={1}
                labelStepSize={10}
                onChange={this.handleValueChange}
                value={this.state.range}
                renderLabel={this.renderSliderLabel}
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
