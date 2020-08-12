import React, { Component } from 'react';

import './person-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/index';
import ErrorIndicator from '../error-indicator/error-indicator';

export default class PersonDetails extends Component {
  swapiService = new SwapiService();

  state = {
    person: null,
    loading: true,
    haserror: false
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.setState({ loading: true })
      this.updatePerson();
    }
  }

  componentDidCatch() {
    this.setState({ haserror: true })
  }

  onPersonLoaded = (person) => {
    this.setState({ person, loading: false });
  }

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then(this.onPersonLoaded)
  }

  render() {
    const { loading, person, haserror } = this.state;
    if (haserror) {
      console.log('Error');
      return <ErrorIndicator />
    }
    if (!person) {
      return <span>Select character with click</span>
    }
    const spinner = loading ? <Spinner /> : null;
    const body = !loading ? <Body person={this.state.person} /> : null;
    return (
      <div className="person-details card">
        {spinner}
        {body}
      </div>
    )
  }
}

const Body = ({ person }) => {
  const { name, eyeColor, id, birthYear, gender } = person;
  return (
    <React.Fragment>
      <img className="person-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
      />
      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}
