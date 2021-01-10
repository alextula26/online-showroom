import React from 'react';
import cn from 'classnames';
import { uniqueId, merge } from '../../../utils';

const VehicleGeneralSpecifications = ({ general, vin }) => {
  const svgIconsName = [
    { svg: 'svg--engine' },
    { svg: 'svg--transmission' },
    { svg: 'svg--color' },
    { svg: 'svg--covering' },
    { svg: 'svg--date' },
  ];

  const generalMergesvgIconsName = general.map((item, index) => merge(item, svgIconsName[index]));

  return (
    <div className="vehicle-view--info">
      {generalMergesvgIconsName.map(({ name, value, svg }) => {
        const classesSvg = cn({
          'svg--icon': true,
          [svg]: true,
        });
        return (
          <div key={uniqueId()} className="vehicle-view--info-item">
            <span className={classesSvg} data-grunticon-embed />
            <div className="vehicle-view--info-item-label">
              {name}
            </div>
            <div className="vehicle-view--info-item-value">
              {value}
            </div>
          </div>
        );
      })}
      <div className="vehicle-view--info-item">
        <span className="svg--icon svg--vin" data-grunticon-embed />
        <div className="vehicle-view--info-item-label">
          VIN
        </div>
        <div className="vehicle-view--info-item-value">
          {vin}
        </div>
      </div>
    </div>
  );
};

export default VehicleGeneralSpecifications;
