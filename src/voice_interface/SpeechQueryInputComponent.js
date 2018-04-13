import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'

/*
 * Lightweight component for recognizing speech input, displaying
 * transcripts, and dispatching commands to parent component
 */
class SpeechQueryInputComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      executingCommand: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.finalTranscript !== prevProps.finalTranscript) {
      this._validateAndExecuteCommand()
    }
  }

  componentDidMount() {
    this.props.startListening()
  }

  componentWillUnmount() {
    this.props.stopListening()
  }

  onStartExecutingCommand = () => {
    console.log('onStartExecutingCommand')
    this.setState({ executingCommand: true })
  }

  onEndExecutingCommand = () => {
    console.log('onEndExecutingCommand')
    this.props.resetTranscript()
    this.setState({ executingCommand: false })
  }

  _validateAndExecuteCommand() {
    let transcript = this.props.finalTranscript.toLowerCase()
    let startOfCommand = transcript.indexOf('cicero')
    if (startOfCommand !== -1) {
      let command = transcript.substring(startOfCommand)
      this.props.executeCommand(command, this.onStartExecutingCommand, this.onEndExecutingCommand)
    }
  }

  render() {
    let content = (this.state.executeCommand || (this.props.finalTranscript === '' && this.props.interimTranscript === '')) ? 'Hey Cicero...' : `${this.props.finalTranscript} ${this.props.interimTranscript}`
    return (
      <div className="row" style={{ margin: "20px" }}>
        <div className="col">
          <p className="pt-ui-text-large" style={{ color: "grey" }}>{content}</p>
        </div>
      </div>
    )
  }
}

export default SpeechRecognition({ autoStart: false })(SpeechQueryInputComponent)
