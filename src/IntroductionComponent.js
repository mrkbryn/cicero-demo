import React, { Component } from 'react';

class IntroductionComponent extends Component {
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
        <h4>The Task</h4>
        <p>
          The task is to select the time range at which it would be best to buy
          then sell at the final price. We describe best in terms of the greatest
          increase, i.e. if you had bought one bitcoin as a gift at some beginning
          time, then were able to sell at some end date, what was the best time period
          to receive then sell so that the difference in the price is the greatest.
        </p>
      </div>
    );
  }
}

export default IntroductionComponent;
