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
  // TODO: add these links back
  // <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><Button className="pt-minimal" iconName="home">Home</Button></Link>
  // <Link to="/voice_interface" style={{ textDecoration: 'none', color: 'inherit' }}><Button className="pt-minimal" iconName="pt-icon-volume-up">Voice Interface</Button></Link>
  // <Link to="/user_study" style={{ textDecoration: 'none', color: 'inherit' }}><Button className="pt-minimal" iconName="pt-icon-people">User Study</Button></Link>

  render() {
    return (
      <Navbar className="pt-dark">
        <NavbarGroup>
          <NavbarHeading>CiceroDB Demo</NavbarHeading>
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
