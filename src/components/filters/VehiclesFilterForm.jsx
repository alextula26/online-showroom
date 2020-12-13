import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import SelectComponent from './FilterControl/SelectComponent';

class VehiclesFilterForm extends React.Component {
  render() {
    const {
      modifications,
      equipments,
      selectedModifications,
      selectedEquipments,
      selectModification,
      unSelectModification,
      selectEquipment,
      unSelectEquipment,
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
                  selectedElements={selectedModifications}
                  onSelect={selectModification}
                  onUnSelect={unSelectModification}
                  payload="modificationId"
                />
              </div>

              <div className="col-24 col-xl-12 col-xxl-6 css-form-free">
                <SelectComponent
                  label="Комплектации"
                  elements={equipments}
                  selectedElements={selectedEquipments}
                  onSelect={selectEquipment}
                  onUnSelect={unSelectEquipment}
                  payload="equipmentId"
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
  selectedModifications: state.filters.modifications.selected,
  selectedEquipments: state.filters.equipments.selected,
});

const actionCreators = ({
  selectModification: actions.selectModification,
  unSelectModification: actions.unSelectModification,
  selectEquipment: actions.selectEquipment,
  unSelectEquipment: actions.unSelectEquipment,
});

const ConnectedVehiclesFilterForm = connect(mapStateToProps, actionCreators)(VehiclesFilterForm);

export default reduxForm({ form: 'VehiclesFilter' })(ConnectedVehiclesFilterForm);
