import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import * as thunkes from '../../thunkes';
import * as actions from '../../actions';
import NewVehicle from './NewVehicle';
import { isEmpty } from '../../utils';
import CONST from '../../utils/const';

class NewVehicleContainer extends React.Component {
  componentDidMount() {
    const { requestNewVehicle } = this.props;
    const vehicleId = this.getCurrentVehicleId();
    requestNewVehicle({ vehicleId, typeVehicles: CONST.vehiclesTypes.newVehicles });
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
  vehicle: state.newVehiclePage.vehicle,
});

const actionCreators = ({
  // fetchVehicle: thunkes.fetchVehicle,
  requestNewVehicle: actions.requestNewVehicle,
});

export default compose(
  connect(mapStateToProps, actionCreators),
  withRouter,
)(NewVehicleContainer);
