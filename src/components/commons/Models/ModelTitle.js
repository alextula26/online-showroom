import React from 'react';
import { NavLink } from 'react-router-dom';

const ModelTitle = ({
  hasShares, hasDiscounts, url, name,
}) => (
  <div className="model-list-item--title">
    {(hasShares || hasDiscounts) && (
      <span className="model-list-item--action">Акция</span>
    )}
    <NavLink
      className="model-list-item--name"
      to={url}
    >
      {name}
    </NavLink>
  </div>
);

export default ModelTitle;
