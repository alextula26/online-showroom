/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form, InputGroup } from 'react-bootstrap';
import ReactSlider from 'react-slider';
import * as thunkes from '../../thunkes';
import SelectComponent from './FilterControl/SelectComponent';
import ColorsComponent from './FilterControl/ColorsComponent';

class VehiclesFilterForm extends React.Component {
  constructor(props) {
    super(props);

    const { minPrice, maxPrice } = props;

    this.state = {
      minPriceRange: minPrice,
      maxPriceRange: maxPrice,
    };
  }

  handleOnChange = ([minPriceRange, maxPriceRange]) => {
    this.setState({ minPriceRange, maxPriceRange });
  }

  handleOnAfterChange = ([minPrice, maxPrice]) => {
    const { vehicles, fetchFilterVehiclesByPrice } = this.props;
    fetchFilterVehiclesByPrice({ vehicles, minPrice, maxPrice });
  }

  render() {
    const {
      modelId,
      filters,
      selectedItems,
      fetchFilterVehicles,
      minPrice,
      maxPrice,
    } = this.props;

    const { minPriceRange, maxPriceRange } = this.state;

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
                      value={minPriceRange}
                      placeholder={minPrice}
                      disabled
                    />
                    <Form.Control
                      type="text"
                      value={maxPriceRange}
                      placeholder={maxPrice}
                      disabled
                    />
                  </InputGroup>

                  <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    min={minPrice}
                    max={maxPrice}
                    defaultValue={[minPriceRange, maxPriceRange]}
                    ariaLabel={['Lower thumb', 'Upper thumb']}
                    ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                    pearling
                    step={1000}
                    minDistance={1000}
                    onAfterChange={this.handleOnAfterChange}
                    onChange={this.handleOnChange}
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
  minPrice: state.filters.minPrice,
  maxPrice: state.filters.maxPrice,
});

const actionCreators = ({
  fetchFilterVehicles: thunkes.fetchFilterVehicles,
  fetchFilterVehiclesByPrice: thunkes.fetchFilterVehiclesByPrice,
});

const ConnectedVehiclesFilterForm = connect(mapStateToProps, actionCreators)(VehiclesFilterForm);

export default reduxForm({ form: 'VehiclesFilter' })(ConnectedVehiclesFilterForm);
