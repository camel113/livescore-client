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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import Pencil from 'react-icons/lib/fa/pencil';

import Match from './Match';
import MatchTime from './MatchTime';

class AvailableMatch extends Component {

  constructor(props) {
    super(props);
    this.state = {reportOpen:false,errorOpen:false,snackSuccessOpen:false,snackFailOpen:false,loginRequiredOpen:false,live:false};
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
      console.log("SNACK SUCESS")
    }else{
      console.log("SNACK FAIL")
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

  toggleReportModal(){
    this.setState({
      reportOpen: !this.state.reportOpen
    });
  }

  toggleloginRequiredModal(){
    this.setState({
      loginRequiredOpen: !this.state.loginRequiredOpen
    });
  }

  toggleErrorModal(){
    this.setState({
      errorOpen: !this.state.errorOpen
    });
  }
  
  updateLive(status){
    this.setState({live: status}); 
  }

  render() {
    return (
      <ListGroupItem>
        <Flexbox className={(this.state.live ? 'live' : 'not-live')} flexDirection="row">
          <MatchTime time={this.props.time} live={this.updateLive.bind(this)}/>
          <Match homeTeam={this.props.homeTeam} awayTeam={this.props.awayTeam}/>
          <Flexbox flexDirection="column" width="50px">
            <Button onClick={this.openReporter.bind(this)}><Pencil /></Button>
          </Flexbox>
        </Flexbox>
        <Modal isOpen={this.state.reportOpen} toggle={this.toggleReportModal.bind(this)} className={this.props.className}>
          <ModalHeader toggle={this.toggleReportModal}>Confirmation</ModalHeader>
          <ModalBody>
            Confirmes-tu ton choix de reporter ce match? Tu seras le seul à pouvoir reporter le score de ce match en direct.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleReportConfirm.bind(this)}>Oui</Button>
            <Button color="secondary" onClick={this.hideReportConfirm.bind(this)}>Non</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.loginRequiredOpen} toggle={this.toggleloginRequiredModal.bind(this)} className={this.props.className}>
          <ModalHeader toggle={this.toggleloginRequiredModal}>Login requis</ModalHeader>
          <ModalBody>
            Tu dois être logué pour reporter un match.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>this.props.router.push('/login')}>Se loguer</Button>
            <Button color="secondary" onClick={this.hideLoginRequired.bind(this)}>Annuler</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.errorOpen} toggle={this.toggleErrorModal.bind(this)} className={this.props.className}>
          <ModalHeader toggle={this.toggleErrorModal}>Login requis</ModalHeader>
          <ModalBody>
            Il semblerait qu'il y ait un problème de connexion. Veuillez réessayer dans quelques minutes
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.hideError.bind(this)}>Annuler</Button>
          </ModalFooter>
        </Modal>
      </ListGroupItem>
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