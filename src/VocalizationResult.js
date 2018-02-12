import React, { Component } from 'react';
import {
  Spinner,
  NonIdealState,
} from '@blueprintjs/core';
import { Row } from 'react-bootstrap';

class VocalizationResult extends Component {
  render() {
    let props = this.props;

    if (props.fetching) {
      return (
        <div>
          <Spinner className="pt-large row" />
        </div>
      );
    }

    if (props.error) {
      return (
        <div className="vocalization-result">
          <Row style={{ margin: "40px"}}>
            <NonIdealState
              visual="error"
              title="Oops! We had an issue while building a voice response."
              description={props.error}
            />
          </Row>
        </div>
      );
    }

    return (
      <div className="vocalization-result">

      </div>
    );
  }
}

export default VocalizationResult;
