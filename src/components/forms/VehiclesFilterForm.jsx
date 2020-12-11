import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form, Dropdown } from 'react-bootstrap';

class VehiclesFilterForm extends React.Component {
  handleToggle = () => {
    console.log('index');
  };

  render() {
    const { modifications, equipments } = this.props;

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
                          {modifications.map(({ id, name }) => (
                            <li key={id}>
                              <Dropdown.Item as="a" className="selected">
                                <span className="text">{name}</span>
                              </Dropdown.Item>
                            </li>
                          ))}
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
                          {equipments.map(({ id, name }) => (
                            <li key={id}>
                              <Dropdown.Item as="a" className="selected">
                                <span className="text">{name}</span>
                              </Dropdown.Item>
                            </li>
                          ))}
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

const mapStateToProps = (state) => {
  console.log(state);
  const props = {};
  return props;
};

const ConnectedVehiclesFilterForm = connect(mapStateToProps)(VehiclesFilterForm);

export default reduxForm({ form: 'VehiclesFilter' })(ConnectedVehiclesFilterForm);
