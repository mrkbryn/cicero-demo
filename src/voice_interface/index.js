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
      executingCommand: false,
      vocalizationFetch: {
        fetching: false
      }
    }
  }

  fetchVocalizationFromBackend = (command, onStartExecutingCommand, onEndExecutingCommand) => {
    onStartExecutingCommand()
    this.setState({ executingCommand: true, vocalizationFetch: { fetching: true, command }})
    fetchVocalization(command)
    .then(response => response.json())
    .then(json => {
      if (json.error) {
        this.setState({ executingCommand: false, vocalizationFetch: { fetching: false, error: json.message }})
        onEndExecutingCommand()
      } else {
        this.setState({ vocalizationFetch: { fetching: false, result: json }})
        var synth = window.speechSynthesis
        synth.cancel()
        var voices = synth.getVoices()
        var voiceOutput = new SpeechSynthesisUtterance(json.vocalization)
        for (var i = 0; i < voices.length; i++) {
          if (voices[i].voiceURI === 'Google UK English Female') {
            voiceOutput.voice = voices[i]
            break
          }
        }
        voiceOutput.onend = (event) => {
          this.setState({ executingCommand: false })
          onEndExecutingCommand()
        }
        synth.speak(voiceOutput)
      }
    })
    .catch(error => {
      console.log(error)
      this.setState({ executingCommand: false })
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
          executingCommand={this.state.executingCommand}
        />
        <VocalizationFetch
          vocalizationFetch={this.state.vocalizationFetch}
        />
      </div>
    )
  }
}

export default VoiceInterface
