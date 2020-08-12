import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';
import PeoplePage from '../people-page/people-page';

class App extends React.Component {
  state = {

  }

  render() {
    return (
      <div>
        <Header />
        <RandomPlanet />
        <PeoplePage />
      </div >
    );
  }
};

export default App;
