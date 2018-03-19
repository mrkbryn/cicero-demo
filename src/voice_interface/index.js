import React, { Component } from 'react'
import NotChromeWarning from '../common/NotChromeWarning'
import { Button } from '@blueprintjs/core'
import { Row, Col } from 'react-bootstrap'
import SpeechRecognition from 'react-speech-recognition'
import DataCards from './DataCards'
import TimeRangeDisplay from './TimeRangeDisplay'
import TranscriptDisplay from './TranscriptDisplay'

var MONTH_YEAR_REGEX = /(january|february|march|april|may|june|july|august|september|october|november|december) ([0-9]{4})/g;

// TODO: this should be fetched from the backend and will populate the Card display
const tables = [
  {
    'tableName': 'chicago_crimes',
    'description': 'The crimes committed in Chicago.',
    'keywords': ['chicago', 'crime'],
    'earliestDate': new Date('January 1, 2001'),
    'latestDate': new Date('January 18, 2017')
  },
  {
    'tableName': 'bitstampusd',
    'description': 'The closing prices of Bitcoin on the Bitstamp exchange.',
    'keywords': ['bitcoin'],
    'earliestDate': new Date('December 31, 2011'),
    'latestDate': new Date('January 8, 2018')
  },
  {
    'tableName': 'darksky',
    'description': 'Temperature data for New York City.',
    'keywords': ['dark sky', 'new york', 'new york city'],
    'earliestDate': new Date('January 1, 2013'),
    'latestDate': new Date('January 1, 2017')
  }
];

class VoiceInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTable: '',
      firstDate: undefined,
      secondDate: undefined
    }
  }

  componentWillReceiveProps(props) {
    this.parseTranscript()
  }

  componentDidMount() {
    this.props.startListening()
  }

  componentWillUnmount() {
    this.props.stopListening()
  }

  parseTranscript = () => {
    var transcript = this.props.finalTranscript.toLowerCase();
    if (this.parseTableName(transcript)) {
      this.parseDates(transcript);
    }
  }

  parseTableName = transcript => {
    var foundTableKeyword = false;
    for (var i = 0; i < tables.length; i++) {
      var table = tables[i];
      var keywords = table['keywords'];
      for (var j = 0; j < keywords.length; j++) {
        if (transcript.indexOf(keywords[j]) !== -1) {
          this.setState({ selectedTable: table.tableName })
          foundTableKeyword = true;
          break;
        }
      }
      if (foundTableKeyword) {
        break;
      }
    }
    return foundTableKeyword;
  }

  parseDates = transcript => {
    var match = transcript.match(MONTH_YEAR_REGEX);
    if (match) {
      if (match.length === 1) {
        this.setState({ firstDate: new Date(match[0]) })
      } else {
        var d1 = new Date(match[match.length-1]);
        var d2 = new Date(match[match.length-2]);
        this.setState({
          firstDate: d1 < d2 ? d1 : d2,
          secondDate: d1 < d2 ? d2 : d1
        });
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <div style={{ margin: "20px", align: "left" }}>
        <NotChromeWarning />
        <DataCards
          tables={tables}
          selectedTable={this.state.selectedTable}
        />

        <div style={{ margin: "20px"}}>
          <p>
            Try saying...
          </p>
          <ul>
            <li>"Tell me about Bitcoin from January 2012 to December 2012"</li>
            <li>"What was the weather in NYC from January 2011 to August 2011"</li>
          </ul>
        </div>

        <Row>
          <Col md={12}>
            <TranscriptDisplay
              finalTranscript={this.props.finalTranscript}
              interimTranscript={this.props.interimTranscript}
            />
          </Col>
        </Row>

        <Row style={{ margin: "10px", textAlign: "center" }}>
          <Col md={12}>
            <Button onClick={this.props.resetTranscript}>Reset Transcript</Button>
          </Col>
        </Row>

        <Row style={{ margin: "10px" }}>
          <Col>
            <TimeRangeDisplay
              firstDate={this.state.firstDate}
              secondDate={this.state.secondDate}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default SpeechRecognition({ autoStart: false })(VoiceInterface)
