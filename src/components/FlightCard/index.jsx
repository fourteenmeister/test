import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import style from './style.scss';

function FlightCard(props) {
  const { card: { direction: { from, to }, arrival, departure, carrier } } = props;
  const departureTime = moment.utc(departure).format('HH:mm');
  const arrivalTime = moment.utc(arrival).format('HH:mm');
  const date = moment.utc(departure).locale('ru').format('D MMM');
  return (
    <div className={style.wrapper}>
      <div className={style.companyName}>{carrier}</div>
      <div className={style.descriptionWrapper}>
        <div>
          <span>{`из ${from} `}</span>
          <span>{`→ в ${to}`}</span>
        </div>
        <div>
          <span style={{ fontWeight: 'bold' }}>{`${departureTime} - ${arrivalTime} `}</span>
          <span>{`(${date})`}</span>
        </div>
      </div>
    </div>
  );
}

FlightCard.propTypes = {
  card: PropTypes.shape({
    direction: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
    }).isRequired,
    arrival: PropTypes.string,
    departure: PropTypes.string,
    carrier: PropTypes.string,
  }).isRequired,
};

export default FlightCard;
