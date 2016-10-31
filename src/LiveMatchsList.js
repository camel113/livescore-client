import React, { Component } from 'react';
import LiveMatchsSection from './LiveMatchsSection';

class LiveMatchsList extends Component {
  render() {
    return (
      <div className="LiveMatch">
        <p>{this.state.message}</p>
        {this.state.matchs.map((league) => <LiveMatchsSection key={league.region+league.league} region={league.region} league={league.league} matchs={league.matchs}/>)}
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {matchs: [],loaded:false,message:""};
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData(){
    // this._executeQuery("http://127.0.0.1:8080/api/matchs");
    this._executeQuery("http://127.0.0.1:8080/api/foo");
  }

  _executeQuery(query) {
    this.setState({ loaded: false });
    fetch(query)
    .then(response => response.json())
    .then(json => this._handleResponse(json))
    .catch(error =>
       this.setState({
        loaded: false,
        message: 'Something bad happened ' + error
      })
    );
  }

  _handleResponse(response) {
    var data = response
    console.log("console.log")
    console.log(data)
    // data.map((match) => <LiveMatch/>);
    this.setState({
      loaded: true,
      matchs: data
    });
  }


}

export default LiveMatchsList;