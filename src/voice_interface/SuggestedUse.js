import React, { Component } from 'react'

class SuggestedUse extends Component {
  render() {
    return (
      <div className="pt-ui-text-large" style={{ margin: "20px" }}>
        <ul className="font-italic">
          <li>"Tell me about Bitcoin price from January 2012 to December 2012"</li>
          <li>"What was the weather in New York City from January 2011 to August 2011"</li>
        </ul>
      </div>
    )
  }
}

export default SuggestedUse
