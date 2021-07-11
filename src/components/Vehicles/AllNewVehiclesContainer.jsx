import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../modules/redux/actions';
import { isEmpty } from '../../modules/utils';
import AllNewVehicles from './AllNewVehicles';

class AllNewVehiclesContainer extends React.Component {
  componentDidMount() {
    const { brands, requestAllNewVehicles } = this.props;
    requestAllNewVehicles(brands, 'fetchAllNewVehicles', 'AllNewVehiclesContainer');
  }

  render() {
    const { vehicles } = this.props;

    if (isEmpty(vehicles)) {
      return null;
    }

    console.log('ListAllNewVehiclesContainer render', this.props);

    return (
      <AllNewVehicles />
    );
  }
}

const actionCreators = {
  requestAllNewVehicles: actions.requestAllNewVehicles,
};

const mapStateToProps = (state) => ({
  brands: state.brands.brands,
  vehicles: state.allNewVehiclesPage.allNewVehicles,
});

export default connect(mapStateToProps, actionCreators)(AllNewVehiclesContainer);
