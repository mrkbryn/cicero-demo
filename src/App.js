import React, { Component } from 'react';
import './App.css';
import {
  Button,
  RangeSlider,
  Spinner,
  NonIdealState,
} from '@blueprintjs/core';
import { Row, Col } from 'react-bootstrap';
import CiceroNavbar from './CiceroNavbar';
import IntroductionComponent from './IntroductionComponent';
import Footer from './Footer';
import ConfigPanel from './ConfigPanel';

const monthDisplays = [
  "Jan", "Feb", "March", "Apr", "May",
  "Jun", "Jul", "Aug", "Sept", "Oct",
  "Nov", "Dec"
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voiceMode: true,
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
    return `${monthDisplays[date.getMonth()]} ${date.getFullYear()}`;
  }

  toggleVoiceMode = () => {
    this.setState({ voiceMode: !this.state.voiceMode });
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
    let url = `http://localhost:8080/query/timeseries?relationName=bitstampusd&startTime=${this.getLeftTimestamp()}&endTime=${this.getRightTimestamp()}&timeColumnName=timestamp&variableColumnName=close`
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
      if (this.state.voiceMode) {
        this.playVoiceOutput(response);
      }
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
            voiceMode={this.state.voiceMode}
            toggleVoiceMode={this.toggleVoiceMode}
            samplingAlgorithm={this.state.samplingAlgorithm}
            toggleSamplingMethod={this.toggleSamplingMethod}
          />

          <Row style={{ margin: "40px"}}>
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

          <Row style={{ margin: "10px", "text-align": "center" }}>
            <Col md={12}>
              <Button
                disabled={this.state.vocalization.fetching}
                onClick={this.getVocalization}
              >
                Get Vocalization
              </Button>
            </Col>
          </Row>

          {this.state.vocalization.fetching &&
            <Spinner className="pt-large row" />
          }

          {this.state.vocalization.error &&
            <Row style={{ margin: "40px"}}>
              <NonIdealState
                visual="error"
                title="Oops! We had an issue while building a voice response."
                description={this.state.vocalization.error}
              />
            </Row>
          }

          {this.state.vocalization.result && !this.state.voiceMode &&
            <div className="vocalization-result">
              <Row style={{ margin: "40px"}}>
                <Col md={12}>
                  <h4>{this.state.vocalization.result}</h4>
                </Col>
              </Row>

              <Row style={{ margin: "40px"}}>
                <Col md={12}>
                  <Button
                    className="pt-intent-success pt-icon-play"
                    style={{ margin: "10px"}}
                    onClick={() => this.playVoiceOutput(this.state.vocalization.result)}
                  >
                    Play Voice Output
                  </Button>
                </Col>
              </Row>
            </div>
          }

        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
