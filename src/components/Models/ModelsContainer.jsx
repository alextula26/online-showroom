import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as thunkes from '../../thunkes';
import { isEmpty } from '../../utils';
import { getBrandsAndModels } from '../../selectors';
import Models from './Models';
import Preloader from '../commons/Preloader';

const ModelsContainer = () => {
  const { brands, models } = useSelector((state) => getBrandsAndModels(state));
  const { brandId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [brand] = brands;

  const currentBrandId = Number(brandId) || brand.id;

  if (brand.id !== currentBrandId) {
    history.push('/404');
  }

  useEffect(() => {
    dispatch(thunkes.fetchModels(currentBrandId));
  }, [dispatch]);

  if (isEmpty(models)) {
    return <Preloader />;
  }

  return (
    <Models models={models} brand={brand} />
  );
};

export default ModelsContainer;
