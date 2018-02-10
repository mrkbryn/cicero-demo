import React, { Component } from 'react';
import logo from './cornell_logo.svg';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <span className="text-muted">Cornell Database Group | <img className="App-logo" src={logo} alt="Cornell University" /></span>
        </div>
      </footer>
    );
  }
}

export default Footer;
