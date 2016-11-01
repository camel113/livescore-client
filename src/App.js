import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LiveMatchsList from './LiveMatchsList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }
  handleToggle(){
    this.setState({open: !this.state.open});
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <Drawer open={this.state.open} docked={false} onRequestChange={this.handleToggle.bind(this)}>
            <MenuItem>Menu Item</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
          </Drawer>
          <AppBar title="Livescore" onLeftIconButtonTouchTap={this.handleToggle.bind(this)}/>
          <LiveMatchsList />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;