import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import SelectComponent from './FilterControl/SelectComponent';

class VehiclesFilterForm extends React.Component {
  render() {
    const {
      filters: { modifications, equipments },
      selectModification,
      selectEquipment,
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
                  elements={modifications.items}
                  select={selectModification}
                  payload={{ currentFilter: 'modifications', property: 'modificationId' }}
                />
              </div>

              <div className="col-24 col-xl-12 col-xxl-6 css-form-free">
                <SelectComponent
                  label="Комплектации"
                  elements={equipments.items}
                  select={selectEquipment}
                  payload={{ currentFilter: 'equipments', property: 'equipmentId' }}
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
  filters: state.filters,
});

const actionCreators = ({
  selectModification: actions.selectModification,
  selectEquipment: actions.selectEquipment,
});

const ConnectedVehiclesFilterForm = connect(mapStateToProps, actionCreators)(VehiclesFilterForm);

export default reduxForm({ form: 'VehiclesFilter' })(ConnectedVehiclesFilterForm);
