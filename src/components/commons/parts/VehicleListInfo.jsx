import React from 'react';

const VehicleListInfo = ({ year, mileage }) => {
  const info = `${year}, ${mileage} км`;
  return (
    <span className="vehicle-list-item--tradeininfo">
      {info}
    </span>
  );
};

export default VehicleListInfo;
