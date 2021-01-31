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

  getCurrentBrandId() {
    const { match: { params: { brandId } } } = this.props;
    return brandId;
  }

  render() {
    const { vehicles: { brand, items, model } } = this.props;

    if (isEmpty(items)) {
      return null;
    }

    console.log('NewVehiclesContainer', this.props);

    const header = `Автомобили ${brand.name} ${model.name} в наличии`;

    return (
      <>
        <PageHeader header={header} classes="page-title" />
        <VehiclesFilterForm modelId={model.id} />
        <NewVehicles
          brand={brand}
          model={model}
          vehicles={items}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  // vehicles: getVehicles(state),
  all: state,
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
