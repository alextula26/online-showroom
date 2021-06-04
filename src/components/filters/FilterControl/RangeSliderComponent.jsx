/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import ReactSlider from 'react-slider';
import { StateVehiclesFilterFormContext } from '../../../context/state-vehicles-filter-form-context';
import CONST from '../../../utils/const';

class RangeSliderComponent extends React.Component {
  static contextType = StateVehiclesFilterFormContext;

  handleOnAfterChange = ([minPriceRange, maxPriceRange]) => {
    const { onAfterChange } = this.props;
    const { changeFilterState } = this.context;
    onAfterChange({ minPriceRange, maxPriceRange });
    changeFilterState({ stateFilter: CONST.filterState.filtering });
  }

  render() {
    const {
      minPrice, maxPrice, minPriceRange, maxPriceRange,
    } = this.props;

    return (
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
          renderThumb={(props, state) => (
            <div {...props}><span>{state.valueNow}</span></div>
          )}
        />
      </Form.Group>
    );
  }
}

export default RangeSliderComponent;
