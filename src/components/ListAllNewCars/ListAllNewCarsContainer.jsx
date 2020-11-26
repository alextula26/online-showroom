import React from 'react';
import { connect } from 'react-redux';
import ListAllNewCars from './ListAllNewCars';

class ListAllNewCarsContainer extends React.Component {
  render() {
    const { listAllNewCars } = this.props;
    return (
      <ListAllNewCars listAllNewCars={listAllNewCars} />
    );
  }
}

const mapStateToProps = () => ({
  listAllNewCars: [{ id: 1, name: 'S90' }],
});

export default connect(mapStateToProps)(ListAllNewCarsContainer);
