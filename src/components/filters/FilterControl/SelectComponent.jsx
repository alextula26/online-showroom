import React from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import cn from 'classnames';
import { includes } from '../../../utils';

class SelectComponent extends React.Component {
  handleOnSelect = (selectId) => {
    const {
      onSelect, onUnSelect, selectedElements, payload,
    } = this.props;
    if (!includes(selectedElements, Number(selectId))) {
      onSelect({ [payload]: selectId });
    } else {
      onUnSelect({ [payload]: selectId });
    }
  };

  render() {
    const { label, elements, selectedElements } = this.props;

    return (
      <Form.Group>

        <Form.Label className="control-label">{label}</Form.Label>

        <Dropdown show className="dropdown bootstrap-select form-control">

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
                {elements.map(({ id, name }) => {
                  const classes = cn({
                    selected: includes(selectedElements, id),
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
