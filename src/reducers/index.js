import { combineReducers } from 'redux';
import APP_COMPANY_CHANGE from '../constants/app';

const data = require('../data.json');

const getInitialState = () => {
  const { flights } = data;
  const flightsByCompany = {};
  data.flights.forEach((flight) => {
    const { carrier } = flight;
    if (!flightsByCompany[carrier]) flightsByCompany[carrier] = [];
    flightsByCompany[carrier].push(flight);
  });
  return {
    selectCompany: null,
    flights,
    flightsByCompany,
  };
};

const app = (state = getInitialState(), action) => {
  switch (action.type) {
    case APP_COMPANY_CHANGE:
      return {
        ...state,
        selectCompany: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  app,
});
