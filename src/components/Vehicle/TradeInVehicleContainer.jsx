import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as thunkes from '../../thunkes';
import TradeInVehicle from './TradeInVehicle';
import { isEmpty } from '../../utils';
import CONST from '../../utils/const';

class TradeInVehicleContainer extends React.Component {
  componentDidMount() {
    const { fetchVehicle } = this.props;
    const vehicleId = this.getCurrentVehicleId();
    fetchVehicle(vehicleId, CONST.vehiclesTypes.tradeInVehicles);
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
      <TradeInVehicle vehicle={vehicle} />
    );
  }
}

const mapStateToProps = (state) => ({
  vehicle: state.tradeInVehiclePage.vehicle,
});

const actionCreators = ({
  fetchVehicle: thunkes.fetchVehicle,
});

export default compose(
  connect(mapStateToProps, actionCreators),
  withRouter,
)(TradeInVehicleContainer);
