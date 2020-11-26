import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Vehicles from './Vehicles';
import { fetchVehicles } from '../../redusers/vehiclesReducer';

class VehiclesContainer extends React.Component {
  componentDidMount() {
    const { match: { params: { modelId } }, setVehicles } = this.props;
    setVehicles(modelId);
  }

  render() {
    const { vehicles, modifications } = this.props;
    return (
      <Vehicles vehicles={vehicles} modification={modifications} />
    );
  }
}

const mapStateToProps = (state) => ({
  vehicles: state.vehiclesPage.vehicles,
  modifications: state.vehiclesPage.modifications,
});

const actionCreators = {
  setVehicles: fetchVehicles,
};

export default compose(
  connect(mapStateToProps, actionCreators),
  withRouter,
)(VehiclesContainer);
