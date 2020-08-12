import React from 'react';

import ItemList from '../item-list/index';
import PersonDetails from '../person-details/index';

import './people-page.css';
import ErrorIndicator from '../error-indicator/error-indicator';

export default class PeoplePage extends React.Component {
  state = {
    selectedPerson: 1,
    hasError: false
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return (
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList
            onItemSelected={this.onPersonSelected}
          />
        </div>
        <div className="col-md-6">
          <PersonDetails
            personId={this.state.selectedPerson}
          />
        </div>
      </div>
    )
  }
}
