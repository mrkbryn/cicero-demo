import React, { Component } from 'react';

class Intro extends Component {
  render() {
    return (
      <div className="intro" style={{ margin: "20px", align: "left" }}>
        <h1 className="display-4">Welcome</h1>
        <p>
          This interface allows you to visualize the price evolution of a financial asset between December 2011 and January 2018.
          Use the left and right markers on the timeline below to select a time range. Then, click the 'See Result' button to see the
          price evolution during the specified time period.
        </p>
        <p>
          <em>Note: Please enter your AMT user ID to ensure we have a record of your participation in our user study.</em>
        </p>
      </div>
    );
  }
}

export default Intro;
