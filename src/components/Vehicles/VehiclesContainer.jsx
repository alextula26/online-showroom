import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import PageHeader from '../commons/PageHeader';
import VehiclesFilterForm from '../filters/VehiclesFilterForm';
import Vehicles from './Vehicles';
import { isEmpty, getListForFilter } from '../../utils';

class VehiclesContainer extends React.Component {
  componentDidMount() {
    const { fetchVehicles } = this.props;
    const modelId = this.getCurrentModelId();
    fetchVehicles(modelId);
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
  fetchVehicles: actions.fetchVehicles,
};

export default compose(
  connect(mapStateToProps, actionCreators),
  withRouter,
)(VehiclesContainer);
