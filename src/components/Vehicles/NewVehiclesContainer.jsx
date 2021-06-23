import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../actions';
import { getVehiclesContainerData } from '../../selectors';
import PageHeader from '../commons/PageHeader';
import VehiclesFilterForm from '../filters/VehiclesFilterForm';
import NewVehicles from './NewVehicles';
import Preloader from '../commons/Preloader';

const NewVehiclesContainer = () => {
  const {
    brand,
    model,
    vehicles,
    loading,
  } = useSelector((state) => getVehiclesContainerData(state));
  const params = useParams();
  const dispatch = useDispatch();

  const { modelId } = params;

  useEffect(() => {
    dispatch(actions.requestNewVehicles({ modelId }));
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  const header = `Автомобили ${brand.name} ${model.name} в наличии`;

  return (
    <>
      <PageHeader header={header} classes="page-title" />
      <VehiclesFilterForm />
      <NewVehicles
        brand={brand}
        model={model}
        vehicles={vehicles}
      />
    </>
  );
};

export default NewVehiclesContainer;
