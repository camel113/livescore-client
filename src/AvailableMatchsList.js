import React, { Component } from 'react';
import {List} from 'material-ui/List';
import AvailableMatchsSection from './AvailableMatchsSection';

class AvailableMatchsList extends Component {

	fetchData(){
    this._executeQuery("http://127.0.0.1:8085/api/availablematchs")
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
    console.log("console.log")
    console.log(data)
    // data.map((match) => <LiveMatch/>);
    this.setState({
      loaded: true,
      matchs: data
    });
  }

  render() {
    return (
      <section>
        <List>
      		{this.state.matchs.map((league) => <AvailableMatchsSection key={league.region+league.league} region={league.region} league={league.league} matchs={league.matchs}/>)}
    		</List>
      </section>
    );
  }

  // render() {
  //   return (
  //     <section>
  //       <List>
  //     		<ListItem primaryText="ACVF" primaryTogglesNestedList={true} initiallyOpen={true} nestedItems={[
  //     			<ListItem key={1} primaryText="2e ligue" initiallyOpen={true} nestedItems={[
  //     				<ListItem key={1} primaryText={
  //     					<Flexbox flexDirection="row">
		// 		          <Flexbox className="time-capsule" flexDirection="column" minWidth="50px">
		// 		            <Flexbox>10/12</Flexbox>
		// 		            <Flexbox>20h00</Flexbox>
		// 		          </Flexbox>
		// 		          <Match homeTeam={this.props.homeTeam} awayTeam={this.props.awayTeam}/>
		// 		          <Flexbox flexDirection="column" minWidth="30px">
  //           				<div>{<ActionInfo />}</div>
  //         				</Flexbox>
		// 	        </Flexbox>
  //     				}/>
  //   				]}/>
  //   			]} />
  //   		</List>
  //     </section>
  //   );
  // }
}

export default AvailableMatchsList;