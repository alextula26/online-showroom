import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as thunkes from '../../thunkes';
import PageHeader from '../commons/PageHeader';
import VehiclesFilterForm from '../filters/VehiclesFilterForm';
import Vehicles from './Vehicles';
import { getVehicles } from '../../selectors';
import { isEmpty } from '../../utils';

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
    const { vehicles: { brand, items, model } } = this.props;

    if (isEmpty(items)) {
      return null;
    }

    const header = `Автомобили ${brand.name} ${model.name} в наличии`;

    return (
      <>
        <PageHeader header={header} classes="page-title" />
        <VehiclesFilterForm modelId={model.id} />
        <Vehicles
          brand={brand}
          model={model}
          vehicles={items}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('getVehicles(state)', getVehicles(state));
  return {
    vehicles: getVehicles(state),
  };
};

const actionCreators = {
  fetchVehicles: thunkes.fetchVehicles,
};

export default compose(
  connect(mapStateToProps, actionCreators),
  withRouter,
)(VehiclesContainer);
