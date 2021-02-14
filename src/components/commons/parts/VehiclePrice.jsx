import React from 'react';
import { getPriceCurrencyFormat, isSpecialPrice } from '../../../utils';

const VehiclePrice = ({ price, specialPrice }) => (
  <div className="vehicle-view--priceblock">
    {isSpecialPrice(price, specialPrice) && (
      <div className="vehicle-view--price-badge">
        <span className="badge vehicle-view--price-badge-profit">
          <span>Выгода до </span>
          <span className="js-promo-sum">
            {getPriceCurrencyFormat(price - specialPrice)}
          </span>
          <span> ₽</span>
        </span>
      </div>
    )}

    <div className="vehicle-view--price">
      <span className="js-final-sum" data-original-price={specialPrice}>
        {isSpecialPrice(price, specialPrice)
          ? getPriceCurrencyFormat(specialPrice)
          : getPriceCurrencyFormat(price)}
      </span>
      <span> ₽</span>
    </div>

    {isSpecialPrice(price, specialPrice) && (
      <div className="vehicle-view--price-old">
        <span>Цена без скидок </span>
        {getPriceCurrencyFormat(price)}
        <span> ₽</span>
      </div>
    )}

  </div>
);

export default VehiclePrice;
