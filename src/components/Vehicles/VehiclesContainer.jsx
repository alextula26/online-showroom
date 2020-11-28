import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Vehicles from './Vehicles';
import { fetchVehicles } from '../../redusers/vehiclesReducer';
import { isEmpty } from '../../utils';

class VehiclesContainer extends React.Component {
  componentDidMount() {
    const {
      match: { params: { modelId } },
      setVehiclesState,
    } = this.props;
    setVehiclesState(modelId);
  }

  render() {
    const { vehicles, characteristics } = this.props;

    if (isEmpty(vehicles) || isEmpty(characteristics)) {
      return null;
    }

    return (
      <Vehicles vehicles={vehicles} characteristics={characteristics} />
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
