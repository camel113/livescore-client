import React, { Component } from 'react';
import AvailableMatchsSection from './AvailableMatchsSection';

class AvailableMatchsList extends Component {

	fetchData(){
    this._executeQuery("http://api.footstats.ch/api/availablematchs")
  }

  constructor(props) {
    super(props);
    this.state = {matchs: [],loaded:false,message:""};
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

  componentDidMount() {
    this.fetchData()
    setInterval(this.fetchData.bind(this), 600000);
  }

  _handleResponse(response) {
    var data = response
    this.setState({
      loaded: true,
      matchs: data
    });
  }

  render() {
    return (
      <section id="available">
      		{this.state.matchs.map((league) => <AvailableMatchsSection key={league.region+league.league} region={league.region} league={league.league} matchs={league.matchs}/>)}
      </section>
    );
  }
}

export default AvailableMatchsList;