import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Vehicles from './Vehicles';
import { fetchVehicles, fetchCharacteristic } from '../../redusers/vehiclesReducer';
import { getUnionElements } from '../../utils';

class VehiclesContainer extends React.Component {
  componentDidMount() {
    const {
      match: { params: { modelId } },
      setVehicles,
      setCharacteristic,
    } = this.props;
    setVehicles(modelId).then((vehicles) => {
      const modifications = vehicles.map(({ modification }) => modification);
      const unionModifications = getUnionElements(modifications);
      console.log(unionModifications);
      setCharacteristic(243145);
    });
  }

  render() {
    const { vehicles, characteristics } = this.props;
    console.log(characteristics);
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
  setVehicles: fetchVehicles,
  setCharacteristic: fetchCharacteristic,
};

export default compose(
  connect(mapStateToProps, actionCreators),
  withRouter,
)(VehiclesContainer);
