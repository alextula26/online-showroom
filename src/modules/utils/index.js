import _ from 'lodash';
import ReactHtmlParser from 'react-html-parser';

export const getPriceCurrencyFormat = (price) => Math.round(price).toLocaleString('ru-RU');

export const isSpecialPrice = (price, specialPrice) => price - specialPrice !== 0;

export const isEqual = (value, other) => _.isEqual(value, other);

export const isEmpty = (data) => _.isEmpty(data);

export const hasKey = (object, key) => _.has(object, key);

export const getUnionElements = (array) => _.union(array);

export const uniqueId = () => _.uniqueId();

export const getHtml = (str) => ReactHtmlParser(str);

export const merge = (object, other) => _.merge(object, other);

export const includes = (array, index) => _.includes(array, index);

export const getCurrentBrandId = (brandIdParams, brandIdState) => (
  Number(brandIdParams) || Number(brandIdState)
);

export const isEqualBrandIds = (currentBrandId, brandIdState) => brandIdState !== currentBrandId;

export const getQueryString = (selectedFilters) => {
  const mappingOptions = {
    modifications: (item) => `modification[]=${item}`,
    equipments: (item) => `equipment[]=${item}`,
    colors: (item) => `color[]=${item}`,
  };

  const keys = Object.keys(selectedFilters);

  const query = keys
    .reduce((acc, key) => {
      if (isEmpty(selectedFilters[key])) {
        return acc;
      }

      const queryItem = selectedFilters[key]
        .map((item) => mappingOptions[key](item))
        .join('&');

      return [...acc, queryItem];
    }, []);

  return !isEmpty(query) ? `?${query.join('&')}` : '';
};

export const getStatusId = (status) => {
  if (status === 'inStock') {
    return 1;
  }

  if (status === 'onWay') {
    return 2;
  }

  return 0;
};

export const getMinPrice = (items, prop) => (
  _.minBy(items, (vehicle) => vehicle[prop])[prop]
);

export const getMaxPrice = (items, prop) => (
  _.maxBy(items, (vehicle) => vehicle[prop])[prop]
);

// functions for filters
export const getLisFilterItems = (items, filterPropId, filterPropName) => {
  const data = items.map((item) => (
    {
      id: item[filterPropId],
      name: item[filterPropName],
      selected: false,
      disabled: false,
    }));
  return _.uniqWith(data, _.isEqual);
};

export const getColorsListFilter = (items, generalColors) => {
  const currentlListColorsByModel = items.reduce((acc, vehicle) => {
    const colors = generalColors.filter((color) => color.id === vehicle.color);
    return [...acc, ...colors];
  }, []);

  const uniqColors = _.uniqWith(currentlListColorsByModel, _.isEqual);

  return uniqColors.map((color) => (
    {
      ...color,
      selected: false,
      disabled: false,
    }
  ));
};

export const addSelectedFilterItem = (selectedItems, selectedItemId, filterName) => ({
  ...selectedItems,
  [filterName]: includes(selectedItems[filterName], selectedItemId)
    ? selectedItems[filterName].filter((item) => item !== selectedItemId)
    : [...selectedItems[filterName], selectedItemId],
});

export const getIdsFilterItems = (vehicles, filterProperty) => {
  const data = vehicles.map((vehicle) => vehicle[filterProperty]);
  return _.uniqWith(data, _.isEqual);
};
