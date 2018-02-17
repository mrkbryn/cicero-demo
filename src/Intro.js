import React, { Component } from 'react';

class Intro extends Component {
  render() {
    return (
      <div className="intro" style={{ margin: "20px", align: "left" }}>
        <h1 className="display-4">Welcome to Cicero DB</h1>
        <p>
          At the bottom of this page, there is a timeline representing the price of a financial asset
          for when it traded from December 2011 to January 2018. Use the left and right markers on
          the timeline to select a time range. Then, click the 'Get Vocalization' button to generate
          and hear a voice description of how the price of the asset has evolved over the selected time range.
        </p>
        <p>
          You can select between two voice generation methods below.
          The first method uses sampling to quickly generate approximate voice descriptions of the data.
          The second method processes the entire data for a time range to create the best possible description of the data.
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
