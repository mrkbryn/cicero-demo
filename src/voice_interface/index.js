import React, { Component } from 'react'
import NotChromeWarning from '../common/NotChromeWarning'
import { Button } from '@blueprintjs/core'
import { Row, Col } from 'react-bootstrap'
import SpeechRecognition from 'react-speech-recognition'
import DataCards from './DataCards'
import TimeRangeDisplay from './TimeRangeDisplay'
import TranscriptDisplay from './TranscriptDisplay'
import { fetchGetRelationMetadata } from '../api'
import { parseDates } from './speechRecognition'

class VoiceInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tablesFetch: {
        fetching: false,
      },
      tables: [],
      selectedTable: '',
      dateRange: [undefined, undefined]
    }
  }

  componentWillReceiveProps(props) {
    this.parseTranscript()
  }

  componentDidMount() {
    this.setState({ tablesFetch: { fetching: true }})
    fetchGetRelationMetadata()
    .then(response => response.json())
    .then(json => {
      console.log(json)
      if (json.error) {
        this.setState({ tablesFetch: { fetching: false, error: json.error }})
      } else {
        this.setState({ tablesFetch: { fetching: false }, tables: json })
      }
    })
  }

  parseTranscript = () => {
    var transcript = this.props.transcript.toLowerCase();
    if (this.parseTableName(transcript)) {
      this.parseDates(transcript);
    }
  }

  parseTableName = transcript => {
    var foundTableKeyword = false;
    for (var i = 0; i < this.state.tables.length; i++) {
      var table = this.state.tables[i];
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
    this.setState({ dateRange: parseDates(transcript) })
  }

  render() {
    return (
      <div style={{ margin: "20px", align: "left" }}>
        <NotChromeWarning />
        <DataCards
          tablesFetch={this.state.tablesFetch}
          tables={this.state.tables}
          selectedTable={this.state.selectedTable}
        />

        <div style={{ margin: "20px"}}>
          <p>
            Try saying...
          </p>
          <ul>
            <li>"Tell me about Bitcoin from January 2012 to December 2012"</li>
            <li>"What was the weather in New York City from January 2011 to August 2011"</li>
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
              firstDate={this.state.dateRange[0]}
              secondDate={this.state.dateRange[1]}
            />
          </Col>
        </Row>
        <Row style={{ margin: "10px"}}>
          <p>Selected Table: {this.state.selectedTable}</p>
        </Row>
      </div>
    )
  }
}

export default SpeechRecognition(VoiceInterface)
