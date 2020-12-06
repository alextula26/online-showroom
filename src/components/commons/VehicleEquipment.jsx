import React from 'react';
import cn from 'classnames';
import { uniqueId, getHtml } from '../../utils';

class VehicleEquipment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      specificationCurrentIdx: 0,
    };
  }

  render() {
    const { specificationCurrentIdx } = this.state;
    const { options } = this.props;
    return (
      <div id="w0" className="panel-group">
        {options.map((option, index) => {
          const classesSpecificationGroup = cn({
            'collapse-toggle': true,
            collapsed: specificationCurrentIdx !== index,
          });
          const classesSpecificationList = cn({
            'panel-collapse': true,
            collapse: true,
            show: specificationCurrentIdx === index,
          });

          return (
            <div key={`group_${uniqueId()}`} className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a
                    className={classesSpecificationGroup}
                    href={`#w0-collapse${index}`}
                    data-toggle="collapse"
                    data-parent="#w0"
                    aria-expanded={specificationCurrentIdx === index}
                  >
                    {option.group}
                  </a>
                </h4>
              </div>
              <div
                id={`#w0-collapse${index}`}
                className={classesSpecificationList}
              >
                <ul className="list-group">
                  {option.options.map((item) => (
                    <li
                      key={`option_${uniqueId()}`}
                      className="list-group-item"
                    >
                      {getHtml(item)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default VehicleEquipment;
