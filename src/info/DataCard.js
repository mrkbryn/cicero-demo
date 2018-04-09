import React, { Component } from 'react'
import { Card, Tag } from '@blueprintjs/core'

class DataCard extends Component {
  render() {
    let table = this.props.table
    // TODO: add div {table.earliestDate.toDateString()} <Icon iconName="arrow-right" iconSize={20} /> {table.latestDate.toDateString()}
    return (
      <div style={{ margin: "10px" }}>
          <Card elevation={0}>
            <h5>{table.tableName}</h5>
            <p>{table.description}</p>
            Keywords:
            {table.keywords.map(keyword => <Tag key={keyword} style={{ margin: "5px" }}>{keyword}</Tag>)}
          </Card>
      </div>
    )
  }
}

export default DataCard
