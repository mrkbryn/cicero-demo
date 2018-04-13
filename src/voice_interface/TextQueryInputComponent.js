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
    this.props.executeCommand(this.state.value)
  }

  clearInput = () => {
    this.setState({ value: '' })
  }

  onChange = e => {
    this.setState({ value: e.target.value })
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <TextArea
              style={{ resize: "none" }}
              className="pt-fill"
              value={this.state.value}
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col" style={{ textAlign: "center" }}>
            <Button style={{ margin: "5px" }} onClick={this.onClick}>Run Command</Button>
            <Button style={{ margin: "5px" }} onClick={this.clearInput}>Clear Input</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default TextQueryInputComponent
