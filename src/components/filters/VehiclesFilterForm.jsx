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
      modificationsFilter,
      equipmentsFilter,
      setModification,
      removeModification,
      setEquipment,
      removeEquipment,
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
                  listContents={modifications}
                  filterElements={modificationsFilter}
                  set={setModification}
                  remove={removeModification}
                  payload="modificationId"
                />
              </div>

              <div className="col-24 col-xl-12 col-xxl-6 css-form-free">
                <SelectComponent
                  label="Комплектации"
                  listContents={equipments}
                  filterElements={equipmentsFilter}
                  set={setEquipment}
                  remove={removeEquipment}
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
  modificationsFilter: state.filters.modifications,
  equipmentsFilter: state.filters.equipments,
});

const actionCreators = ({
  setModification: actions.setModification,
  removeModification: actions.removeModification,
  setEquipment: actions.setEquipment,
  removeEquipment: actions.removeEquipment,
});

const ConnectedVehiclesFilterForm = connect(mapStateToProps, actionCreators)(VehiclesFilterForm);

export default reduxForm({ form: 'VehiclesFilter' })(ConnectedVehiclesFilterForm);
