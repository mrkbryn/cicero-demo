import React, { Component } from 'react';
import { getMonthDisplayForIndex } from '../util';
import {
  Row,
  Col,
} from 'react-bootstrap';
import { RangeSlider } from '@blueprintjs/core';

const getMonthYearString = (value) => {
  let month = value % 12;
  let year = 2011 + Math.trunc(value / 12);
  return `${getMonthDisplayForIndex(month)} ${year}`;
}

class TimeRangeSlider extends Component {
  render() {
    return (
      <Row style={{ margin: "40px" }}>
        <Col md={12}>
          <RangeSlider
            min={0}
            max={95}
            stepSize={1}
            labelStepSize={12}
            onChange={this.props.setTimeRange}
            value={this.props.range}
            renderLabel={getMonthYearString}
          />
        </Col>
      </Row>
    );
  }
}

export default TimeRangeSlider;
