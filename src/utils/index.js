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

export const getListForFilter = (items, filterId, filterName) => {
  const data = items.map((item) => (
    {
      id: item[filterId],
      name: item[filterName],
      selected: false,
      disabled: false,
    }));
  return _.uniqWith(data, _.isEqual);
};

export const getfiltersIds = (items, filterId) => {
  const data = items.map((item) => item[filterId]);
  return _.uniqWith(data, _.isEqual);
};

export const getQueryString = (filters) => {
  const mappingOptions = {
    modifications: (item) => `modification[]=${item}`,
    equipments: (item) => `equipment[]=${item}`,
    colors: (item) => `color[]=${item}`,
  };

  const keys = Object.keys(filters);

  const query = keys
    .reduce((acc, key) => {
      if (isEmpty(filters[key])) {
        return acc;
      }

      const queryItem = filters[key]
        .map((item) => mappingOptions[key](item))
        .join('&');

      return [...acc, queryItem];
    }, []);

  return !isEmpty(query) ? `?${query.join('&')}` : '';
};
