import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class UserIdInput extends Component {
  render() {
    return (
      <Row>
        <Col md={6} style={{ textAlign: "left", marginLeft: "20px" }}>
          <input
            style={{ width: "300px" }}
            className="pt-input"
            type="text"
            placeholder="Enter your AMT user ID"
            onChange={(e) => this.props.setUserId(e.target.value)}
          />
        </Col>
      </Row>
    );
  }
}

export default UserIdInput;
