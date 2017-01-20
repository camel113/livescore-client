import React, { Component } from 'react';
import { Link} from 'react-router'

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {collapsed: true};
  }
  handleToggle(){
    this.setState({collapsed: !this.state.collapsed});
  }
  render() {
    var buttonStyle = {
      border: "none"
    }
    var navbarStyle = {
      backgroundColor: "#2B2D42"
    }
    return (
       <div>
        <Navbar style={navbarStyle}  light toggleable>
          <NavbarToggler style={buttonStyle} right onClick={this.handleToggle.bind(this)} />
          <NavbarBrand href="/">Footstats Live</NavbarBrand>
          <Collapse navbar isOpen={!this.state.collapsed}>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Live</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/available/">Matchs disponibles</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/my">Mes matchs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Login">Connexion</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}

export default App;