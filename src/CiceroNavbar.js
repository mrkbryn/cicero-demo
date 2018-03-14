import React, { Component } from 'react';
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Button,
} from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import logo from './cornell_logo.png';

class CiceroNavbar extends Component {
  render() {
    return (
      <Navbar className="pt-dark">
        <NavbarGroup>
          <NavbarHeading>CiceroDB Demo</NavbarHeading>
          <Button className="pt-minimal" iconName="home"><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link></Button>
          <Button className="pt-minimal" iconName="pt-icon-volume-up"><Link to="/voice_interface" style={{ textDecoration: 'none', color: 'inherit' }}>Voice Interface</Link></Button>
          <Button className="pt-minimal" iconName="home"><Link to="/user_study" style={{ textDecoration: 'none', color: 'inherit' }}>User Study</Link></Button>
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
