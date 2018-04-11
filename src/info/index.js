import React, { Component } from 'react'
import TableMetadataComponent from './TableMetadataComponent'
import { NonIdealState } from '@blueprintjs/core'
import { fetchGetRelationMetadata } from '../api'

class InfoPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tablesFetch: {
        fetching: false,
      },
      tables: []
    }
  }

  componentDidMount() {
    this.populateRelationMetadata()
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
        {
          this.state.tables.map(table => <TableMetadataComponent key={table.tableName} {...table} />)
        }
      </div>
    )
  }
}

export default InfoPage
