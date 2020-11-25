import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Vehicles from './Vehicles';
import { fetchCars } from '../../redusers/vehiclesReducer';

class VehiclesContainer extends React.Component {
  componentDidMount() {
    const { modelId } = this.props.match.params;
    this.props.fetchCars(modelId);
  }

  render() {
    const { vehicles } = this.props;
    return (
      <Vehicles vehicles={vehicles} />
    );
  }
}

const mapStateToProps = (state) => ({
  vehicles: state.vehicles,
});

export default compose(
  connect(mapStateToProps, { fetchCars }),
  withRouter,
)(VehiclesContainer);
