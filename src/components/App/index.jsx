import React from 'react';
import PropTypes from 'prop-types';
import SelectBox from '../SelectBox';
import FlightCard from '../FlightCard';
import Header from '../Header';
import style from './style.scss';

class App extends React.Component {
  renderFlightCards() {
    const { selectCompany } = this.props;
    const flightCards = selectCompany ? this.props.flightsByCompany[selectCompany] : this.props.flights;
    return (
      <div className={style.cardsWrapper}>
        {flightCards.map((card, index) => (
          <FlightCard key={`flight_card_${index.toString()}`} card={card} />
        ))}
      </div>
    );
  }

  render() {
    const company = Object.keys(this.props.flightsByCompany).map(name => ({
      text: name,
      value: name,
    }));
    const defaultValue = {
      text: 'Все компании',
      value: null,
    };
    return (
      <div className={style.appWrapper}>
        <Header />
        <div className={style.selectWrapper}>
          <div className={style.selectLabel}>Выберите компанию:</div>
          <SelectBox
            items={company}
            defaultValue={defaultValue}
            onSelect={this.props.actions.selectCompany}
          />
        </div>
        {this.renderFlightCards()}
      </div>
    );
  }
}

App.propTypes = {
  flights: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    direction: PropTypes.shape({
      from: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    }).isRequired,
    arrival: PropTypes.string.isRequired,
    departure: PropTypes.string.isRequired,
    carrier: PropTypes.string.isRequired,
  })).isRequired,
  flightsByCompany: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    direction: PropTypes.shape({
      from: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    }).isRequired,
    arrival: PropTypes.string.isRequired,
    departure: PropTypes.string.isRequired,
    carrier: PropTypes.string.isRequired,
  }))).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  selectCompany: PropTypes.string,
};

App.defaultProps = {
  selectCompany: null,
};

export default App;
