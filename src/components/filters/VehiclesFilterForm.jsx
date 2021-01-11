import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form, FormCheck } from 'react-bootstrap';
import * as actions from '../../actions';
import * as thunkes from '../../thunkes';
import SelectComponent from './FilterControl/SelectComponent';

class VehiclesFilterForm extends React.Component {
  render() {
    const {
      modelId,
      filters,
      selectedItems,
      selectModificationsFilterItem,
      selectEquipmentsFilterItem,
      fetchFilterVehicles,
    } = this.props;
    console.log(filters);
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
                <Form.Group>
                  <Form.Label className="control-label" htmlFor="vehiclecatalogsearch-colorlist">
                    Цвет
                  </Form.Label>
                  <div className="colorfilter">
                    {filters.colors.map((color) => (
                      <div key={color.id} className="colorfilter-item-outer">
                        <FormCheck>
                          <FormCheck.Input
                            type="checkbox"
                            id={`color-checkbox-${color.id}`}
                            className="colorfilter-item-checkbox js-color"
                            value={color.id}
                          />
                          <FormCheck.Label
                            className="colorfilter-item-label"
                            data-placement="bottom"
                            data-toggle="tooltip"
                            data-title={color.name}
                            style={{ backgroundColor: color.rgb }}
                            htmlFor={`color-checkbox-${color.id}`}
                          />
                        </FormCheck>
                      </div>
                    ))}

                  </div>
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
});

const actionCreators = ({
  selectModificationsFilterItem: actions.selectModificationsFilterItem,
  selectEquipmentsFilterItem: actions.selectEquipmentsFilterItem,
  fetchFilterVehicles: thunkes.fetchFilterVehicles,
});

const ConnectedVehiclesFilterForm = connect(mapStateToProps, actionCreators)(VehiclesFilterForm);

export default reduxForm({ form: 'VehiclesFilter' })(ConnectedVehiclesFilterForm);
