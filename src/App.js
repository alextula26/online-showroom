import React from 'react';
import {
  withRouter, BrowserRouter, Switch, Route,
} from 'react-router-dom';
import { compose } from 'redux';
import { Provider, connect } from 'react-redux';
import store from './redusers';
import * as thunkes from './thunkes';
import { isEmpty } from './utils';
import ModelsContainer from './components/Models/ModelsContainer';
import NewVehiclesContainer from './components/Vehicles/NewVehiclesContainer';
import TradeInVehiclesContainer from './components/Vehicles/TradeInVehiclesContainer';
import AllNewVehiclesContainer from './components/Vehicles/AllNewVehiclesContainer';
import NewVehicleContainer from './components/Vehicle/NewVehicleContainer';
import TradeInVehicleContainer from './components/Vehicle/TradeInVehicleContainer';

class App extends React.Component {
  componentDidMount() {
    const { fetchBrands } = this.props;
    fetchBrands();
  }

  getMainPageComponent = (type) => {
    const mainPageType = {
      listModelsByBrand: <ModelsContainer />,
      listAllNewVehicles: <AllNewVehiclesContainer />,
      listTradeInVehicles: <TradeInVehiclesContainer />,
    };
    return mainPageType[type];
  }

  render() {
    const { mainPageType, brands } = this.props;

    if (isEmpty(brands)) {
      return null;
    }

    return (
      <div className="crm-common-wrap" id="js-container-wrap">
        <div className="container">
          <Switch>
            {/* <Route exact path='/' render={() => <Redirect to={'models'} />} /> */}
            <Route exact path="/" render={() => this.getMainPageComponent(mainPageType)} />
            <Route exact path="/catalog/:brandId?" render={() => <ModelsContainer />} />
            <Route exact path="/catalog/:brandId/model/:modelId?" render={() => <NewVehiclesContainer />} />
            <Route exact path="/catalog/:brandId/model/:modelId/vehicle/:vehicleId?" render={() => <NewVehicleContainer />} />
            <Route exact path="/trade-in/" render={() => <TradeInVehiclesContainer />} />
            <Route exact path="/trade-in/:brandId/model/:modelId/vehicle/:vehicleId?" render={() => <TradeInVehicleContainer />} />
            <Route path="*" render={() => <div>404 Filenot found</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  brands: state.brands.brands,
});

const actionCreators = {
  fetchBrands: thunkes.fetchBrands,
};

const AppContainer = compose(connect(mapStateToProps, actionCreators), withRouter)(App);

const OnlineShowroomApp = ({ mainPageType }) => (
  <BrowserRouter>
    <Provider store={store}>
      <AppContainer key="app" mainPageType={mainPageType} />
    </Provider>
  </BrowserRouter>
);

export default OnlineShowroomApp;
