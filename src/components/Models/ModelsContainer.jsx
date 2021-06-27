import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../modules/redux/actions';
import { getCurrentBrandId, isEqualBrandIds } from '../../modules/utils';
import { getModelsContainerData } from '../../modules/selectors';
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
