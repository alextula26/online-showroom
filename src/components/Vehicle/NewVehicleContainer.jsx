import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as thunkes from '../../thunkes';
import NewVehicle from './NewVehicle';
import { isEmpty } from '../../utils';

class NewVehicleContainer extends React.Component {
  componentDidMount() {
    const { fetchVehicle } = this.props;
    const vehicleId = this.getCurrentVehicleId();
    fetchVehicle(vehicleId);
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

    return (
      <NewVehicle vehicle={vehicle} />
    );
  }
}

const mapStateToProps = (state) => ({
  vehicle: state.vehiclePage.vehicle,
});

const actionCreators = ({
  fetchVehicle: thunkes.fetchVehicle,
});

export default compose(
  connect(mapStateToProps, actionCreators),
  withRouter,
)(NewVehicleContainer);
