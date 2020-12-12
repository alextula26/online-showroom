import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form, Dropdown } from 'react-bootstrap';
import cn from 'classnames';
import * as actions from '../../actions';
import { includes } from '../../utils';

class VehiclesFilterForm extends React.Component {
  handleToggle = () => {
    console.log('index');
  };

  render() {
    const {
      modifications, equipments, modificationsFilter, equipmentsFilters,
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
                <Form.Group>

                  <Form.Label className="control-label">Модификации</Form.Label>

                  <Dropdown show className="dropdown bootstrap-select form-control" onToggle={this.handleToggle}>

                    <Dropdown.Toggle className="btn-default bs-placeholder">
                      <div className="filter-option">
                        <div className="filter-option-inner">
                          <div className="filter-option-inner-inner">&nbsp;</div>
                        </div>
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <div className="inner show">
                        <ul className="dropdown-menu inner show">
                          {modifications.map(({ id, name }) => {
                            const classes = cn({
                              selected: includes(modificationsFilter, id),
                            });
                            return (
                              <li key={id}>
                                <Dropdown.Item as="a" className={classes}>
                                  <span className="text">{name}</span>
                                </Dropdown.Item>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </Dropdown.Menu>

                  </Dropdown>

                </Form.Group>
              </div>

              <div className="col-24 col-xl-12 col-xxl-6 css-form-free">
                <Form.Group>

                  <Form.Label className="control-label">Комплектации</Form.Label>

                  <Dropdown show className="dropdown bootstrap-select form-control" onToggle={this.handleToggle}>

                    <Dropdown.Toggle className="btn-default bs-placeholder">
                      <div className="filter-option">
                        <div className="filter-option-inner">
                          <div className="filter-option-inner-inner">&nbsp;</div>
                        </div>
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <div className="inner show">
                        <ul className="dropdown-menu inner show">
                          {equipments.map(({ id, name }) => {
                            const classes = cn({
                              selected: includes(equipmentsFilters, id),
                            });
                            return (
                              <li key={id}>
                                <Dropdown.Item as="a" className={classes}>
                                  <span className="text">{name}</span>
                                </Dropdown.Item>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </Dropdown.Menu>

                  </Dropdown>

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
  modificationsFilter: state.filters.modifications,
  equipmentsFilters: state.filters.equipments,
});

const actionCreators = ({
  setModifications: actions.setModifications,
  setEquipments: actions.setEquipments,
});

const ConnectedVehiclesFilterForm = connect(mapStateToProps, actionCreators)(VehiclesFilterForm);

export default reduxForm({ form: 'VehiclesFilter' })(ConnectedVehiclesFilterForm);
