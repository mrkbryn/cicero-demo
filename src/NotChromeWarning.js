import React, { Component } from 'react';
import { Callout } from '@blueprintjs/core';

/**
 * Renders a warning at the top of the page if the user is not using Google Chrome.
 * Doesn't render an element if the user is within a Chrome browser.
 */
class NotChromeWarning extends Component {
  render() {
    if (window.chrome) {
      return null;
    }

    return (
        <Callout
          className="pt-intent-warning"
          iconName="pt-icon-warning-sign"
          style={{ margin: "20px" }}
          title="Warning: Use Chrome for Best Voice Quality"
        >
          If you have it installed, please use Google Chrome for the best voice quality output.
        </Callout>
    );
  }
}

export default NotChromeWarning;
