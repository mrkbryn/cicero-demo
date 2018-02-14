import React, { Component } from 'react';

class IntroductionComponent extends Component {
  render() {
    return (
      <div className="intro" style={{ margin: "20px", align: "left" }}>
        <h1>Welcome!</h1>
        <p>
          Welcome to the demo of CiceroDB Time Series functionality, made by the
          Cornell Database Group. CiceroDB is an experimental database
          system that supports voice interactions with data.

          In this project, we demonstrate how our prototype system can vocalize time
          series data, i.e. numerical data that has some dimension of time. This
          includes domains such as minute-by-minute closing prices for different
          stocks or financial instruments.
        </p>

        <p>
          Below, we provide an interface for selecting time ranges for which you
          want to hear voice descriptions of how Bitcoin has traded during that time range. This dataset includes
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
