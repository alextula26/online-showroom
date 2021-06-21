import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../actions';
import { getCurrentBrandId, isEqualBrandIds } from '../../utils';
import { getModelsContainerData } from '../../selectors';
import Models from './Models';
import Preloader from '../commons/Preloader';

const ModelsContainer = () => {
  const {
    brand,
    models,
    loading,
  } = useSelector((state) => getModelsContainerData(state));
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { brandId: brandIdParams } = params;
  const brandIdState = brand.id;
  const currentBrandId = getCurrentBrandId(brandIdParams, brandIdState);

  if (isEqualBrandIds(currentBrandId, brandIdState)) {
    history.push('/404');
  }

  useEffect(() => {
    dispatch(actions.requestModels({ brandId: currentBrandId }));
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Models models={models} brand={brand} />
  );
};

export default ModelsContainer;
