import React, { Component } from 'react'

class Home extends Component {
  render() {
    return (
      <div style={{ margin: "20px", align: "left" }}>
        <h1 className="display-4">CiceroDB</h1>
        <p>
          Welcome to CiceroDB, an experimental database system that allows users
          to interact with a database through a voice interface. This project is based
          on the research in <a href="http://www.cs.cornell.edu/database/vocalization/">Data Vocalization</a>
          from Cornell's Database Group.
        </p>
      </div>
    )
  }
}

export default Home
