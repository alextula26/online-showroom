import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchVehicle } from '../../redusers/vehicleReducer';
import { isEmpty } from '../../utils';

class NewVehicleContainer extends React.Component {
  componentDidMount() {
    const { getVehicle } = this.props;
    const vehicleId = this.getCurrentVehicleId();
    getVehicle(vehicleId);
  }

  getCurrentVehicleId() {
    const { match: { params: { vehicleId } } } = this.props;
    return vehicleId;
  }

  render() {
    const { vehicle } = this.props;

    if (isEmpty(vehicle)) {
      return null;
    }

    console.log(vehicle);

    return (<div>Vehicle</div>);
  }
}

const mapStateToProps = (state) => ({
  vehicle: state.vehiclePage.vehicle,
});

const actionCreators = ({
  getVehicle: fetchVehicle,
});

export default compose(
  connect(mapStateToProps, actionCreators),
  withRouter,
)(NewVehicleContainer);
