import React, { Component } from 'react'
import DataCards from './DataCards'
import SuggestedUse from './SuggestedUse'
import { fetchGetRelationMetadata } from '../api'

/**
 * Displays metadata about what is stored in the backend database as well
 * as how to formulate natural language queries about the database data.
 * Also, displays any errors encountered while attempting to retrieve the
 * metadata from the backend.
 */
class UsageDisplay extends Component {
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
    return (
      <div>
        <DataCards
          tablesFetch={this.state.tablesFetch}
          tables={this.state.tables}
        />
        <SuggestedUse />
      </div>
    )
  }
}

export default UsageDisplay
