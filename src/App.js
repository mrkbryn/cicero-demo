import React, { Component } from 'react';
import './App.css';
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Button,
} from '@blueprintjs/core';
import { DateRangePicker } from '@blueprintjs/datetime';
import {
  ButtonGroup
} from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      vocalization: 'Select dates and run vocalization to see the output here.'
    }
  }

  handleTableSelection = (e) => {
    console.log(e);
  }

  handleDateChange = (selectedDates) => {
    this.setState({
        startDate: selectedDates[0],
        endDate: selectedDates[1]
    })
  }

  getVocalization = (e) => {
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;
    if (startDate !== null && endDate !== null) {
      let startTimestamp = startDate.getTime() / 1000;
      let endTimestamp = endDate.getTime() / 1000;
      let url = `http://localhost:8080/query/timeseries?relationName=bitstampusd&startTime=${startTimestamp}&endTime=${endTimestamp}&timeColumnName=timestamp&variableColumnName=close`
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
  }

  render() {
    return (
      <div className="App">
        <Navbar>
          <NavbarGroup>
              <NavbarHeading>Cicero - Time Series</NavbarHeading>
          </NavbarGroup>
        </Navbar>

        <div className="container">
          <ButtonGroup>
            <Button onClick={this.handleTableSelection}>bitstampusd</Button>
            <Button onClick={this.handleTableSelection}>coinbaseusd</Button>
            <Button onClick={this.handleTableSelection}>sensor</Button>
          </ButtonGroup>

          <div className="row">
            <DateRangePicker
              value={[this.state.startDate, this.state.endDate]}
              onChange={this.handleDateChange}
            />
          </div>

          <div className="row">
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
