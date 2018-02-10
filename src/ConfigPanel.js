import React, { Component } from 'react';
import {
  FormGroup,
  Switch,
} from '@blueprintjs/core';

class ConfigPanel extends Component {
  render() {
    return (
      <div className="App-config" style={{ width: "500px", margin: "20px" }}>
        <FormGroup>
          <Switch className="pt-large" checked={this.props.voiceMode} onChange={this.props.toggleVoiceMode} label="Voice Mode" />
        </FormGroup>
        <FormGroup
          helperText="The sampling algorithm will speed up voice responses to within 1-3 seconds. It provides high quality descriptions of the requested data, but it is not guaranteed to be an optimal voice description."
        >
          <Switch className="pt-large" checked={this.props.samplingAlgorithm} onChange={this.props.toggleSamplingMethod} label="Use Sampling For Faster Voice Generation" />
        </FormGroup>
      </div>
    );
  }
}

export default ConfigPanel;
