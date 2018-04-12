import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'

/*
 * Lightweight component for recognizing speech input, displaying
 * transcripts, and dispatching commands to parent component
 */
class SpeechQueryInputComponent extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate: ', prevProps, this.props)
    if (this.props.finalTranscript !== prevProps.finalTranscript) {
      this._validateAndExecuteCommand()
    }
  }

  onStartSpeaking = () => {
    console.log('onStartSpeaking')
    this.props.stopListening()
  }

  onStopSpeaking = () => {
    console.log('onStopSpeaking')
    this.props.startListening()
  }

  _validateAndExecuteCommand() {
    let transcript = this.props.finalTranscript.toLowerCase()
    let startOfCommand = transcript.indexOf('cicero')
    if (startOfCommand !== -1) {
      let command = transcript.substring(startOfCommand)
      console.log('executing command: ', command)
      this.props.executeCommand(command, this.onStartSpeaking, this.onStopSpeaking)
      console.log('resetting transcript.')
      this.props.resetTranscript()
      console.log('done resetting transcript')
    }
  }

  render() {
    return (
      <div>
        <p style={{ fontFamily: "'Roboto', sans-sarif", fontSize: "14pt" }}>{this.props.transcript}</p>
      </div>
    )
  }
}

export default SpeechRecognition(SpeechQueryInputComponent)
