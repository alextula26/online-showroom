import React from 'react';

const VehicleInstock = ({ statusName }) => (
  <div className="instock-block">
    <div className="instock-block--button">
      <span className="svg--icon svg--auto" />
      <span className="instock-block--button-text">
        {statusName}
      </span>
      <span className="svg--icon svg--arrow-alt" />
    </div>
  </div>
);

export default VehicleInstock;
