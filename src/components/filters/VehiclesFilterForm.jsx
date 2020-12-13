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
      setCheckModification,
      removeCheckModification,
      setCheckEquipment,
      removeCheckEquipment,
    } = this.props;
    console.log(this.props);
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
                  set={setCheckModification}
                  remove={removeCheckModification}
                  payload="modificationId"
                />
              </div>

              <div className="col-24 col-xl-12 col-xxl-6 css-form-free">
                <SelectComponent
                  label="Комплектации"
                  listContents={equipments}
                  filterElements={equipmentsFilter}
                  set={setCheckEquipment}
                  remove={removeCheckEquipment}
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
  modificationsFilter: state.filters.modifications.checks,
  equipmentsFilter: state.filters.equipments.checks,
});

const actionCreators = ({
  setCheckModification: actions.setCheckModification,
  removeCheckModification: actions.removeCheckModification,
  setCheckEquipment: actions.setCheckEquipment,
  removeCheckEquipment: actions.removeCheckEquipment,
});

const ConnectedVehiclesFilterForm = connect(mapStateToProps, actionCreators)(VehiclesFilterForm);

export default reduxForm({ form: 'VehiclesFilter' })(ConnectedVehiclesFilterForm);
