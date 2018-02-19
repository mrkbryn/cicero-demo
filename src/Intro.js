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
          <em>Note: Please enter your AMT user ID to ensure we have a record of your participation in our user study.</em>
        </p>
      </div>
    );
  }
}

export default Intro;
