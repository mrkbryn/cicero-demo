import React, { Component } from 'react'
import {
  Button,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
} from '@blueprintjs/core'
import logo from './cornell_logo.png'
import { Link } from 'react-router-dom'

class CiceroNavbar extends Component {
  render() {
    return (
      <Navbar className="pt-dark">
        <NavbarGroup>
          <NavbarHeading>CiceroDB Demo</NavbarHeading>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button className="pt-minimal" iconName="pt-icon-home">Home</Button>
          </Link>
          <Link to="/info" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button className="pt-minimal" iconName="pt-icon-info-sign">Info</Button>
          </Link>
        </NavbarGroup>
        <NavbarGroup align="right">
            <span><a href="http://www.cs.cornell.edu/database/" style={{ textDecoration: 'none', color: 'inherit' }}>Cornell Database Group</a></span>
            <NavbarDivider />
            <span><img className="App-logo" src={logo} alt="Cornell University" /></span>
        </NavbarGroup>
      </Navbar>
    )
  }
}

export default CiceroNavbar;
