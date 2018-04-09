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

  render() {
    let inputComponent = null
    if (this.state.voiceInputEnabled) {
      inputComponent = (
        <SpeechQueryInputComponent />
      )
    } else {
      inputComponent = (
        <TextQueryInputComponent />
      )
    }

    return (
      <div>
        <Switch
          className="pt-large"
          checked={this.state.voiceInputEnabled}
          label="Voice Input"
          onChange={this.onChange}
        />
        {inputComponent}
      </div>
    )
  }
}

export default QueryInputComponent
