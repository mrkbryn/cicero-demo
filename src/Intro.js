import React, { Component } from 'react';

class Intro extends Component {
  render() {
    return (
      <div className="intro" style={{ margin: "20px", align: "left" }}>
        <h1 className="display-4">Welcome to Cicero DB</h1>
        <p>
          This interface allows you to hear about the price evolution of a financial asset between December 2011 and January 2018.
          Use the left and right markers on the timeline below to select a time range. Choose the output method between
          vocalization (i.e., voice description) and sonification (i.e., values in selected time range are translated into notes,
          the higher the frequency, the higher the value). Then, click the 'Hear Result' button to hear either voice or sound.
          You may choose a different method for each output.
        </p>
        <p>
          <em>Note: Please enter your AMT user ID to ensure we have a record of your participation in our user study.</em>
        </p>
      </div>
    );
  }
}

export default Intro;
