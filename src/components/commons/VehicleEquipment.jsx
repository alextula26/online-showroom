import React from 'react';
import { Collapse } from 'react-bootstrap';
import cn from 'classnames';
import { uniqueId, includes, getHtml } from '../../utils';

class VehicleEquipment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      indicesCollapse: [],
    };
  }

  setIndexCollapse = (index) => {
    const { indicesCollapse } = this.state;

    if (!includes(indicesCollapse, index)) {
      this.setState({ indicesCollapse: [...indicesCollapse, index] });
    } else {
      this.setState({ indicesCollapse: indicesCollapse.filter((item) => item !== index) });
    }
  }

  render() {
    const { indicesCollapse } = this.state;
    const { options } = this.props;

    return (
      <div className="panel-group">
        {options.map((option, index) => {
          const isIncludes = includes(indicesCollapse, index);
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
                    onClick={() => this.setIndexCollapse(index)}
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
  }
}

export default VehicleEquipment;
