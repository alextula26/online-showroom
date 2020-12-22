import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import SelectComponent from './FilterControl/SelectComponent';

class VehiclesFilterForm extends React.Component {
  render() {
    const {
      modelId,
      filters,
      selected,
      selectModification,
      selectEquipment,
      fetchVehiclesByFilter,
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
                  name="modifications"
                  id="modificationId"
                  elements={filters.modifications}
                  selected={selected}
                  select={selectModification}
                  filter={fetchVehiclesByFilter}
                  model={modelId}
                />
              </div>

              <div className="col-24 col-xl-12 col-xxl-6 css-form-free">
                <SelectComponent
                  label="Комплектации"
                  name="equipments"
                  id="equipmentId"
                  elements={filters.equipments}
                  select={selectEquipment}
                  selected={selected}
                  filter={fetchVehiclesByFilter}
                  options={modelId}
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
  filters: state.filters.lists,
  selected: state.filters.selected,
});

const actionCreators = ({
  selectModification: actions.selectModification,
  selectEquipment: actions.selectEquipment,
  fetchVehiclesByFilter: actions.fetchVehiclesByFilter,
});

const ConnectedVehiclesFilterForm = connect(mapStateToProps, actionCreators)(VehiclesFilterForm);

export default reduxForm({ form: 'VehiclesFilter' })(ConnectedVehiclesFilterForm);
