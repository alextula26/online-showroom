import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Vehicles from './Vehicles';
import { fetchVehicles } from '../../redusers/vehiclesReducer';
import { isEmpty } from '../../utils';

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

    return (
      <Vehicles
        brand={brand}
        model={model}
        vehicles={items}
        characteristics={characteristics}
      />
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
