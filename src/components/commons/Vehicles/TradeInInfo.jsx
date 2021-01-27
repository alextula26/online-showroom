import React from 'react';

const TradeInInfo = ({ year, mileage }) => {
  const info = `${year}, ${mileage} км`;
  return (
    <span className="vehicle-list-item--tradeininfo">
      {info}
    </span>
  );
};

export default TradeInInfo;
