import React, { Component } from 'react';
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core';

class CiceroNavbar extends Component {
  render() {
    return (
      <Navbar>
        <NavbarGroup>
            <NavbarHeading>Cicero - Time Series Vocalization</NavbarHeading>
        </NavbarGroup>
      </Navbar>
    )
  }
}

export default CiceroNavbar;
