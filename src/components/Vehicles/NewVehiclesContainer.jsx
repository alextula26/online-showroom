import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as thunkes from '../../thunkes';
import { isEmpty } from '../../utils';
// import { getVehicles } from '../../selectors';
import PageHeader from '../commons/PageHeader';
import VehiclesFilterForm from '../filters/VehiclesFilterForm';
import NewVehicles from './NewVehicles';

class NewVehiclesContainer extends React.Component {
  componentDidMount() {
    const { fetchNewVehicles } = this.props;
    const modelId = this.getCurrentModelId();
    fetchNewVehicles(modelId);
  }

  getCurrentModelId() {
    const { match: { params: { modelId } } } = this.props;
    return modelId;
  }

  render() {
    const { brand, model, vehicles } = this.props;

    if (isEmpty(vehicles)) {
      return null;
    }

    const header = `Автомобили ${brand.name} ${model.name} в наличии`;

    console.log('NewVehiclesContainer', this.props);

    return (
      <>
        <PageHeader header={header} classes="page-title" />
        <VehiclesFilterForm />
        <NewVehicles
          brand={brand}
          model={model}
          vehicles={vehicles}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  // vehicles: getVehicles(state),
  brand: state.newVehiclesPage.brand,
  model: state.newVehiclesPage.model,
  vehicles: state.newVehiclesPage.vehicles,
  filter: state.filters,
});

const actionCreators = {
  fetchNewVehicles: thunkes.fetchNewVehicles,
};

export default compose(
  connect(mapStateToProps, actionCreators),
  withRouter,
)(NewVehiclesContainer);
