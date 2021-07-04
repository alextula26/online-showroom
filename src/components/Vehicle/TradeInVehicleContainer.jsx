import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../modules/redux/actions';
import TradeInVehicle from './TradeInVehicle';
import { isEmpty } from '../../modules/utils';
import CONST from '../../modules/utils/const';

class TradeInVehicleContainer extends React.Component {
  componentDidMount() {
    const { requestTradeInVehicle } = this.props;
    const vehicleId = this.getCurrentVehicleId();
    requestTradeInVehicle({ vehicleId, typeVehicles: CONST.vehiclesTypes.tradeInVehicles });
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
  requestTradeInVehicle: actions.requestTradeInVehicle,
});

export default compose(
  connect(mapStateToProps, actionCreators),
  withRouter,
)(TradeInVehicleContainer);
