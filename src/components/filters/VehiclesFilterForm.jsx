import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import * as thunkes from '../../thunkes';
import SelectComponent from './FilterControl/SelectComponent';
import ColorsComponent from './FilterControl/ColorsComponent';

class VehiclesFilterForm extends React.Component {
  render() {
    const {
      modelId,
      filters,
      selectedItems,
      selectModificationsFilterItem,
      selectEquipmentsFilterItem,
      selectColorsFilterItem,
      fetchFilterVehicles,
    } = this.props;
    console.log('filters', filters);
    console.log('selectedItems', selectedItems);
    return (
      <section className="filter">
        <form
          layout="vertical"
        >

          <div className="filter-group">
            <div className="row">
              <div className="col-24 col-xl-12 col-xxl-6 css-form-free">
                <SelectComponent
                  id="modificationId"
                  label="Модификации"
                  elements={filters.modifications}
                  filterName="modifications"
                  selectedItems={selectedItems}
                  selectItem={selectModificationsFilterItem}
                  filter={fetchFilterVehicles}
                  modelId={modelId}
                />
              </div>

              <div className="col-24 col-xl-12 col-xxl-6 css-form-free">
                <SelectComponent
                  id="equipmentId"
                  label="Комплектации"
                  elements={filters.equipments}
                  filterName="equipments"
                  selectedItems={selectedItems}
                  selectItem={selectEquipmentsFilterItem}
                  filter={fetchFilterVehicles}
                  modelId={modelId}
                />
              </div>

              <div className="col-24 col-xl-12">
                <ColorsComponent
                  id="colorId"
                  label="Цвет"
                  elements={filters.colors}
                  filterName="colors"
                  selectedItems={selectedItems}
                  selectItem={selectColorsFilterItem}
                  filter={fetchFilterVehicles}
                  modelId={modelId}
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
  selectedItems: state.filters.selected,
});

const actionCreators = ({
  selectModificationsFilterItem: actions.selectModificationsFilterItem,
  selectEquipmentsFilterItem: actions.selectEquipmentsFilterItem,
  selectColorsFilterItem: actions.selectColorsFilterItem,
  fetchFilterVehicles: thunkes.fetchFilterVehicles,
});

const ConnectedVehiclesFilterForm = connect(mapStateToProps, actionCreators)(VehiclesFilterForm);

export default reduxForm({ form: 'VehiclesFilter' })(ConnectedVehiclesFilterForm);
