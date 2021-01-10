import React from 'react';
import { NavLink } from 'react-router-dom';
import { getPriceCurrencyFormat } from '../../../utils';

const ModelPrice = ({ url, minPrice }) => (
  minPrice !== 0
    ? (
      <>
        <div className="model-list-item--prices">
          <span className="model-list-item--price">
            {getPriceCurrencyFormat(minPrice)} руб.
          </span>
        </div>

        <div className="model-list-item--information">
          <NavLink
            className="btn btn--counter-instock"
            to={url}
          >
            Подробнее
          </NavLink>
        </div>
      </>
    ) : (
      <>
        <div className="model-list-item--prices" />
        <div className="model-list-item--information">
          <div className="btn btn--counter-empty">Уточнить наличие</div>
        </div>
      </>
    )
);

export default ModelPrice;
