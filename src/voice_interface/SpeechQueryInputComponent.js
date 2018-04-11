import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import TranscriptDisplay from './TranscriptDisplay'

class SpeechQueryInputComponent extends Component {
  // constructor(props) {
  //   super(props)
  //   var SpeechGrammarList = window.webkitSpeechGrammarList
  //   if (SpeechGrammarList) {
  //     var grammar = '#JSGF V1.0; grammar name; public <name> = cicero ;'
  //     var speechRecognitionList = new SpeechGrammarList()
  //     speechRecognitionList.addFromString(grammar, 1)
  //     this.props.recognition.grammars = speechRecognitionList
  //   }
  // }
  //
  // componentWillReceiveProps(props) {
  //   if (props.finalTranscript !== this.props.finalTranscript) {
  //     this.checkForCommand(props.finalTranscript.toLowerCase())
  //     this.props.resetTranscript()
  //   }
  // }

  // checkForCommand(transcript) {
  //   let startOfCommand = transcript.indexOf('cicero')
  //   if (startOfCommand !== -1) {
  //     let command = transcript.substring(startOfCommand)
  //     this.fetchVocalizationFromBackend(command)
  //   }
  // }

  // fetchVocalizationFromBackend = (command) => {
  //   this.setState({ vocalizationFetch: { fetching: true, command }})
  //   fetchVocalization(command)
  //   .then(response => response.json())
  //   .then(json => {
  //     if (json.error) {
  //       this.setState({ vocalizationFetch: { fetching: false, error: json.message }})
  //     } else {
  //       this.setState({ vocalizationFetch: { fetching: false, vocalization: json.vocalization }})
  //       var synth = window.speechSynthesis;
  //       var voices = synth.getVoices();
  //       var voiceOutput = new SpeechSynthesisUtterance(json.vocalization);
  //       for (var i = 0; i < voices.length; i++) {
  //         if (voices[i].voiceURI === 'Google UK English Female') {
  //           voiceOutput.voice = voices[i]
  //           break;
  //         }
  //       }
  //       voiceOutput.onstart = () => {
  //         this.props.stopListening()
  //       }
  //       voiceOutput.onend = () => {
  //         this.props.startListening()
  //       }
  //       synth.speak(voiceOutput);
  //     }
  //   })
  //   .catch(error => {
  //     console.log('error...')
  //   })
  // }

  render() {
    /*
    <TranscriptDisplay
      finalTranscript={this.props.finalTranscript}
      interimTranscript={this.props.interimTranscript}
    />
    */
    return (
      <div>
        <p>speech query input component</p>
      </div>
    )
  }
}

export default SpeechQueryInputComponent
// export default SpeechRecognition(SpeechQueryInputComponent)
