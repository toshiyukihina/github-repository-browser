import React from 'react';
import { Navbar, Nav, Glyphicon } from 'react-bootstrap';

class Header extends React.Component {

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">
              Github Repository Browser
            </a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
  
}

export default Header;
