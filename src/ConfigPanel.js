import React, { Component } from 'react';
import {
  Callout,
  RadioGroup,
  Radio,
} from '@blueprintjs/core';
import {
  Row,
  Col,
} from 'react-bootstrap';

class ConfigPanel extends Component {

  handleVoiceGenerationChange(value) {
    if (value === 'sampling') {
      this.props.selectSampling();
    }
    if (value === 'full-data') {
      this.props.selectFullData();
    }
  }

  render() {
    var selectedValue;
    if (this.props.sampling !== undefined) {
      selectedValue = this.props.sampling ? 'sampling' : 'full-data';
    }

    return (
      <div className="App-config" style={{ margin: "20px"}}>
        <Row>
          <Col md={6}>
            <RadioGroup
              className="pt-large"
              label="Voice Generation Method"
              onChange={e => this.handleVoiceGenerationChange(e.target.value)}
              selectedValue={selectedValue}
            >
              <Radio label="Use Sampling to Generate Voice Output" value="sampling" />
              <Radio label="Use Full Data to Generate Voice Output" value="full-data" />
            </RadioGroup>
          </Col>
          <Col md={6} style={{ textAlign: "right" }}>
            <input
              style={{ width: "300px" }}
              className="pt-input"
              type="text"
              placeholder="Enter your assigned user ID"
              dir="auto"
              onChange={e => console.log(e.target.value)}
            />
          </Col>
        </Row>

        {this.props.sampling !== undefined && !this.props.sampling &&
          <Row style={{ margin: "20px" }}>
            <Col md={12}>
              <Callout
                style={{ textAlign: "left" }}
                className="pt-icon-info-sign"
                title="Voice Generation May Take A While"
              >
                You have selected to use the full-data algorithm. This method produces a higher quality output
                that better reflects the data, but it may take a significant
                amount of time. This method will time out after 90 seconds if it
                has not generated the best output before then. If the full-data
                method takes too long, we suggest switching to the sampling algorithm
                to hear voice good quality, approximate descriptions of the data.
              </Callout>
              </Col>
          </Row>
        }
      </div>
    );
  }
}

export default ConfigPanel;
