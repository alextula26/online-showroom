import React from 'react';
import { connect } from 'react-redux';
import ListNewCars from './ListNewCars';

class ListNewCarsContainer extends React.Component {
  render() {
    console.log(this.props);
    return (
      <ListNewCars listNewCars={this.props.listNewCars} />
    );
  }
}

const mapStateToProps = () => ({
  listNewCars: [{ id: 1, name: 'S90' }],
});

export default connect(mapStateToProps)(ListNewCarsContainer);
