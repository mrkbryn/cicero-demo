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
        <div className="pt-ui-text-large" style={{ margin: "10px", color: 'grey' }}>
          <p>Begin speaking to see speech recognition here...</p>
        </div>
      )
    }

    return (
      <div className="pt-ui-text-large" style={{ margin: "10px" }}>
        <span style={{ color: 'black', paddingRight: '3px' }}>{this.props.finalTranscript}</span><span style={{ color: 'grey' }}>{this.props.interimTranscript}</span>
      </div>
    )
  }
}

export default TranscriptDisplay
