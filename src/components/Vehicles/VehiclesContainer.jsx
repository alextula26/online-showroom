import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchVehicles } from '../../redusers/vehiclesReducer';
import VehiclesFilterForm from '../forms/VehiclesFilterForm';
import Vehicles from './Vehicles';
import { isEmpty, getListForFilter } from '../../utils';
import PageHeader from '../commons/PageHeader';

class VehiclesContainer extends React.Component {
  componentDidMount() {
    const { setVehiclesState } = this.props;
    const modelId = this.getCurrentModelId();
    setVehiclesState(modelId);
  }

  getCurrentModelId() {
    const { match: { params: { modelId } } } = this.props;
    return modelId;
  }

  render() {
    const { vehicles: { brand, items, model }, characteristics } = this.props;

    if (isEmpty(items) || isEmpty(characteristics)) {
      return null;
    }

    const header = `Автомобили ${brand.name} ${model.name} в наличии`;

    console.log(items);

    const modifications = getListForFilter(items, 'modification', 'modification_name');
    const equipments = getListForFilter(items, 'equipment', 'equipment_name');

    return (
      <>
        <PageHeader header={header} classes="page-title" />
        <VehiclesFilterForm modifications={modifications} equipments={equipments} />
        <Vehicles
          brand={brand}
          model={model}
          vehicles={items}
          characteristics={characteristics}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  vehicles: state.vehiclesPage.vehicles,
  characteristics: state.vehiclesPage.characteristics,
});

const actionCreators = {
  setVehiclesState: fetchVehicles,
};

export default compose(
  connect(mapStateToProps, actionCreators),
  withRouter,
)(VehiclesContainer);
