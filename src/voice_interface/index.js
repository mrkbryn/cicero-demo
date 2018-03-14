import React, { Component } from 'react'
import NotChromeWarning from '../common/NotChromeWarning'
import { Button, Card, TextArea } from '@blueprintjs/core'
import { Row, Col } from 'react-bootstrap'
import SpeechRecognition from 'react-speech-recognition'

class VoiceInterface extends Component {
  componentWillReceiveProps(props) {
    this.parseTranscript(props.transcript)
  }

  toggleListening = () => {
    if (this.props.listening) {
      this.props.stopListening()
    } else {
      this.props.resetTranscript()
      this.props.startListening()
    }
  }

  parseTranscript = transcript => {
    console.log('parsing transcript: ', transcript)
  }

  render() {
    var buttonText = this.props.listening ? 'Stop Listening' : 'Start Listening'

    return (
      <div style={{ margin: "20px", align: "left" }}>
        <NotChromeWarning />
        <h1 className="display-4">Voice Interface</h1>
        <h3>Available Datasets</h3>
        <Row>
          <Col md={4}>
            <Card interactive={true} elevation={Card.ELEVATION_TWO}>
              <h5>Bitcoin</h5>
              <p>Keywords: "bitcoin"</p>
              <p>Data time range: 2011 to January 2018</p>
            </Card>
          </Col>
          <Col md={4}>
            <Card interactive={true} elevation={Card.ELEVATION_TWO}>
              <h5>New York City Weather Data</h5>
              <p>Keywords: "NYC", "New York", "New York City", "weather"</p>
            </Card>
          </Col>
          <Col md={4}>
            <Card interactive={true} elevation={Card.ELEVATION_TWO}>
              <h5>Chicago Crimes</h5>
              <p>Keywords: "Chicago", "crime rate"</p>
            </Card>
          </Col>
        </Row>
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
      </div>
    )
  }
}

export default SpeechRecognition({ autoStart: false })(VoiceInterface)
