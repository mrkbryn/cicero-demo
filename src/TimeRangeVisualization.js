/* global Plotly:true */
import React, { Component } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory'
import { Row, Col } from 'react-bootstrap';

const Plot = createPlotlyComponent(Plotly);

class TimeRangeVisualization extends Component {
  render() {
    let xValues = [];
    let yValues = [];
    for (var i = 0; i < this.props.values.length; i++) {
      if (this.props.values[i] !== 'null') {
        xValues.push(i);
        yValues.push(this.props.values[i]);
      }
    }

    return (
      <Row>
        <Col md={12}>
          <Plot
            data={[{
              type: 'scatter',
              x: xValues,
              y: yValues
            }]}
            layout={{
              width: 800,
              height: 600,
              xaxis: {
                autorange: true,
                showgrid: false,
                zeroline: false,
                showline: false,
                autotick: true,
                ticks: "",
                showticklabels: false
              },
              yaxis: {
                title: 'Price'
              },
              title: 'Data for Selected Time Range'
            }}
          />
        </Col>
      </Row>
    );
  }
}

export default TimeRangeVisualization;
