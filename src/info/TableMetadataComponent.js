import React, { Component } from 'react'
import { Card } from '@blueprintjs/core'
import PropTypes from 'prop-types'

class TableMetadataComponent extends Component {
  static propTypes = {
    tableName: PropTypes.string,
    timeColumnName: PropTypes.string,
    keywords: PropTypes.array,
    description: PropTypes.string,
    queryFragments: PropTypes.array
  }

  render() {
    return (
      <div style={{ margin: "10px" }}>
        <Card elevation={1}>
          <h5>{this.props.tableName}</h5>
          <p>{this.props.description}</p>
          <h6>Query Fragments</h6>
          <ul>
            {this.props.queryFragments.map(fragment => <li><em>"{fragment.keyword}"</em>: {fragment.tableName}, {fragment.type}, <span className="pt-monospace-text">{fragment.fragment}</span></li>)}
          </ul>
        </Card>
      </div>
    )
  }
}

export default TableMetadataComponent
