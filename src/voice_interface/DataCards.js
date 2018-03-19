import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import DataCard from './DataCard'

class DataCards extends Component {
  render() {
    // TODO: move selected tables to state so we can trigger a rerender
    let cards = []
    for (var i = 0; i < this.props.tables.length; i++) {
      let table = this.props.tables[i];
      cards.push(
        <div key={table.tableName}>
          <Col>
            <DataCard
              table={table}
              selected={table.tableName === this.props.selectedTable}
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
