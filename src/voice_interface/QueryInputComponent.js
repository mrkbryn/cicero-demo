import React, { Component } from 'react'
import SpeechQueryInputComponent from './SpeechQueryInputComponent'
import TextQueryInputComponent from './TextQueryInputComponent'
import { Switch } from '@blueprintjs/core'

class QueryInputComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      voiceInputEnabled: false
    }
  }

  onChange = e => {
    this.setState({ voiceInputEnabled: !this.state.voiceInputEnabled })
  }

  executeCommand = command => {
    this.props.fetchVocalizationFromBackend(command)
  }

  render() {
    let inputComponent = null
    if (this.state.voiceInputEnabled) {
      inputComponent = (
        <SpeechQueryInputComponent
          executeCommand={this.executeCommand}
        />
      )
    } else {
      inputComponent = (
        <TextQueryInputComponent
          executeCommand={this.executeCommand}
        />
      )
    }

    return (
      <div>
        <div className="row">
          <div className="col">
            <Switch
              className="pt-large"
              checked={this.state.voiceInputEnabled}
              label="Voice Input"
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            {inputComponent}
          </div>
        </div>
      </div>
    )
  }
}

export default QueryInputComponent
