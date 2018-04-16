import React, { Component } from 'react'
import { Card } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import DateRangeComponent from '../common/DateRangeComponent'

class TableMetadataComponent extends Component {
  static propTypes = {
    tableName: PropTypes.string,
    timeColumnName: PropTypes.string,
    keywords: PropTypes.array,
    description: PropTypes.string,
    queryFragments: PropTypes.array,
    minDate: PropTypes.string,
    maxDate: PropTypes.string
  }

  render() {
    return (
      <div style={{ margin: "10px" }}>
        <Card elevation={1}>
          <div className="row">
            <div className="col">
              <h5>{this.props.tableName}</h5>
              <p>{this.props.description}</p>
            </div>
            <div className="col" style={{ textAlign: "right" }}>
              <DateRangeComponent
                startDate={this.props.minDate}
                endDate={this.props.maxDate}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-9">
              <h6>Query Fragments</h6>
              <ul>
                {this.props.queryFragments.length === 0 && <li>None</li>}
                {this.props.queryFragments.map(fragment => <li><em>"{fragment.keyword}"</em> - {fragment.type}, <span className="pt-monospace-text pt-ui-text-large">{fragment.fragment}</span></li>)}
              </ul>
            </div>
            <div className="col-3">
              <p>Tuple Count: {this.props.totalTuples.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default TableMetadataComponent
