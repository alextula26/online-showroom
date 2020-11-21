import _ from 'lodash';

export const getPrice = (price) => Math.round(price).toLocaleString('ru-RU');

export const isEqual = (value, other) => _.isEqual(value, other);
