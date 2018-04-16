import React, { Component } from 'react'
import { Spinner, Callout } from '@blueprintjs/core'
import { Row, Col } from 'react-bootstrap'
import QueryDisplay from './QueryDisplay'
import SampledTimesDisplay from './SampledTimesDisplay'

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
          <div className="row">
            <div className="col">
              <Callout
                className="pt-intent-danger"
                iconName="pt-icon-error"
                title="Error!"
              >
                {this.props.error}
              </Callout>
            </div>
          </div>
        </div>
      )
    }

    if (this.props.vocalizationFetch.result) {
      let result = this.props.vocalizationFetch.result
      return (
        <div>
          <div className="row">
            <div className="col" style={{ textAlign: "right", color: "grey" }}>
              Request took {result.executionTimeMillis} milliseconds
            </div>
          </div>
          {result.query ?
            <QueryDisplay {...result.query} /> :
            <div>
              <div className="row">
                <div className="col">
                  <Callout
                    className="pt-intent-danger"
                    iconName="pt-icon-error"
                    title="Error!"
                  >
                    Oops! Your query was invalid
                  </Callout>
                </div>
              </div>
            </div>
          }
          <div className="row">
            <div className="col">
              <SampledTimesDisplay sampledTimes={result.sampledTimes} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>Number of tuples read: {result.numberOfTuplesRead}</p>
            </div>
          </div>
        </div>
      )
    }

    return null
  }
}

export default VocalizationFetch
