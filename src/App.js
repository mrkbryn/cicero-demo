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
} from '@blueprintjs/core';
import { Row } from 'react-bootstrap';

const monthDisplays = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minimumTimestamp: 1325317920,
      maximiumTimestamp: 1515369600,
      range: [0,100],
      vocalization: {
        fetching: false,
      }
    }
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
    })
    .catch(error => {
      this.setState({ vocalization: { fetching: false, error: error.message }})
    });
  }

  playVoiceOutput(msg) {
    var synth = window.speechSynthesis;
    var voiceOutput = new SpeechSynthesisUtterance(msg);
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
            <RangeSlider
              min={0}
              max={100}
              stepSize={1}
              labelStepSize={10}
              onChange={this.handleValueChange}
              value={this.state.range}
              renderLabel={this.renderSliderLabel}
            />
          </Row>

          <Row style={{ margin: "10px"}}>
            {this.getDateRangeDisplay()}
          </Row>

          <Row style={{ margin: "10px"}}>
            <Button disabled={this.state.vocalization.fetching} onClick={this.getVocalization}>Get Vocalization</Button>
          </Row>

          {this.state.vocalization.fetching &&
            <Spinner className="pt-large row" />
          }

          {this.state.vocalization.error &&
            <Row style={{ margin: "40px"}}>
              <NonIdealState
                visual="error"
                title="Oops! We had an issue while building a voice response"
                description={this.state.vocalization.error}
              />
            </Row>
          }

          {this.state.vocalization.result &&
            <div className="vocalization-result">
              <Row style={{ margin: "40px"}}>
                <h4>{this.state.vocalization.result}</h4>
              </Row>

              <Row style={{ margin: "40px"}}>
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
              </Row>
            </div>
          }

        </div>

        <footer className="navbar-fixed-bottom">
					<div className="container">
						<Row style={{ margin: "10px"}}>
							Cornell Database Group | <img className="App-logo" src={logo} alt="Cornell University" />
						</Row>
					</div>
				</footer>
      </div>
    );
  }
}

export default App;
