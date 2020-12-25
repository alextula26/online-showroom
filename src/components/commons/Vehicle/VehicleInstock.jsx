import React from 'react';

class VehicleInstock extends React.Component {
  render() {
    const { statusName } = this.props;
    return (
      <div className="instock-block">
        <div className="instock-block--button">
          <span className="svg--icon svg--auto" />
          <span className="instock-block--button-text">
            {statusName}
          </span>
          <span className="svg--icon svg--arrow-alt" />
        </div>
      </div>
    );
  }
}

export default VehicleInstock;
