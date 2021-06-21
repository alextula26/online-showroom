import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import * as thunkes from '../../thunkes';
import * as actions from '../../actions';
// import { isEmpty } from '../../utils';
// import { getVehicles } from '../../selectors';
import PageHeader from '../commons/PageHeader';
import VehiclesFilterForm from '../filters/VehiclesFilterForm';
import NewVehicles from './NewVehicles';
import Preloader from '../commons/Preloader';

class NewVehiclesContainer extends React.Component {
  componentDidMount() {
    const { requestNewVehicles } = this.props;
    const modelId = this.getCurrentModelId();
    requestNewVehicles({ modelId });
  }

  getCurrentModelId() {
    const { match: { params: { modelId } } } = this.props;
    return modelId;
  }

  render() {
    const {
      brand,
      model,
      vehicles,
      loading,
    } = this.props;

    if (loading) {
      return <Preloader />;
    }

    const header = `Автомобили ${brand.name} ${model.name} в наличии`;

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
  loading: state.newVehiclesPage.loading,
  filter: state.filters,
});

const actionCreators = {
  requestNewVehicles: actions.requestNewVehicles,
};

export default compose(
  connect(mapStateToProps, actionCreators),
  withRouter,
)(NewVehiclesContainer);
