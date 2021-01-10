import React from 'react';

const VehicleAdditionalOptions = ({ options }) => (
  <ul>
    {options.map(({ code, name }) => (
      <li key={code}>{name}</li>
    ))}
  </ul>
);

export default VehicleAdditionalOptions;
