import React, { Component } from 'react'
import { Spinner, Callout } from '@blueprintjs/core'
import { Row, Col } from 'react-bootstrap'

/**
 * Displays a loading spinner or error depending on the state of the vocalization fetch
 */
class VocalizationFetch extends Component {
  render() {
    if (this.props.vocalizationFetch.fetching) {
      return (
        <div>
          <Row>
            <Col md={12} style={{ textAlign: "center" }}>
              <p>{this.props.vocalizationFetch.command}</p>
            </Col>
          </Row>
          <Row>
            <Col md={12} style={{ textAlign: "center" }}>
              <Spinner />
            </Col>
          </Row>
          <Row>
            <Col md={12} style={{ textAlign: "center" }}>
              <p style={{ color: "grey" }}>Fetching voice response...</p>
            </Col>
          </Row>
        </div>
      )
    }

    if (this.props.vocalizationFetch.error) {
      return (
        <div>
          <Row>
            <Col md={12}>
              <Callout
                className="pt-intent-danger"
                iconName="pt-icon-error"
                title="Error!"
              >
                {this.props.error}
              </Callout>
            </Col>
          </Row>
        </div>
      )
    }

    return null
  }
}

export default VocalizationFetch
