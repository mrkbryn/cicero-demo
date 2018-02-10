import React, { Component } from 'react';

class IntroductionComponent extends Component {
  render() {
    return (
      <div className="intro" style={{ margin: "20px", align: "left" }}>
        <h1>Welcome!</h1>
        <p>
          Welcome to the demo of CiceroDB Time Series functionality, brought to
          you by Cornell Database Group. CiceroDB is an experimental database
          system that supports voice interactions with data. In the previous
          project, we examined how to take relational data that a user requests,
          such as a list of restaurants from a database corresponding to
          the top nearby restaurants, and turn the result into a voice output
          suitable for voice assistants like the Google Assistant or Amazon Alexa.
        </p>

        <p>
          In this project, we demonstrate our research on how to vocalize time
          series data, or numerical data that has some time dimension. This
          includes domains such as minute-by-minute closing prices for different
          stocks or financial instruments.
        </p>

        <p>
          Below, we provide a user interface for interacting with the minute-by-minute
          closing price of Bitcoin on the Bitstamp exchange. This dataset includes
          over 3 million rows. You can use the range sliders below to specify
          the data range that you are interested in learning about. After moving
          the range slider to the data you are interested in, click 'Get Vocalization'
          to hear the voice description of how the price of Bitcoin changed over
          that time period.
        </p>
      </div>
    );
  }
}

export default IntroductionComponent;
