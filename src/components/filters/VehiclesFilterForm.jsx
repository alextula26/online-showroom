import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import SelectComponent from './FilterControl/SelectComponent';

class VehiclesFilterForm extends React.Component {
  render() {
    const {
      modelId,
      modifications,
      equipments,
      selectModification,
      selectEquipment,
      fetchVehicles,
    } = this.props;

    return (
      <section className="filter">
        <form
          layout="vertical"
        >

          <div className="filter-group">
            <div className="row">
              <div className="col-24 col-xl-12 col-xxl-6 css-form-free">
                <SelectComponent
                  label="Модификации"
                  elements={modifications}
                  select={selectModification}
                  filter={fetchVehicles}
                  payload={{ currentFilter: 'modification', property: 'modificationId', modelId }}
                />
              </div>

              <div className="col-24 col-xl-12 col-xxl-6 css-form-free">
                <SelectComponent
                  label="Комплектации"
                  elements={equipments}
                  select={selectEquipment}
                  filter={fetchVehicles}
                  payload={{ currentFilter: 'equipment', property: 'equipmentId', modelId }}
                />
              </div>
            </div>
          </div>

        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  modifications: state.filters.modifications,
  equipments: state.filters.equipments,
});

const actionCreators = ({
  selectModification: actions.selectModification,
  selectEquipment: actions.selectEquipment,
  fetchVehicles: actions.fetchVehicles,
});

const ConnectedVehiclesFilterForm = connect(mapStateToProps, actionCreators)(VehiclesFilterForm);

export default reduxForm({ form: 'VehiclesFilter' })(ConnectedVehiclesFilterForm);
