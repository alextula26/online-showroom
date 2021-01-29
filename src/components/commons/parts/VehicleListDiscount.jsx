import React from 'react';
import { getPriceCurrencyFormat, isSpecialPrice } from '../../../utils';

const VehicleListDiscount = ({ price, specialPrice }) => {
  const finalPrice = price - specialPrice;
  return isSpecialPrice(price, specialPrice)
    && (
      <div className="vehicle-list-item--discount">
        Цена ниже на {getPriceCurrencyFormat(finalPrice)} руб.
      </div>
    );
};

export default VehicleListDiscount;
