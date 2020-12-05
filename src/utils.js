import _ from 'lodash';

export const getPriceCurrencyFormat = (price) => Math.round(price).toLocaleString('ru-RU');

export const isSpecialPrice = (price, specialPrice) => price - specialPrice !== 0;

export const isEqual = (value, other) => _.isEqual(value, other);

export const getUnionElements = (array) => _.union(array);

export const isEmpty = (data) => _.isEmpty(data);

export const uniqueId = () => _.uniqueId();
