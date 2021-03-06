import React, { Component } from 'react'
import {
  XYPlot,
  LineMarkSeries,
  makeWidthFlexible
} from 'react-vis';

let FlexibleXYPlot = makeWidthFlexible(XYPlot)

class SampledTimesDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null
    }
  }

  _rememberValue = (value) => {
    console.log(value)
    this.setState({ value: value.x })
  }

  _forgetValue = () => {
    this.setState({
      value: null
    })
  }

  render() {
    const {value} = this.state;
    if (this.props.sampledTimes) {
      let data = []
      for (var i = 0; i < this.props.sampledTimes.length; i++) {
        data.push({x: new Date(this.props.sampledTimes[i]), y: 0})
      }

      return (
        <div>
          <h5>Sampled Times</h5>
          <FlexibleXYPlot height={50}>
            <LineMarkSeries
              onValueMouseOver={this._rememberValue}
              onValueMouseOut={this._forgetValue}
              data={data}
            />
          </FlexibleXYPlot>
          {value ?
            <p>{value.toDateString()}</p> :
            null
          }
        </div>
      )
    }

    return null
  }
}

export default SampledTimesDisplay
