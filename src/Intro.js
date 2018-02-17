import React, { Component } from 'react';

class Intro extends Component {
  render() {
    return (
      <div className="intro" style={{ margin: "20px", align: "left" }}>
        <h1 className="display-4">Welcome to Cicero DB</h1>
        <p className="lead">
          We present a unique way to interact with data: through a voice interface.
        </p>
        <p>
          At the bottom of this page, there is a timeline representing the price of a financial asset
          for when it traded from December 2011 to January 2018. Use the left and right markers on
          the timeline to select a time range. Then, click the 'Get Vocalization' button to generate
          and hear a voice description of how the price of the asset has changed during the selected time range.
        </p>
        <p>
          We have provided two methods for voice generation, which you can switch between below.
          The first method uses sampling to quickly generate high quality voice descriptions of the data.
          The second method processes the entire data for a time range to create the best description of the data.
          However, this second method may take much longer than the sampling method due to the amount of data it has
          to process. You can freely switch between the two methods as you explore the data.
        </p>
        <p>
          <em>Note: Please enter your AMT user ID to ensure we have a record of your participation in our user study.</em>
        </p>
      </div>
    );
  }
}

export default Intro;
