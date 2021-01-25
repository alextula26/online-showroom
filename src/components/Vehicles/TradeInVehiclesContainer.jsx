import React from 'react';
import { connect } from 'react-redux';
import * as thunkes from '../../thunkes';
import TradeInVehicles from './TradeInVehicles';
import { isEmpty } from '../../utils';

class TradeInVehiclesContainer extends React.Component {
  componentDidMount() {
    const { fetchTradeInVehicles } = this.props;
    fetchTradeInVehicles();
  }

  render() {
    const { tradeInVehicles: { items, filter } } = this.props;

    if (isEmpty(items)) {
      return null;
    }

    return (
      <TradeInVehicles
        brands={filter.brands}
        models={filter.models}
        tradeInVehicles={items}
      />
    );
  }
}

const actionCreators = {
  fetchTradeInVehicles: thunkes.fetchTradeInVehicles,
};

const mapStateToProps = (state) => ({
  tradeInVehicles: state.tradeInVehiclesPage.tradeInVehicles,
});

export default connect(mapStateToProps, actionCreators)(TradeInVehiclesContainer);
