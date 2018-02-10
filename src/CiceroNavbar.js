import React, { Component } from 'react';
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Button,
} from '@blueprintjs/core';

class CiceroNavbar extends Component {
  render() {
    return (
      <Navbar>
        <NavbarGroup>
            <NavbarHeading>Cicero - Time Series Vocalization</NavbarHeading>
        </NavbarGroup>
        <NavbarGroup align="right">
          <Button className="pt-minimal" iconName="cog"></Button>
        </NavbarGroup>
      </Navbar>
    )
  }
}

export default CiceroNavbar;
