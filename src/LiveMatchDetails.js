import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import { isTokenExpired } from './utils/jwtHelper'

import MatchInfoBox from './MatchInfoBox'

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
      table: {
        borderTop: "5px solid #eceeef"
      }
    }
    return (
      <section>
        <MatchInfoBox time={this.state.time} homeT={this.state.homeT} awayT={this.state.awayT} homeS={this.state.homeS} awayS={this.state.awayS} />
        <Table style={style.table}>
          <tbody>
            {this.state.goals.map((goal) => <tr key={goal._id}><td>{goal.time}</td><td>{goal.score}</td><td>{goal.scorer}</td></tr>)}
          </tbody>
        </Table>
      </section>
    );
  }
}
export default LiveMatchDetails;