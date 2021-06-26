import React from 'react';
import { connect } from 'react-redux';
import * as thunkes from '../../redux/thunkes';
import { isEmpty } from '../../utils';
import AllNewVehicles from './AllNewVehicles';

class AllNewVehiclesContainer extends React.Component {
  componentDidMount() {
    const { brands, fetchAllNewVehicles } = this.props;
    fetchAllNewVehicles(brands);
    /* const { fetchNewVehicles } = this.props;
    const modelId = this.getCurrentModelId();
    fetchNewVehicles(modelId); */
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
  fetchAllNewVehicles: thunkes.fetchAllNewVehicles,
};

const mapStateToProps = (state) => ({
  brands: state.brands.brands,
  vehicles: state.allNewVehiclesPage.allNewVehicles,
});

export default connect(mapStateToProps, actionCreators)(AllNewVehiclesContainer);
