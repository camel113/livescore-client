import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import {ListItem} from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import moment from 'moment'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Match from './Match';

class AvailableMatch extends Component {

  constructor(props) {
    super(props);
    this.state = {open:false,errorOpen:false};
  }

  handleOpen(){
    this.setState({open: true});
  };

  _handleResponse(json){
    console.log(json)
  };

  handleConfirm(){
    this.setState({open: false});
    
    console.log(this.props.matchId)

    fetch('http://127.0.0.1:8085/api/matchs/'+this.props.matchId, {
      method: 'PUT', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: "Adrien"
      })
    })
    .then(response => response.json())
    .then(json => this._handleResponse(json))
    .catch(error => this.openError());

  };

  handleCancel(){
    this.setState({open: false});
  }

  closeError(){
    this.setState({errorOpen: false}); 
  }

  openError(){
    this.setState({errorOpen: true});  
  }

  closeSuccess(){
    this.setState({errorOpen: false}); 
  }

  openError(){
    this.setState({errorOpen: true});  
  }

  render() {
    const actions = [
      <FlatButton
        label="Oui"
        primary={true}
        onTouchTap={this.handleConfirm.bind(this)}
      />,
      <FlatButton
        label="Non"
        primary={true}
        onTouchTap={this.handleCancel.bind(this)}
      />,
    ];
    const errorAction = <FlatButton label="Ok" primary={true} onTouchTap={this.closeError.bind(this)}/>
    return (
      <div>
        <ListItem key={1} primaryText={
          <Flexbox flexDirection="row">
            <Flexbox className="time-capsule" flexDirection="column" minWidth="50px">
              <Flexbox className="time">{moment(this.props.time).format("HH:mm")}</Flexbox>
            </Flexbox>
            <Match homeTeam={this.props.homeTeam} awayTeam={this.props.awayTeam}/>
            <Flexbox flexDirection="column" minWidth="30px">
              <div>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                  <MenuItem primaryText="Reporter" onTouchTap={this.handleOpen.bind(this)}/>
                </IconMenu>
              </div>
            </Flexbox>
          </Flexbox>
        }/>
        <Dialog
          title="Confirmation"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Confirmes-tu ton choix de reporter ce match? Tu seras le seul à pouvoir reporter le score de ce match en direct.
        </Dialog>
        <Dialog
          title="Problème réseau"
          actions={errorAction}
          modal={true}
          open={this.state.errorOpen}
        >
          Il semblerait qu'il y ait un problème de connexion. Veuillez réessayer dans quelques minutes
        </Dialog>
      </div>
    );
  }
}

export default AvailableMatch;