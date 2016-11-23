import React, { Component } from 'react';
import './App.css';
import { Link} from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }
  handleToggle(){
    this.setState({open: !this.state.open});
  }
  showOfflineWarning(){

  }
  hideOfflineWarning(){
    
  }
  render() {
    // let children = null;
    // if (this.props.children) {
    //   children = React.cloneElement(this.props.children, {
    //     auth: this.props.route.auth //sends auth instance from route to children
    //   })
    // }
    return (
      <MuiThemeProvider>
        <div className="app">
          <Drawer open={this.state.open} docked={false} onRequestChange={this.handleToggle.bind(this)}>
            <MenuItem><Link to="/">Home</Link></MenuItem>
            <Divider />
            <Subheader>Reporter</Subheader>
            <MenuItem><Link to="/available">Matchs disponibles</Link></MenuItem>
            <MenuItem><Link to="/my">Mes matchs</Link></MenuItem>
          </Drawer>
          <AppBar title="Livescore" onLeftIconButtonTouchTap={this.handleToggle.bind(this)}/>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;