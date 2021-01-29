import React from 'react';
import { hasKey } from '../../../utils';

const OrderCall = ({ title, options }) => (
  <span
    className={hasKey(options, 'classes') && options.classes}
    style={hasKey(options, 'styles') ? options.styles : {}}
  >
    <span>{title}</span>
  </span>
);

export default OrderCall;
