import React, { Component } from 'react';

class Intro extends Component {
  render() {
    return (
      <div className="intro" style={{ margin: "20px", align: "left" }}>
        <h1 className="display-4">Welcome to Cicero DB</h1>
        <p className="lead">
          We present a unique way to interact with data: through voice output.
        </p>
        <h4>An Explanation of the Demo</h4>
        <p>
          Below, we have provided an interface that allows selecting a range
          of data and then hearing voice output that describes the data
          during that time.
        </p>
        <p>
          The data you can interact with is the historical price of Bitcoin
          from the Bitstamp exchange from 2011 to the beginning of 2018.
          It contains the minute-by-minute closing prices on this Bitcoin
          exchange (over 3 million data points!), which is stored in a database.
        </p>
        <p>
          There are two methods for generating the voice output that describes
          the Bitcoin price for a time range. We have a fast, sampling algorithm
          that quickly generates approximate descriptions. Also, we have a slow, precise
          algorithm that generates optimal descriptions of data. You can
          switch between the two methods with the buttons below.
        </p>
      </div>
    );
  }
}

export default Intro;
