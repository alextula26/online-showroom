import _ from 'lodash';

export const getPriceCurrencyFormat = (price) => Math.round(price).toLocaleString('ru-RU');

export const isSpecialPrice = (price, specialPrice) => price - specialPrice !== 0;

export const isEqual = (value, other) => _.isEqual(value, other);
