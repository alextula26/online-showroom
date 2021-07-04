import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../modules/redux/actions';
import { isEmpty } from '../../modules/utils';
import PageHeader from '../commons/PageHeader';
import TradeInVehicles from './TradeInVehicles';

class TradeInVehiclesContainer extends React.Component {
  componentDidMount() {
    const { requestTradeInVehicles } = this.props;
    requestTradeInVehicles();
  }

  render() {
    const { vehicles: { items, filter } } = this.props;

    if (isEmpty(items)) {
      return null;
    }

    return (
      <>
        <PageHeader header="Автомобили с пробегом" classes="page-title" />
        <TradeInVehicles
          brands={filter.brands}
          models={filter.models}
          vehicles={items}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  vehicles: state.tradeInVehiclesPage.tradeInVehicles,
});

const actionCreators = {
  requestTradeInVehicles: actions.requestTradeInVehicles,
};

export default connect(mapStateToProps, actionCreators)(TradeInVehiclesContainer);
