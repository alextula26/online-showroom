import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form, InputGroup } from 'react-bootstrap';
import * as thunkes from '../../thunkes';
import SelectComponent from './FilterControl/SelectComponent';
import ColorsComponent from './FilterControl/ColorsComponent';

class VehiclesFilterForm extends React.Component {
  handleOnBlurMinPrice = (e) => {
    const { vehicles, maxPrice, fetchFilterVehiclesByPrice } = this.props;
    fetchFilterVehiclesByPrice({ vehicles, maxPrice, minPrice: e.target.value });
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
                      defaultValue={minPrice}
                      placeholder={minPrice}
                      onBlur={this.handleOnBlurMinPrice}
                    />
                    <Form.Control
                      type="text"
                      defaultValue={maxPrice}
                      placeholder={maxPrice}
                    />
                  </InputGroup>
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
