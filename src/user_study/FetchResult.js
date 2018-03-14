import React, { Component } from 'react';
import { Spinner, Callout } from '@blueprintjs/core';
import { Row, Col } from 'react-bootstrap';

class FetchResult extends Component {
  render() {
    let props = this.props;

    return (
      <div className="vocalization-result">
        {props.fetching &&
          <Row>
            <Col md={12}>
              <Spinner className="pt-large row" />
            </Col>
          </Row>
        }

        {props.error &&
          <Row>
            <Col md={12}>
              <Callout
                className="pt-intent-danger"
                iconName="pt-icon-error"
                title="Error!"
              >
                {props.error}
              </Callout>
            </Col>
          </Row>
        }
      </div>
    );
  }
}

export default FetchResult;
