import React, { Component } from 'react'
import DateRangeComponent from '../common/DateRangeComponent'

class QueryDisplay extends Component {
  render() {
    return (
      <div>
        <h5>Query on <span className="pt-monospace-text">{this.props.tableName}</span></h5>
        <div className="row">
          <div className="col">
            <DateRangeComponent
              startDate={this.props.startDate}
              endDate={this.props.endDate}
            />
          </div>
          {this.props.aggregate &&
            <div className="col">
              Function: <span className="pt-monospace-text">{this.props.aggregate}</span>
            </div>
          }
          <div className="col" style={{ textAlign: "right" }}>
            <p className="pt-ui-text-large">Time Series: ({this.props.formattedTimeColumn}, {this.props.columnName})</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="pt-monospace-text pt-ui-text-large">{this.props.fullDataQuery}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default QueryDisplay
