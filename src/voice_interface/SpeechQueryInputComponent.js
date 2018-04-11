import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import TranscriptDisplay from './TranscriptDisplay'

/*
 * Lightweight component for recognizing speech input, displaying
 * transcripts, and dispatching commands to parent component
 */
class SpeechQueryInputComponent extends Component {
  constructor(props) {
    super(props)
    var SpeechGrammarList = window.webkitSpeechGrammarList
    if (SpeechGrammarList) {
      var grammar = '#JSGF V1.0; grammar name; public <name> = cicero ;'
      var speechRecognitionList = new SpeechGrammarList()
      speechRecognitionList.addFromString(grammar, 1)
      this.props.recognition.grammars = speechRecognitionList
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.finalTranscript !== prevProps.finalTranscript) {
      this._validateAndExecuteCommand()
    }
  }

  _validateAndExecuteCommand() {
    let transcript = this.props.finalTranscript.toLowerCase()
    let startOfCommand = transcript.indexOf('cicero')
    if (startOfCommand !== -1) {
      let command = transcript.substring(startOfCommand)
      this.props.executeCommand(command)
      this.props.resetTranscript()
    }
  }

  render() {
    return (
      <div>
        <p>{this.props.transcript}</p>
      </div>
    )
  }
}

export default SpeechRecognition(SpeechQueryInputComponent)
