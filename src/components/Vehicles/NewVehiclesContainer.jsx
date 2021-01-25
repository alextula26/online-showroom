import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as thunkes from '../../thunkes';
import PageHeader from '../commons/PageHeader';
import VehiclesFilterForm from '../filters/VehiclesFilterForm';
import NewVehicles from './NewVehicles';
import { getVehicles } from '../../selectors';
import { isEmpty } from '../../utils';

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
    const { vehicles: { brand, items, model } } = this.props;

    if (isEmpty(items)) {
      return null;
    }

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
  vehicles: getVehicles(state),
});

const actionCreators = {
  fetchNewVehicles: thunkes.fetchNewVehicles,
};

export default compose(
  connect(mapStateToProps, actionCreators),
  withRouter,
)(NewVehiclesContainer);
