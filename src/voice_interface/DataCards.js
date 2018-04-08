import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import DataCard from './DataCard'
import { Spinner, NonIdealState } from '@blueprintjs/core'

class DataCards extends Component {
  render() {
    if (this.props.tablesFetch.fetching) {
      return (
        <div>
          <Row>
            <Col md={12} style={{ textAlign: "center" }}>
              <Spinner />
            </Col>
          </Row>
          <Row>
            <Col md={12} style={{ textAlign: "center" }}>
              <p style={{ color: "grey" }}>Loading table information...</p>
            </Col>
          </Row>
        </div>
      )
    }

    if (this.props.tablesFetch.error) {
      return (
        <div>
          <NonIdealState
            title="Error"
            description="Failed to fetch table information from CiceroDB"
            visual="pt-icon-error"
          />
        </div>
      )
    }

    let cards = []
    for (var i = 0; i < this.props.tables.length; i++) {
      let table = this.props.tables[i];
      cards.push(
        <div key={table.tableName}>
          <Col>
            <DataCard
              table={table}
            />
          </Col>
        </div>
      )
    }
    return (
      <div className="data-cards">
        <h3>Available Datasets</h3>
        <Row>
          {cards}
        </Row>
      </div>
    )
  }
}

export default DataCards;
