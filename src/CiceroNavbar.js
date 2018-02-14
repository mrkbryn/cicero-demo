import React, { Component } from 'react';
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
} from '@blueprintjs/core';
import logo from './cornell_logo.png';

class CiceroNavbar extends Component {
  render() {
    return (
      <Navbar className="pt-dark">
        <NavbarGroup>
          <NavbarHeading>Cicero - Time Series Vocalization</NavbarHeading>
        </NavbarGroup>
        <NavbarGroup align="right">
          <span>Cornell Database Group</span>
          <NavbarDivider />
          <span><img className="App-logo" src={logo} alt="Cornell University" /></span>
        </NavbarGroup>
      </Navbar>
    )
  }
}

export default CiceroNavbar;
