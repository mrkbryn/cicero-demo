import React, { Component } from 'react'
import NotChromeWarning from '../common/NotChromeWarning'
import { Button, TextArea } from '@blueprintjs/core'
import { Row, Col } from 'react-bootstrap'
import SpeechRecognition from 'react-speech-recognition'
import DataCards from './DataCards'

var MONTH_YEAR_REGEX = /(january|february|march|april|may|june|july|august|september|october|november|december) ([0-9]{4})/g;

// TODO: this should be fetched from the backend and will populate the Card display
const tables = [
  {
    'tableName': 'chicago_crimes',
    'keywords': ['chicago']
  },
  {
    'tableName': 'bitstampusd',
    'keywords': ['bitcoin']
  },
  {
    'tableName': 'darksky',
    'keywords': ['dark sky', 'new york', 'new york city']
  }
];

class VoiceInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parsedTableName: '',
      firstDate: undefined,
      secondDate: undefined
    }
  }

  componentWillReceiveProps(props) {
    this.parseTranscript()
  }

  toggleListening = () => {
    if (this.props.listening) {
      this.props.stopListening()
    } else {
      this.props.resetTranscript()
      this.props.startListening()
    }
  }

  parseTranscript = () => {
    // TODO: this should probably just parse the finalTranscript prop
    var transcript = this.props.transcript.toLowerCase();
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
          this.setState({ parsedTableName: table.tableName })
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
    console.log('Trying to parse dates from transcript')
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
    var buttonText = this.props.listening ? 'Stop Listening' : 'Start Listening'

    return (
      <div style={{ margin: "20px", align: "left" }}>
        <NotChromeWarning />
        <h1 className="display-4">Voice Interface</h1>
        <DataCards />
        <p>
          Try saying...
        </p>
        <ul>
          <li>"Tell me about Bitcoin from 2012 to 2014"</li>
          <li>"What was the weather in NYC from January 2011 to August 2011"</li>
        </ul>

        <Row>
          <TextArea
            className="pt-fill"
            value={this.props.transcript}
          />
        </Row>

        <Row>
          <Button
            onClick={this.toggleListening}
          >
            {buttonText}
          </Button>
        </Row>

        <Row>
          <Col md={6}>
            Parsed Table Name: {this.state.parsedTableName}
          </Col>
          <Col md={3}>
            Start Date: {this.state.firstDate}
          </Col>
          <Col md={3}>
            End Date: {this.state.secondDate}
          </Col>
        </Row>
      </div>
    )
  }
}

export default SpeechRecognition({ autoStart: false })(VoiceInterface)
