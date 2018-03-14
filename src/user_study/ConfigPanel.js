import React, { Component } from 'react';
import { Callout, RadioGroup, Radio } from '@blueprintjs/core';
import { Row, Col } from 'react-bootstrap';

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
        </Row>

        {this.props.sampling !== undefined && !this.props.sampling &&
          <Row style={{ margin: "20px" }}>
            <Col md={12}>
              <Callout
                style={{ textAlign: "left" }}
                className="pt-icon-info-sign"
                title="Voice generation may take up to 25 seconds"
              >
                You have selected to use the full-data algorithm. This method produces a higher quality output
                that better reflects the data, but it may take a significant
                amount of time. This method will timeout after 25 seconds if it
                has not generated the best output in that time. If the full-data
                method takes too long, we suggest switching to the sampling algorithm
                to hear good quality, approximate descriptions of the data.
              </Callout>
            </Col>
          </Row>
        }
      </div>
    );
  }
}

export default ConfigPanel;
