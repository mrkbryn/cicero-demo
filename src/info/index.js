import React, { Component } from 'react'
import DataCards from './DataCards'
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
    return (
      <div style={{ margin: "20px", align: "left" }}>
        <h3>Info</h3>
        <DataCards
          tablesFetch={this.state.tablesFetch}
          tables={this.state.tables}
        />
      </div>
    )
  }
}

export default InfoPage
