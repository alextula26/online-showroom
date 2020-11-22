import React from 'react';
import { connect } from 'react-redux';
import ListAllNewCars from './ListAllNewCars';

class ListAllNewCarsContainer extends React.Component {
  render() {
    console.log(this.props);
    return (
      <ListAllNewCars listAllNewCars={this.props.listAllNewCars} />
    );
  }
}

const mapStateToProps = () => ({
  listAllNewCars: [{ id: 1, name: 'S90' }],
});

export default connect(mapStateToProps)(ListAllNewCarsContainer);
