import React, { Component } from 'react';
import {
  Button,
  Callout,
} from '@blueprintjs/core';
import {
  Row,
  Col,
} from 'react-bootstrap';

class ConfigPanel extends Component {
  render() {
    return (
      <div className="App-config" style={{ margin: "20px", textAlign: "center" }}>
        <Row>
          <Col md={12}>
          <Button
            style={{ margin: "10px" }}
            disabled={this.props.sampling}
            onClick={this.props.selectSampling}
          >
            Use Sampling to Generate Voice Output
          </Button>

          <Button
            style={{ margin: "10px" }}
            disabled={!this.props.sampling}
            onClick={this.props.selectFullData}
          >
            Use Full Data to Generate Voice Output
          </Button>
          </Col>
        </Row>

        {!this.props.sampling &&
          <Row style={{ margin: "20px" }}>
            <Col md={12}>
              <Callout
                style={{ textAlign: "left" }}
                className="pt-icon-info-sign"
                title="Warning: Voice Generation May Take A While"
              >
                You have selected to use the full-data algorithm. This
                vocalization method will produce a higher quality output
                that better reflects the data, but it may take a significant
                amount of time. We have set a timeout on the backend so that
                it will take at most 90 seconds before either successfully
                producing the most precise voice response or failing to
                produce an output. If the full-data algorithm takes too long,
                we suggest switching to the sampling algorithm to hear voice
                descriptions of time ranges.
              </Callout>
              </Col>
          </Row>
        }
      </div>
    );
  }
}

export default ConfigPanel;
