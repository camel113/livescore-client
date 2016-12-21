import React, { Component } from 'react';
import './App.css';
import { Link} from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {collapsed: true};
  }
  handleToggle(){
    this.setState({collapsed: !this.state.collapsed});
  }
  showOfflineWarning(){

  }
  hideOfflineWarning(){
    
  }
  render() {
    return (
       <div>
        <Navbar color="faded" light>
          <NavbarToggler className="float-sm-right hidden-lg-up collapsed" onClick={this.handleToggle.bind(this)} />
          <Collapse className="navbar-toggleable-md" isOpen={!this.state.collapsed}>
            <NavbarBrand href="/">reactstrap</NavbarBrand>
            <Nav navbar>
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
                <NavLink href="/Login">Login</NavLink>
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