import React, { Component } from 'react'
import TableMetadataComponent from './TableMetadataComponent'
import { NonIdealState } from '@blueprintjs/core'
import { fetchGetRelationMetadata, fetchUniversalQueryFragments } from '../api'

class InfoPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tablesFetch: {
        fetching: false,
      },
      tables: [],
      queryFragmentsFetch: {
        fetching: false
      },
      queryFragments: []
    }
  }

  componentDidMount() {
    this.populateRelationMetadata()
    this.populateQueryFragments()
  }

  populateQueryFragments() {
    this.setState({ queryFragmentsFetch: { fetching: true }})
    fetchUniversalQueryFragments()
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          this.setState({ queryFragmentsFetch: { fetching: false, error: json.message }})
        } else {
          this.setState({ queryFragmentsFetch: { fetching: false }, queryFragments: json })
        }
      })
      .catch(() => {
        this.setState({ queryFragmentsFetch: { fetching: false, error: 'Failed to fetch query fragments from CiceroDB' }})
      })
  }

  populateRelationMetadata() {
    this.setState({ tablesFetch: { fetching: true }})
    fetchGetRelationMetadata()
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          this.setState({ tablesFetch: { fetching: false, error: json.message }})
        } else {
          this.setState({ tablesFetch: { fetching: false }, tables: json })
        }
      })
      .catch(() => {
        this.setState({ tablesFetch: { fetching: false, error: 'Failed to fetch database metadata from CiceroDB' }})
      })
  }

  render() {
    if (this.state.tablesFetch.error) {
      return (
        <div style={{ margin: "20px" }}>
          <NonIdealState
            title="Error"
            description="Failed to fetch table information from CiceroDB"
            visual="pt-icon-error"
          />
        </div>
      )
    }

    return (
      <div style={{ margin: "20px", align: "left" }}>
        <div>
          <h4>Query Fragments</h4>
          <p>The query fragments below work with all tables. You can include them in your commands to aggregate over data and add functions for more complex queries.</p>
          {this.state.queryFragmentsFetch.error ?
            <NonIdealState
              title="Error"
              description="Failed to fetch query fragments from CiceroDB"
              visual="pt-icon-error"
            />
              :
            <ul>
              {this.state.queryFragments.map(fragment => <li key={fragment.keyword}><em>"{fragment.keyword}"</em> - {fragment.type}, <span className="pt-monospace-text pt-ui-text-large">{fragment.fragment}</span></li>)}
            </ul>
          }
        </div>
        <div>
          <h4>Tables</h4>
          {
            this.state.tables.map(table => <TableMetadataComponent key={table.tableName} {...table} />)
          }
        </div>
      </div>
    )
  }
}

export default InfoPage
