import React from 'react';
import { connect } from 'react-redux';
import Cars from './Cars';

class CarsContainer extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Cars cars={this.props.cars} />
    );
  }
}

const mapStateToProps = () => ({
  cars: [
    { id: 1, modification_name: '1.6 T5 Drive-E MT AWD (5 мест) (150 л.с.)', vin: 'YV1LC08ACM1452344' },
    { id: 2, modification_name: '2.0 T5 Drive-E AT AWD (7 мест) (249 л.с.)', vin: 'YV1LC08ACM1642363' },
    { id: 3, modification_name: '3.2 T5 Drive-E MT AWD (5 мест) (320 л.с.)', vin: 'YV1LC08ACM1257841' },
  ],
});

export default connect(mapStateToProps)(CarsContainer);
