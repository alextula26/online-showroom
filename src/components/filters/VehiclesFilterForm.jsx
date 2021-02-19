/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form, InputGroup } from 'react-bootstrap';
import ReactSlider from 'react-slider';
import * as actions from '../../actions';
import * as thunkes from '../../thunkes';
import SelectComponent from './FilterControl/SelectComponent';
import ColorsComponent from './FilterControl/ColorsComponent';

class VehiclesFilterForm extends React.Component {
  handleOnChange = ([minPriceRange, maxPriceRange]) => {
    const { setFilterPrice } = this.props;
    setFilterPrice({ minPriceRange, maxPriceRange });
  }

  handleOnAfterChange = ([minPriceRange, maxPriceRange]) => {
    const { vehicles, fetchFilterVehiclesByPrice } = this.props;
    fetchFilterVehiclesByPrice({ vehicles, minPriceRange, maxPriceRange });
  }

  render() {
    const {
      modelId,
      filters,
      selectedItems,
      fetchFilterVehicles,
      prices,
    } = this.props;

    const {
      minPrice, maxPrice, minPriceRange, maxPriceRange,
    } = prices;

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
                <Form.Group>
                  <Form.Label className="control-label active">Стоимость</Form.Label>
                  <InputGroup className="double-input price-form">
                    <Form.Control
                      type="text"
                      value={minPrice}
                      placeholder={minPrice}
                      disabled
                    />
                    <Form.Control
                      type="text"
                      value={maxPrice}
                      placeholder={maxPrice}
                      disabled
                    />
                  </InputGroup>

                  <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="thumb"
                    trackClassName="track"
                    min={minPrice}
                    max={maxPrice}
                    value={[minPriceRange, maxPriceRange]}
                    ariaLabel={['MinPrice thumb', 'MaxPrice thumb']}
                    ariaValuetext={(state) => `Price value ${state.valueNow}`}
                    pearling
                    step={1000}
                    minDistance={1000}
                    onAfterChange={this.handleOnAfterChange}
                    onChange={this.handleOnChange}
                    renderThumb={(props, state) => (
                      <div {...props}><span>{state.valueNow}</span></div>
                    )}
                  />
                </Form.Group>
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
