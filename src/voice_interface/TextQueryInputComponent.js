import React, { Component } from 'react'
import { TextArea, Button } from '@blueprintjs/core'

class TextQueryInputComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  onClick = () => {
    console.log('running command: ', this.state.value)
  }

  onChange = e => {
    this.setState({ value: e.target.value })
  }

  render() {
    return (
      <div>
        <TextArea
          className="pt-fill"
          value={this.state.value}
          onChange={this.onChange}
        />
        <Button
          onClick={this.onClick}
        >
          Run Command
        </Button>
      </div>
    )
  }
}

export default TextQueryInputComponent
