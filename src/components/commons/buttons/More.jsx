import React from 'react';
import { NavLink } from 'react-router-dom';
import { hasKey } from '../../../utils';

const More = ({ url, title, options }) => (
  <NavLink
    to={url}
    className={hasKey(options, 'classes') && options.classes}
    style={hasKey(options, 'styles') ? options.styles : {}}
  >
    {title}
  </NavLink>
);

export default More;
