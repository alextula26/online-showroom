import React from 'react';

class VehicleAdditionalOptions extends React.Component {
  render() {
    const { options } = this.props;
    return (
      <ul>
        {options.map(({ code, name }) => (
          <li key={code}>{name}</li>
        ))}
      </ul>
    );
  }
}

export default VehicleAdditionalOptions;
