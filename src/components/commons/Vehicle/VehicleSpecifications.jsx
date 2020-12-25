import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { isEmpty, getHtml, uniqueId } from '../../../utils';
import VehicleEquipment from './VehicleEquipment';
import VehicleAdditionalOptions from './VehicleAdditionalOptions';

class VehicleSpecifications extends React.Component {
  render() {
    const {
      specifications, options, sideOptions, additionalEquipmentDescription,
    } = this.props;

    return (
      <Tabs>
        <Tab eventKey="general_characteristic" title="Общие характеристики">
          <div className="specifications-list">
            {specifications.map(({ name, value }) => (
              <div key={uniqueId()} className="specifications-list-group">
                <div className="specifications-list-title">{name}: </div>
                <div className="specifications-list-value">{value}</div>
              </div>
            ))}
          </div>
        </Tab>

        {!isEmpty(options) && (
          <Tab eventKey="equipment" title="Комплектация">
            <VehicleEquipment options={options} />
          </Tab>
        )}

        {!isEmpty(sideOptions) && (
          <Tab eventKey="additional_options" title="Доп. опции">
            <VehicleAdditionalOptions options={sideOptions} />
          </Tab>
        )}

        {!isEmpty(additionalEquipmentDescription) && (
          <Tab eventKey="additional_equipment" title="Доп. оборудование">
            {getHtml(additionalEquipmentDescription)}
          </Tab>
        )}

      </Tabs>
    );
  }
}

export default VehicleSpecifications;
