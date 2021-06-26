import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import * as thunkes from '../../redux/thunkes';
import { StateVehiclesFilterFormContext } from '../../context/state-vehicles-filter-form-context';
import SelectComponent from './FilterControl/SelectComponent';
import ColorsComponent from './FilterControl/ColorsComponent';
import RangeSliderComponent from './FilterControl/RangeSliderComponent';
import CONST from '../../utils/const';

class VehiclesFilterForm extends React.Component {
  componentDidUpdate() {
    const {
      selectedItems, prices, modelId, status, stateFilter, currentFilterfield, fetchFilterVehicles,
    } = this.props;

    if (stateFilter === CONST.filterState.filtering) {
      fetchFilterVehicles({
        selected: selectedItems,
        minPrice: prices.minPriceRange,
        maxPrice: prices.maxPriceRange,
        modelId,
        status,
        currentFilterfield,
      });
    }
  }

  render() {
    const {
      filtersList,
      addSelectItemIdToSelected,
      changeFilterState,
      addFilterPrice,
      prices: {
        minPrice, maxPrice, minPriceRange, maxPriceRange,
      },
    } = this.props;

    return (
      <StateVehiclesFilterFormContext.Provider value={{ changeFilterState }}>
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
                    elements={filtersList.modifications}
                    filterName="modifications"
                    onChange={addSelectItemIdToSelected}
                  />
                </div>

                <div className="col-24 col-xl-12 col-xxl-6 css-form-free">
                  <SelectComponent
                    id="equipmentId"
                    label="Комплектации"
                    elements={filtersList.equipments}
                    filterName="equipments"
                    onChange={addSelectItemIdToSelected}
                  />
                </div>

                <div className="col-24 col-xl-12">
                  <ColorsComponent
                    id="colorId"
                    label="Цвет"
                    elements={filtersList.colors}
                    filterName="colors"
                    onChange={addSelectItemIdToSelected}
                  />
                </div>

                <div className="col-24 col-xl-12 css-form-free">
                  <RangeSliderComponent
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    minPriceRange={minPriceRange}
                    maxPriceRange={maxPriceRange}
                    onAfterChange={addFilterPrice}
                  />
                </div>
              </div>
            </div>
          </form>
        </section>
      </StateVehiclesFilterFormContext.Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  vehicles: state.newVehiclesPage.vehicles,
  filtersList: state.filters.lists,
  selectedItems: state.filters.selected,
  prices: state.filters.prices,
  modelId: state.filters.modelId,
  status: state.filters.status,
  stateFilter: state.filters.stateFilter,
  currentFilterfield: state.filters.currentFilterfield,
});

const actionCreators = ({
  fetchFilterVehicles: thunkes.fetchFilterVehicles,
  changeFilterState: actions.changeFilterState,
  addSelectItemIdToSelected: actions.addSelectItemIdToSelected,
  addFilterPrice: actions.addFilterPrice,
  // addFilterPrice: actions.addFilterPrice,
});

const ConnectedVehiclesFilterForm = connect(mapStateToProps, actionCreators)(VehiclesFilterForm);

export default reduxForm({ form: 'VehiclesFilter' })(ConnectedVehiclesFilterForm);
