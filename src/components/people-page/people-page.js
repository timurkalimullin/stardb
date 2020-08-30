import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import Row from '../row/row';
import ErrorBoundry from '../error-boundry/error-boundry';

import './people-page.css';
import SwapiService from "../../services/swapi-service";

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: null,
    hasError: false
  };

  componentDidCatch(error, info) {

    this.setState({
      hasError: true
    });
  }

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  render() {

    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
      >
        {(item) => `${item.name} (${item.gender}, ${item.birthYear}) `}
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundry>
        <PersonDetails personId={this.state.selectedPerson} />
      </ErrorBoundry>
    );

    return (
      <ErrorBoundry>
        <Row
          left={itemList}
          right={personDetails} />
      </ErrorBoundry>
    );
  }
}
