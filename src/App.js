import React, { Component } from 'react';
import './App.css';
import { Button } from '@blueprintjs/core';
import { Row, Col } from 'react-bootstrap';
import CiceroNavbar from './CiceroNavbar';
import Intro from './Intro';
import UserIdInput from './UserIdInput';
import TimeRangeSlider from './TimeRangeSlider';
import FetchResult from './FetchResult';
import NotChromeWarning from './NotChromeWarning';
import { getDateStringFromRangeValue, playVocalization, playSonification } from './util';

const api_url = process.env.REACT_APP_CICERO_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'sonification',
      range: [0,95],
      fetchResult: {
        fetching: false,
      },
      userID: ''
    }
  }

  componentDidMount() {
    window.speechSynthesis.getVoices();
  }

  setTimeRange = (values) => {
    this.setState({
      range: values
    });
  }

  setUserId = (userId) => {
    this.setState({
      userID: userId
    });
  }

  handleVocalizationResult = (json) => {
    playVocalization(json.vocalization);
  }

  handleSonificationResult = (json) => {
    playSonification(json.values);
  }

  fetchResult = (e) => {
    window.speechSynthesis.cancel();

    if (this.state.userID === '') {
      this.setState({
        fetchResult: {
          error: 'Please type your user AMT ID in the provided input'
        }
      });
      return;
    }

    this.setState({ fetchResult: { fetching: true } });

    let body = JSON.stringify({
      relationName: 'bitstampusd',
      timeColumnName: 'timestamp',
      variableColumnName: 'close',
      startDate: getDateStringFromRangeValue(this.state.range[0]),
      endDate: getDateStringFromRangeValue(this.state.range[1]),
      userID: this.state.userID
    });

    let url = `${api_url}/query/timeseries/`
    if (this.state.mode === 'vocalization') {
      url = url + 'vocalization';
    } else if (this.state.mode === 'sonification' || this.state.mode === 'visualization') {
      url = url + 'vector';
    }

    fetch(url, {
      method: 'PUT',
      body,
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(response => response.json())
    .then(json => {
      if (json.error) {
        this.setState({ fetchResult: { fetching: false, error: json.message }});
      } else {
        this.setState({ fetchResult: { fetching: false }});

        if (this.state.mode === 'vocalization') {
          this.handleVocalizationResult(json);
        } else if (this.state.mode === 'sonification') {
          this.handleSonificationResult(json);
        }
      }
    })
    .catch(error => {
      console.log(error);
      this.setState({ fetchResult: { fetching: false, error: 'We were unable to connect to CiceroDB' }});
    });
  }

  render() {
    return (
      <div className="App">
        <CiceroNavbar />
        <div className="container">
          <NotChromeWarning />
          <Intro />
          <UserIdInput
            setUserId={this.setUserId}
          />
          <TimeRangeSlider
            range={this.state.range}
            setTimeRange={this.setTimeRange}
          />
          <Row style={{ margin: "10px", textAlign: "center" }}>
            <Col md={12}>
              <Button
                disabled={this.state.fetchResult.fetching}
                onClick={this.fetchResult}
              >
                Get Result
              </Button>
            </Col>
          </Row>
          <FetchResult
            fetching={this.state.fetchResult.fetching}
            error={this.state.fetchResult.error}
          />
        </div>
      </div>
    );
  }
}

export default App;
