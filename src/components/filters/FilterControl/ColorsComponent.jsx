import React from 'react';
import { Form, FormCheck } from 'react-bootstrap';
// import cn from 'classnames';

class ColorsComponent extends React.Component {
  handleOnChange = (e) => {
    const {
      filterName,
      selectedItems,
      filter,
    } = this.props;

    filter({
      modelId: selectedItems.modelId,
      filterName,
      selectedItemId: Number(e.target.value),
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
        <Form.Label
          className="control-label"
          htmlFor="vehiclecatalogsearch-colorlist"
        >
          {label}
        </Form.Label>

        <div className="colorfilter">
          {elements.map((color) => (
            <div key={color.id} className="colorfilter-item-outer">
              <FormCheck>
                <FormCheck.Input
                  type="checkbox"
                  id={`color-checkbox-${color.id}`}
                  className="colorfilter-item-checkbox"
                  value={color.id}
                  onChange={this.handleOnChange}
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

    );
  }
}

export default ColorsComponent;
