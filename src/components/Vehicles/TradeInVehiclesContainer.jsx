import React from 'react';
import { connect } from 'react-redux';
import * as thunkes from '../../thunkes';
import { isEmpty } from '../../utils';
import PageHeader from '../commons/PageHeader';
import TradeInVehicles from './TradeInVehicles';

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
      <>
        <PageHeader header="Автомобили с пробегом" classes="page-title" />
        <TradeInVehicles
          brands={filter.brands}
          models={filter.models}
          tradeInVehicles={items}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  tradeInVehicles: state.tradeInVehiclesPage.tradeInVehicles,
});

const actionCreators = {
  fetchTradeInVehicles: thunkes.fetchTradeInVehicles,
};

export default connect(mapStateToProps, actionCreators)(TradeInVehiclesContainer);
