import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Vehicles from './Vehicles';
import { fetchVehicles } from '../../redusers/vehiclesReducer';
import { isEmpty } from '../../utils';

class VehiclesContainer extends React.Component {
  componentDidMount() {
    const { setVehiclesState } = this.props;
    const modelId = this.getCurrentModelId();
    setVehiclesState(modelId);
  }

  getCurrentModelId() {
    const { match: { params: { modelId } } } = this.props;
    return modelId;
  }

  render() {
    const { vehicles: { brand, items, model }, characteristics } = this.props;

    if (isEmpty(items) || isEmpty(characteristics)) {
      return null;
    }

    return (
      <>
        <div className="clearfix">
          <h1 className="page-title">Автомобили {brand.name} {model.name} в наличии</h1>
        </div>

        <div id="vehicle-list-by-model" className="list-view">
          <div className="model-list">
            <div className="row model-list-flex items">
              <Vehicles
                vehicles={items}
                characteristics={characteristics}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  vehicles: state.vehiclesPage.vehicles,
  characteristics: state.vehiclesPage.characteristics,
});

const actionCreators = {
  setVehiclesState: fetchVehicles,
};

export default compose(
  connect(mapStateToProps, actionCreators),
  withRouter,
)(VehiclesContainer);
