import React, { Component } from 'react'
import NotChromeWarning from '../common/NotChromeWarning'

/**
 * TODO: model interface after https://www.google.com/intl/en/chrome/demos/speech.html
 */
class VoiceInterface extends Component {
  render() {
    return (
      <div style={{ margin: "20px", align: "left" }}>
        <NotChromeWarning />
        <h1 className="display-4">Voice Interface</h1>
        <p>
          Try saying...
        </p>
        <ul>
          <li>"Tell me about Bitcoin from 2012 to 2014"</li>
          <li>"What was the weather in NYC from January 2011 to August 2011"</li>
        </ul>
      </div>
    )
  }
}

export default VoiceInterface
