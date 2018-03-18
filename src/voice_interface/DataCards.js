import React, { Component } from 'react';
import { Card } from '@blueprintjs/core'
import { Row, Col } from 'react-bootstrap'

class DataCards extends Component {
  render() {
    return (
      <div className="data-cards">
        <h3>Available Datasets</h3>
        <Row>
          <Col md={4}>
            <Card interactive={true} elevation={Card.ELEVATION_TWO}>
              <h5>Bitcoin</h5>
              <p>Keywords: "bitcoin"</p>
              <p>Data time range: 2011 to January 2018</p>
            </Card>
          </Col>
          <Col md={4}>
            <Card interactive={true} elevation={Card.ELEVATION_TWO}>
              <h5>New York City Weather Data</h5>
              <p>Keywords: "NYC", "New York", "New York City", "weather"</p>
            </Card>
          </Col>
          <Col md={4}>
            <Card interactive={true} elevation={Card.ELEVATION_TWO}>
              <h5>Chicago Crimes</h5>
              <p>Keywords: "Chicago", "crime rate"</p>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default DataCards;
