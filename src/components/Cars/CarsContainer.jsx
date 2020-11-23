import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Cars from './Cars';
import { fetchCars } from '../../redusers/carsReducer';

class CarsContainer extends React.Component {
  componentDidMount() {
    const { modelId } = this.props.match.params;
    this.props.fetchCars(modelId);
  }

  render() {
    const { cars } = this.props;
    return (
      <Cars cars={cars} />
    );
  }
}

const mapStateToProps = (state) => ({
  cars: state.cars,
});

export default compose(
  connect(mapStateToProps, { fetchCars }),
  withRouter,
)(CarsContainer);
