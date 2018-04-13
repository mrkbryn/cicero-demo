import React, { Component } from 'react'

class SuggestedUse extends Component {
  render() {
    return (
      <div className="pt-ui-text-large row">
        <div className="col">
          <p>Try saying...</p>
          <ul className="font-italic">
            <li>Tell me about Bitcoin price from January 2012 to December 2012</li>
            <li>How did Bitcoin price change from 2012 to 2016</li>
            <li>Tell me about the daily crime rate in Chicago during 2012</li>
            <li>What was the weather in New York City during 2011</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default SuggestedUse
