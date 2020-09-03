import React from 'react';
import ItemList from '../item-list/item-list';
import { withData, withSwapiService, compose, withChildFunction } from '../hoc-helpers';

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

const PersonList = compose(
  withSwapiService(mapPersonMethodsToProps),
  withData,
  withChildFunction(renderName)
)(ItemList);

const PlanetList = compose(
  withSwapiService(mapPlanetMethodsToProps),
  withData,
  withChildFunction(renderName)
)(ItemList);

const StarshipList = compose(
  withSwapiService(mapStarshipMethodsToProps),
  withData,
  withChildFunction(renderModelName)
)(ItemList);

export { PersonList, PlanetList, StarshipList };
