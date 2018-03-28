import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TranscriptDisplay extends Component {
  static propTypes = {
    finalTranscript: PropTypes.string,
    interimTranscript: PropTypes.string
  }

  render() {
    if (this.props.finalTranscript === '' && this.props.interimTranscript === '') {
      return (
        <div className="pt-ui-text-large" style={{ margin: "40px", color: 'grey' }}>
          <p>Hey Cicero...</p>
        </div>
      )
    }

    return (
      <div className="pt-ui-text-large" style={{ margin: "40px" }}>
        <p>{this.props.finalTranscript} {this.props.interimTranscript}</p>
      </div>
    )
  }
}

export default TranscriptDisplay
