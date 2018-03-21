import React, { Component } from 'react'
import NotChromeWarning from '../common/NotChromeWarning'
import { Spinner } from '@blueprintjs/core'
import { Row, Col } from 'react-bootstrap'
import SpeechRecognition from 'react-speech-recognition'
import DataCards from './DataCards'
import TranscriptDisplay from './TranscriptDisplay'
import { fetchGetRelationMetadata, fetchVocalization } from '../api'
import { parseDates, parseTableName } from './speechRecognition'
import { playVocalization } from '../util'
import SuggestedUse from './SuggestedUse'

class VoiceInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tablesFetch: {
        fetching: false,
      },
      tables: [],
      vocalizationFetch: {
        fetching: false
      }
    }

    var SpeechGrammarList = window.webkitSpeechGrammarList
    if (SpeechGrammarList) {
      var grammar = '#JSGF V1.0; grammar name; public <name> = cicero ;'
      var speechRecognitionList = new SpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      this.props.recognition.grammars = speechRecognitionList;
    }
  }

  componentDidMount() {
    this.setState({ tablesFetch: { fetching: true }})
    fetchGetRelationMetadata()
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          this.setState({ tablesFetch: { fetching: false, error: json.message }})
        } else {
          this.setState({ tablesFetch: { fetching: false }, tables: json })
        }
        this.props.resetTranscript()
      })
  }

  componentWillReceiveProps(props) {
    if (props.finalTranscript !== this.props.finalTranscript) {
      this.parseTranscript(props.finalTranscript)
    }
  }

  parseTranscript = (finalTranscript) => {
    var transcript = finalTranscript.toLowerCase();
    if (transcript.indexOf("reset transcript") !== -1) {
      console.log('resetting transcript')
      this.props.resetTranscript()
    } else {
      let tableName = parseTableName(transcript, this.state.tables)
      let dates = parseDates(transcript)
      console.log(tableName, dates)
      if (tableName && dates[0] && dates[1]) {
        this.fetchVocalizationFromBackend(tableName, dates[0], dates[1])
      }
    }
  }

  parseDates = transcript => {
    this.setState({ dateRange: parseDates(transcript) })
  }

  fetchVocalizationFromBackend = (tableName, startDate, endDate) => {
    this.setState({ vocalizationFetch: { fetching: true }})
    fetchVocalization(tableName, startDate, endDate)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      if (json.error) {
        this.setState({ vocalizationFetch: { fetching: false, error: json.message }})
      } else {
        this.setState({ vocalizationFetch: { fetching: false, vocalization: json.vocalization }})
        playVocalization(json.vocalization)
      }
    })
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

        <SuggestedUse />

        <Row>
          <Col md={12}>
            <TranscriptDisplay
              finalTranscript={this.props.finalTranscript}
              interimTranscript={this.props.interimTranscript}
            />
          </Col>
        </Row>

        {this.state.vocalizationFetch.fetching &&
          <Spinner />
        }
      </div>
    )
  }
}

export default SpeechRecognition(VoiceInterface)
