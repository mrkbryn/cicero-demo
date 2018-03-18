import React, { Component } from 'react'
import NotChromeWarning from '../common/NotChromeWarning'
import { Button, TextArea, Icon, Tag } from '@blueprintjs/core'
import { Row, Col } from 'react-bootstrap'
import SpeechRecognition from 'react-speech-recognition'
import DataCards from './DataCards'

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
    var buttonText = this.props.listening ? 'Stop Listening' : 'Start Listening'
    var firstDateString = this.state.firstDate ? this.state.firstDate.toDateString() : "no start date";
    var secondDateString = this.state.secondDate ? this.state.secondDate.toDateString() : "no end date";

    return (
      <div style={{ margin: "20px", align: "left" }}>
        <NotChromeWarning />
        <DataCards
          tables={tables}
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
          <TextArea
            className="pt-fill"
            value={this.props.transcript}
          />
          </Col>
        </Row>

        <Row style={{ margin: "10px", textAlign: "center" }}>
          <Col md={12}>
            <Button
              onClick={this.toggleListening}
            >
              {buttonText}
            </Button>
          </Col>
        </Row>

        <Row style={{ margin: "10px" }}>
          <Col md={8} style={{ textAlign: "left" }}>
            Selected Table: {this.state.selectedTable}
          </Col>
          <Col md={4} style={{ textAlign: "right" }}>
            Time Range:
            <Tag className="pt-large pt-intent-primary" style={{ margin: "5px" }}>
                {firstDateString}
            </Tag>
            <Icon iconName="arrow-right" iconSize={20} />
            <Tag className="pt-large pt-intent-primary" style={{ margin: "5px" }}>
                {secondDateString}
            </Tag>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SpeechRecognition({ autoStart: false })(VoiceInterface)
