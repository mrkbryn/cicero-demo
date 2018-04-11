import React, { Component } from 'react'

class QueryDisplay extends Component {
  render() {
    let query = this.props.query
    if (query) {
      return (
        <div>
          <h5>Query Object</h5>
          <p>Table Name: {query.tableName}</p>
          <p>Column Name: {query.columnName}</p>
          <p>Aggregate: {query.aggregate !== null ? query.aggregate : 'null'}</p>
          <p>Start Date: {new Date(query.startDate).toDateString()}</p>
          <p>End Date: {new Date(query.endDate).toDateString()}</p>
          <p className="pt-monospace-text">{query.fullDataQuery}</p>
        </div>
      )
    }

    return (
      <div>
        <p>Couldn't detect a valid query</p>
      </div>
    )
  }
}

export default QueryDisplay
