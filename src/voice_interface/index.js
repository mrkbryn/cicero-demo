import React, { Component } from 'react'
import NotChromeWarning from '../common/NotChromeWarning'
import VocalizationFetch from './VocalizationFetch'
import SuggestedUse from './SuggestedUse'
import QueryInputComponent from './QueryInputComponent'
import { fetchVocalization } from '../api'

class VoiceInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vocalizationFetch: {
        fetching: false
      }
    }
  }

  fetchVocalizationFromBackend = (command, onStartExecutingCommand, onEndExecutingCommand) => {
    onStartExecutingCommand()
    this.setState({ vocalizationFetch: { fetching: true, command }})
    fetchVocalization(command)
    .then(response => response.json())
    .then(json => {
      if (json.error) {
        this.setState({ vocalizationFetch: { fetching: false, error: json.message }})
        onEndExecutingCommand()
      } else {
        this.setState({ vocalizationFetch: { fetching: false, result: json }})
        var synth = window.speechSynthesis;
        var voices = synth.getVoices();
        var voiceOutput = new SpeechSynthesisUtterance(json.vocalization);
        for (var i = 0; i < voices.length; i++) {
          if (voices[i].voiceURI === 'Google UK English Female') {
            voiceOutput.voice = voices[i]
            break;
          }
        }
        voiceOutput.onend = (event) => {
          onEndExecutingCommand()
        }
        synth.speak(voiceOutput);
      }
    })
    .catch(error => {
      console.log(error)
      onEndExecutingCommand()
    })
  }

  render() {
    return (
      <div style={{ margin: "20px", align: "left" }}>
        <NotChromeWarning />
        <SuggestedUse />
        <QueryInputComponent
          fetchVocalizationFromBackend={this.fetchVocalizationFromBackend}
        />
        <VocalizationFetch
          vocalizationFetch={this.state.vocalizationFetch}
        />
      </div>
    )
  }
}

export default VoiceInterface
