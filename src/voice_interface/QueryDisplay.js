import React, { Component } from 'react'
import { Tag, Icon } from '@blueprintjs/core'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const formatQueryDate = d => {
  let date = new Date(d)
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

class QueryDisplay extends Component {
  render() {
    return (
      <div className="center">
        <h5>Query on <span className="pt-monospace-text">{this.props.tableName}</span></h5>
        <Tag className="pt-intent-primary pt-large">{formatQueryDate(this.props.startDate)}</Tag><Icon iconName="pt-icon-arrow-right" /><Tag className="pt-intent-primary pt-large">{formatQueryDate(this.props.endDate)}</Tag>
        <p>Column Name: {this.props.columnName}</p>
        <p>Aggregate: {this.props.aggregate !== null ? this.props.aggregate : 'null'}</p>
        <p className="pt-monospace-text pt-ui-text-large">{this.props.fullDataQuery}</p>
      </div>
    )
  }
}

export default QueryDisplay
