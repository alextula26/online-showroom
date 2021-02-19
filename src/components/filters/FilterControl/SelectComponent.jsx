import React from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import cn from 'classnames';

class SelectComponent extends React.Component {
  handleOnSelect = (selectedItemId) => {
    const {
      filterName,
      selectedItems,
      filter,
      modelId,
    } = this.props;

    filter({
      modelId,
      filterName,
      selectedItemId: Number(selectedItemId),
      selectedItems,
      minPrice: null,
      maxPrice: null,
      status: 'all',
    });
  };

  render() {
    const {
      label,
      elements,
    } = this.props;

    return (
      <Form.Group>

        <Form.Label className="control-label">{label}</Form.Label>

        <Dropdown className="dropdown bootstrap-select form-control">

          <Dropdown.Toggle className="btn-default bs-placeholder">
            <div className="filter-option">
              <div className="filter-option-inner">
                <div className="filter-option-inner-inner">&nbsp;</div>
              </div>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <div className="inner show">
              <ul className="dropdown-menu inner">
                {elements.map(({
                  id, name, selected, disabled,
                }) => {
                  const classes = cn({
                    selected,
                    disabled,
                  });
                  return (
                    <li key={id}>
                      <Dropdown.Item
                        as="a"
                        className={classes}
                        eventKey={id}
                        onSelect={this.handleOnSelect}
                      >
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
    );
  }
}

export default SelectComponent;
