import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import ItemDetails from '../item-details/item-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
import { Record } from '../item-details/item-details';

import './starship-page.css';

export default class StarshipPage extends Component {

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
    const starshipList = (
      <ItemList
        onItemSelected={this.onStarshipSelected}
        getData={this.swapiService.getAllStarships}>

        {(i) => (
          `${i.name}`
        )}

      </ItemList>
    );

    const starshipDetails = (
      <ErrorBoundry>
        <ItemDetails
          itemId={this.state.selectedStarship}
          getData={this.swapiService.getStarship}
          getImageUrl={this.swapiService.getStarshipImage} >
          <Record field="manufacturer" label="Manufacturer" />
          <Record field="length" label="Length" />
          <Record field="model" label="Model" />
        </ItemDetails>
      </ErrorBoundry>
    );

    return (
      <Row left={starshipList} right={starshipDetails} />
    )
  }
}
