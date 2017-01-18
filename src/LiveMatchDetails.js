import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import { isTokenExpired } from './utils/jwtHelper'

import Match from './Match';
import MatchTime from './MatchTime';
import Score from './Score';

class LiveMatchDetails extends Component {

	fetchData(){
    fetch("http://127.0.0.1:8085/api/matchs/"+this.props.params.matchId)
    .then(response => response.json())
    .then(json => this._handleResponse(json))
    .catch(error => console.log("error "+error));
  }

  constructor(props) {
    super(props);
    this.state = {matchId:"",homeT:"",awayT:"",homeS:0,awayS:0,date:"",time:"",goalFormOpen:false,live:false,errorModalOpen:false,goals:[]};
  }

  componentDidMount() {
    this.fetchData()
    this.timer = setInterval(
      () => this.fetchData(),
      60000
    );
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  _handleResponse(data){
  	console.log(data)
  	this.setState({homeT:data.homeTeam.name,awayT:data.awayTeam.name,time:data.date,goals:data.goals,awayS:data.awayTeam.score,homeS:data.homeTeam.score})
  }

  updateLive(status){
    this.setState({live: status}); 
  }



  render() {
    var style = {
      matchBox: {
        padding: "10px 10px 10px 0px",
        borderBottom: "5px solid #eceeef"
      },
      live:{
        "borderLeft": "4px solid #C2F970"
      },
      notLive:{
        borderLeft: "4px solid #fff"
      }
    }
    return (
      <section>
        <Flexbox flexGrow={1} flexDirection="row" style={this.state.live ? Object.assign(style.matchBox, style.live) : Object.assign(style.matchBox, style.notLive)} minWidth="0px">
          <MatchTime time={this.state.time} live={this.updateLive.bind(this)}/>
          <Match homeTeam={this.state.homeT} awayTeam={this.state.awayT}/>
          <Score homeTeamScore={this.state.homeS} awayTeamScore={this.state.awayS} />
        </Flexbox>
        <Table>
          <tbody>
            {this.state.goals.map((goal) => <tr key={goal._id}><td>{goal.time}</td><td>{goal.score}</td><td>{goal.scorer}</td></tr>)}
          </tbody>
        </Table>
      </section>
    );
  }
}
export default LiveMatchDetails;