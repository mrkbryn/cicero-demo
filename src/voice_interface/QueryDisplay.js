import React, { Component } from 'react'

class QueryDisplay extends Component {
  render() {
    let query = this.props.query
    if (query) {
      return (
        <div>
          <h5>Query Object</h5>
          <p>Table Name: {query.tableName}</p>
          <p>ColumnName: {query.columnName}</p>
          <p>Aggregate: {query.aggregate}</p>
          <p>Start Date: {query.startDate}</p>
          <p>End Date: {query.endDate}</p>
        </div>
      )
    }

    return (
      <div>
        <p>Couldnt detect a valid query</p>
      </div>
    )
  }
}

export default QueryDisplay
