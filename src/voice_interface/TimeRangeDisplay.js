import React, { Component } from 'react'
import { Tag, Icon } from '@blueprintjs/core'

/**
 * Component to display the time range a user has selected or spoken
 */
class TimeRangeDisplay extends Component {
  render() {
    var firstDateString = this.props.firstDate ? this.props.firstDate.toDateString() : "no start date";
    var secondDateString = this.props.secondDate ? this.props.secondDate.toDateString() : "no end date";
    return (
      <div>
        Selected Time Range:
        <Tag className="pt-large pt-intent-primary" style={{ margin: "5px" }}>
            {firstDateString}
        </Tag>
        <Icon iconName="arrow-right" iconSize={20} />
        <Tag className="pt-large pt-intent-primary" style={{ margin: "5px" }}>
            {secondDateString}
        </Tag>
      </div>
    )
  }
}

export default TimeRangeDisplay
