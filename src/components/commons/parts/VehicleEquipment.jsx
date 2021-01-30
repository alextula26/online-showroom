import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import cn from 'classnames';
import { uniqueId, includes, getHtml } from '../../../utils';

const VehicleEquipment = ({ options }) => {
  const [indexes, setIndex] = useState([]);

  const handleSetIndex = (selectedIndex) => {
    if (!includes(indexes, selectedIndex)) {
      setIndex([...indexes, selectedIndex]);
    } else {
      setIndex(indexes.filter((index) => index !== selectedIndex));
    }
  };

  return (
    <div className="panel-group">
      {options.map((option, index) => {
        const isIncludes = includes(indexes, index);
        const classes = cn({
          'collapse-toggle': true,
          collapsed: !isIncludes,
        });

        return (
          <div
            key={`group_${uniqueId()}`}
            className="panel panel-default"
          >
            <div className="panel-heading">
              <h4 className="panel-title">
                <a
                  className={classes}
                  href={`#equipment-group-collapse-${index}`}
                  aria-expanded={isIncludes}
                  aria-controls={`equipment-group-${index}`}
                  onClick={() => handleSetIndex(index)}
                >
                  {option.group}
                </a>
              </h4>
            </div>

            <Collapse in={isIncludes}>
              <div id={`equipment-group-${index}`}>
                <ul className="list-group">
                  {option.options.map((html) => (
                    <li
                      key={`option_${uniqueId()}`}
                      className="list-group-item"
                    >
                      {getHtml(html)}
                    </li>
                  ))}
                </ul>
              </div>
            </Collapse>

          </div>
        );
      })}
    </div>
  );
};

export default VehicleEquipment;
