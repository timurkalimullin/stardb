import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import ItemDetails from '../item-details/item-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';

import './people-page.css';

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 3,
    selectedStarship: 10
  };

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  onStarshipSelected = (selectedStarship) => {
    this.setState({ selectedStarship });
  };

  render() {

    const personList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}>

        {(i) => (
          `${i.name} (${i.birthYear})`
        )}

      </ItemList>
    );

    const personDetails = (
      <ErrorBoundry>
        <ItemDetails
          itemId={this.state.selectedPerson}
          getData={this.swapiService.getPerson}
          getImageUrl={this.swapiService.getPersonImage} />
      </ErrorBoundry>
    );

    const starshipList = (
      <ItemList
        onItemSelected={this.onStarshipSelected}
        getData={this.swapiService.getAllStarships}>

        {(i) => (
          `${i.name}, (${i.manufacturer})`
        )}

      </ItemList>
    );

    const starshipDetails = (
      <ErrorBoundry>
        <ItemDetails
          itemId={this.state.selectedStarship}
          getData={this.swapiService.getStarship}
          getImageUrl={this.swapiService.getStarshipImage} />
      </ErrorBoundry>
    );

    return (
      <React.Fragment>
        <Row left={personList} right={personDetails} />
        <Row left={starshipList} right={starshipDetails} />
      </React.Fragment>
    )
  }
}
