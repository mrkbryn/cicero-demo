import React, { Component } from 'react';
import './App.css';
import logo from './cornell_logo.svg';
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Button,
  RangeSlider,
  Spinner,
  NonIdealState,
  Switch,
} from '@blueprintjs/core';
import { Row, Col } from 'react-bootstrap';

const monthDisplays = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voiceMode: true,
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

  getDateRangeDisplay() {
    let leftDate = new Date(this.getLeftTimestamp() * 1000);
    let rightDate = new Date(this.getRightTimestamp() * 1000);
    return `From ${monthDisplays[leftDate.getMonth()]} ${leftDate.getFullYear()} to ${monthDisplays[rightDate.getMonth()]} ${rightDate.getFullYear()}`
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
    this.setState({ voiceMode: !this.state.voiceMode })
  }

  getVocalization = (e) => {
    this.setState({
      vocalization: {
        fetching: true
      }
    });
    let url = `https://cicero-2.herokuapp.com/query/timeseries?relationName=bitstampusd&startTime=${this.getLeftTimestamp()}&endTime=${this.getRightTimestamp()}&timeColumnName=timestamp&variableColumnName=close`
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
        <Navbar>
          <NavbarGroup>
              <NavbarHeading>Cicero - Time Series Vocalization</NavbarHeading>
          </NavbarGroup>
        </Navbar>

        <div className="container">
          <Row style={{ margin: "20px"}}>
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

          <Row style={{ margin: "10px"}}>
            <Col md={12}>
              {this.getDateRangeDisplay()}
            </Col>
          </Row>

          <Row style={{ margin: "10px"}}>
            <Col md={6}>
              <Button disabled={this.state.vocalization.fetching} onClick={this.getVocalization}>Get Vocalization</Button>
            </Col>
            <Col md={6}>
              <Switch checked={this.state.voiceMode} onChange={this.toggleVoiceMode} label="Voice Mode" />
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
                  <Button
                    className="pt-intent-danger pt-icon-pause"
                    style={{ margin: "10px"}}
                  >
                    Pause Voice Output
                  </Button>
                </Col>
              </Row>
            </div>
          }

        </div>

        <footer className="navbar-fixed-bottom">
					<div className="container">
						<Row style={{ margin: "10px"}}>
              <Col md={12}>
							Cornell Database Group | <img className="App-logo" src={logo} alt="Cornell University" />
              </Col>
						</Row>
					</div>
				</footer>
      </div>
    );
  }
}

export default App;
