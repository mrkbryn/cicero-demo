import React, { Component } from 'react';
import './App.css';
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Button,
  RangeSlider,
} from '@blueprintjs/core';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minimumTimestamp: 1325317920,
      maximiumTimestamp: 1515369600,
      range: [0,100],
      vocalization: 'Select dates and run vocalization to see the output here.'
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
    return `From ${leftDate} to ${rightDate}`
  }

  handleValueChange = (values) => {
    this.setState({
      range: values
    })
  }

  getVocalization = (e) => {
    let url = `http://localhost:8080/query/timeseries?relationName=bitstampusd&startTime=${this.getLeftTimestamp()}&endTime=${this.getRightTimestamp()}&timeColumnName=timestamp&variableColumnName=close`
    fetch(url, {
      headers: {
        'Content-Type': 'text/plain'
      }
    }).then(response => {
      response.text().then(text => {
        this.setState({ vocalization: text });
      });
    });
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
          <div className="row" style={{ margin: "20px"}}>
            <RangeSlider
              min={0}
              max={100}
              stepSize={1}
              labelStepSize={10}
              onChange={this.handleValueChange}
              value={this.state.range}
            />
          </div>

          <div className="row" style={{ margin: "10px"}}>
            {this.getDateRangeDisplay()}
          </div>

          <div className="row" style={{ margin: "10px"}}>
            <Button onClick={this.getVocalization}>Get Vocalization</Button>
          </div>

          <div>
            {this.state.vocalization}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
