import React from 'react';
import ItemList from '../item-list/item-list';
import { withData, withSwapiService } from '../hoc-helpers';

const withChildFunction = (fn) => (Wrapped) => {
  return (props) => {
    return (
      <Wrapped  {...props}>
        {fn}
      </Wrapped>
    )
  }
};

const mapPersonMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPeople
  }
};
const mapPlanetMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPlanets
  }
};
const mapStarshipMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllStarships
  }
};

const renderName = ({ name }) => <span>{name}</span>;
const renderModelName = ({ model, name }) => <span>{name} ({model})</span>;

const PersonList = withSwapiService(mapPersonMethodsToProps)
  (withData(withChildFunction(renderName)(ItemList)));

const PlanetList = withSwapiService(mapPlanetMethodsToProps)
  (withData(withChildFunction(renderName)(ItemList)));

const StarshipList = withSwapiService(mapStarshipMethodsToProps)
  (withData(withChildFunction(renderModelName)(ItemList)));

export { PersonList, PlanetList, StarshipList };
