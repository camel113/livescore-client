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
import Snackbar from 'material-ui/Snackbar';
import { isTokenExpired } from './utils/jwtHelper'
import {browserHistory} from 'react-router';
import { withRouter } from 'react-router';


import Match from './Match';

class AvailableMatch extends Component {

  constructor(props) {
    super(props);
    this.state = {reportOpen:false,errorOpen:false,snackSuccessOpen:false,snackFailOpen:false,loginRequiredOpen:false};
  }

  openReporter(){
    var token = localStorage.getItem("idToken")
    if(token != undefined && !isTokenExpired(token)){
      this.setState({reportOpen: true});
    }else{
      this.setState({loginRequiredOpen: true});
    }
  };

  _handleResponse(json){
    if(json.updated == true){
      this.showSnackSuccess()
    }else{
      this.showSnackFail()
    }
  };

  handleReportConfirm(){
    this.setState({reportOpen: false});
    
    console.log(this.props.matchId)

    fetch('http://127.0.0.1:8085/api/matchs/'+this.props.matchId, {
      method: 'PUT', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': 'Bearer '+localStorage.getItem('idToken')
      },
      body: JSON.stringify({
        info: "subscribe"
      })
    })
    .then(response => response.json())
    .then(json => this._handleResponse(json))
    .catch(error => this.showError());

  };

  hideReportConfirm(){
    this.setState({reportOpen: false});
  }

  showLoginRequired(){
    this.setState({loginRequiredOpen: true});
  }

  hideLoginRequired(){
    this.setState({loginRequiredOpen: false});
  }

  hideError(){
    this.setState({errorOpen: false}); 
  }

  showError(){
    this.setState({errorOpen: true});  
  }

  showSnackSuccess(){
    this.setState({snackSuccessOpen: true});
  }

  hideSnackSuccess(){
    this.setState({snackSuccessOpen: false});
  }

  showSnackFail(){
    this.setState({snackFailOpen: true});
  }

  hideSnackFail(){
    this.setState({snackFailOpen: false});
  }

  render() {
    const ConfirmReportActions = [
      <FlatButton
        label="Oui"
        primary={true}
        onTouchTap={this.handleReportConfirm.bind(this)}
      />,
      <FlatButton
        label="Non"
        primary={true}
        onTouchTap={this.hideReportConfirm.bind(this)}
      />,
    ];
    const LoginActions = [
      <FlatButton
        label="Se loguer"
        primary={true}
        onTouchTap={()=>this.props.router.push('/login')}
      />,
      <FlatButton
        label="Annuler"
        primary={true}
        onTouchTap={this.hideLoginRequired.bind(this)}
      />,
    ];
    const errorAction = <FlatButton label="Ok" primary={true} onTouchTap={this.hideError.bind(this)}/>
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
                  <MenuItem primaryText="Reporter" onTouchTap={this.openReporter.bind(this)}/>
                </IconMenu>
              </div>
            </Flexbox>
          </Flexbox>
        }/>
        <Dialog
          title="Confirmation"
          actions={ConfirmReportActions}
          modal={true}
          open={this.state.reportOpen}
        >
          Confirmes-tu ton choix de reporter ce match? Tu seras le seul à pouvoir reporter le score de ce match en direct.
        </Dialog>
        <Dialog
          title="Login"
          actions={LoginActions}
          modal={true}
          open={this.state.loginRequiredOpen}
        >
          Tu dois être logué pour reporter un match.
        </Dialog>
        <Dialog
          title="Problème réseau"
          actions={errorAction}
          modal={true}
          open={this.state.errorOpen}
        >
          Il semblerait qu'il y ait un problème de connexion. Veuillez réessayer dans quelques minutes
        </Dialog>
        <Snackbar
          open={this.state.snackSuccessOpen}
          message="Le match a été ajouté à tes matchs"
          autoHideDuration={4000}
          onRequestClose={this.hideSnackSuccess.bind(this)}
        />
        <Snackbar
          open={this.state.snackFailOpen}
          message="Le match vient d'être choisi par un autre utilisateur"
          autoHideDuration={4000}
          onRequestClose={this.hideSnackFail.bind(this)}
        />
      </div>
    );
  }
}

// PropTypes
AvailableMatch.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(AvailableMatch);