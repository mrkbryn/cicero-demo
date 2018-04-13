import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tag, Icon } from '@blueprintjs/core'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const formatQueryDate = d => {
  let date = new Date(d)
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

class DateRangeComponent extends Component {
  static propTypes = {
    startDate: PropTypes.any,
    endDate: PropTypes.any
  }

  render() {
    if (this.props.startDate === undefined || this.props.endDate === undefined) {
      return null
    }
    
    return (
      <div>
        <Tag className="pt-intent-primary pt-large">
          {formatQueryDate(this.props.startDate)}
        </Tag>
        <Icon iconName="pt-icon-arrow-right" />
        <Tag className="pt-intent-primary pt-large">
          {formatQueryDate(this.props.endDate)}
        </Tag>
      </div>
    )
  }
}

export default DateRangeComponent
