import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import * as thunkes from '../../thunkes';
import SelectComponent from './FilterControl/SelectComponent';
import ColorsComponent from './FilterControl/ColorsComponent';
import RangeSliderComponent from './FilterControl/RangeSliderComponent';

class VehiclesFilterForm extends React.Component {
  render() {
    const {
      modelId,
      filters,
      selectedItems,
      fetchFilterVehicles,
      setFilterPrice,
      fetchFilterVehiclesByPrice,
      prices: {
        minPrice, maxPrice, minPriceRange, maxPriceRange,
      },
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
                  id="modificationId"
                  label="Модификации"
                  elements={filters.modifications}
                  filterName="modifications"
                  selectedItems={selectedItems}
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
                  filter={fetchFilterVehicles}
                  modelId={modelId}
                />
              </div>

              <div className="col-24 col-xl-12 css-form-free">
                <RangeSliderComponent
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  minPriceRange={minPriceRange}
                  maxPriceRange={maxPriceRange}
                  setFilterPrice={setFilterPrice}
                  fetchFilterVehiclesByPrice={fetchFilterVehiclesByPrice}
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
  vehicles: state.newVehiclesPage.vehicles,
  prices: state.filters.prices,
});

const actionCreators = ({
  fetchFilterVehicles: thunkes.fetchFilterVehicles,
  fetchFilterVehiclesByPrice: thunkes.fetchFilterVehiclesByPrice,
  setFilterPrice: actions.setFilterPrice,
});

const ConnectedVehiclesFilterForm = connect(mapStateToProps, actionCreators)(VehiclesFilterForm);

export default reduxForm({ form: 'VehiclesFilter' })(ConnectedVehiclesFilterForm);
