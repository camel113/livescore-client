import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Flexbox from 'flexbox-react';
import './Available.css';
import Match from './Match';

class AvailableMatchsList extends Component {

	fetchData(){
    this._executeQuery("http://127.0.0.1:8085/api/livematchs")
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

  render() {
    return (
      <section>
        <List>
      		<ListItem primaryText="ACVF" primaryTogglesNestedList={true} initiallyOpen={true} nestedItems={[
      			<ListItem key={1} primaryText="2e ligue" initiallyOpen={true} nestedItems={[
      				<ListItem key={1} primaryText={
      					<Flexbox flexDirection="row">
				          <Flexbox className="time-capsule" flexDirection="column" minWidth="50px">
				            <Flexbox>10/12</Flexbox>
				            <Flexbox>20h00</Flexbox>
				          </Flexbox>
				          <Match homeTeam={this.props.homeTeam} awayTeam={this.props.awayTeam}/>
				          <Flexbox flexDirection="column" minWidth="30px">
            				<div>{<ActionInfo />}</div>
          				</Flexbox>
			        </Flexbox>
      				}/>
    				]}/>
    			]} />
    		</List>
      </section>
    );
  }
}

export default AvailableMatchsList;