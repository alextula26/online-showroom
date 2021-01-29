import React from 'react';
import { getPriceCurrencyFormat, isSpecialPrice } from '../../../utils';

const VehicleListPrice = ({ price, specialPrice }) => (
  isSpecialPrice(price, specialPrice)
    ? (
      <>
        <span className="vehicle-list-item--price vehicle-list-item--price--action">
          {getPriceCurrencyFormat(specialPrice)} &#8381;
        </span>
        <span className="vehicle-list-item--oldprice">
          {getPriceCurrencyFormat(price)} &#8381;
        </span>
      </>
    ) : (
      <span className="vehicle-list-item--price">
        {getPriceCurrencyFormat(price)} &#8381;
      </span>
    )
);

export default VehicleListPrice;
