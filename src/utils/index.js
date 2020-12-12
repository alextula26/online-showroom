import _ from 'lodash';
import ReactHtmlParser from 'react-html-parser';

export const getPriceCurrencyFormat = (price) => Math.round(price).toLocaleString('ru-RU');

export const isSpecialPrice = (price, specialPrice) => price - specialPrice !== 0;

export const isEqual = (value, other) => _.isEqual(value, other);

export const getUnionElements = (array) => _.union(array);

export const isEmpty = (data) => _.isEmpty(data);

export const uniqueId = () => _.uniqueId();

export const getHtml = (str) => ReactHtmlParser(str);

export const merge = (object, other) => _.merge(object, other);

export const includes = (array, index) => _.includes(array, index);

export const getListForFilter = (items, key, value) => {
  const data = items.map((item) => (
    { id: item[key], name: item[value] }));
  return _.uniqWith(data, _.isEqual);
};