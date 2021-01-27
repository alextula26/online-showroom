import React from 'react';
import { NavLink } from 'react-router-dom';

const Title = ({ title, url }) => (
  <div className="vehicle-list-item--title">
    <NavLink
      className="vehicle-list-item--title--link"
      to={url}
      data-original-title={title}
    >
      {title}
    </NavLink>
  </div>
);

export default Title;
