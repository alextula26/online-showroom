import React, { Suspense, lazy } from 'react';
import {
  withRouter, BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import redusers from './redusers';
import * as thunkes from './thunkes';
import { helloSaga } from './sagas/helloSaga';
import { isEmpty } from './utils';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(redusers, applyMiddleware(thunkMiddleware, sagaMiddleware));
sagaMiddleware.run(helloSaga);

const ModelsContainer = lazy(() => import('./components/Models/ModelsContainer'));
const NewVehiclesContainer = lazy(() => import('./components/Vehicles/NewVehiclesContainer'));
const TradeInVehiclesContainer = lazy(() => import('./components/Vehicles/TradeInVehiclesContainer'));
const AllNewVehiclesContainer = lazy(() => import('./components/Vehicles/AllNewVehiclesContainer'));
const NewVehicleContainer = lazy(() => import('./components/Vehicle/NewVehicleContainer'));
const TradeInVehicleContainer = lazy(() => import('./components/Vehicle/TradeInVehicleContainer'));

const Preloader = () => (
  <div id="infscr-loading" style={{ height: '100vh', width: '100%' }}>
    <div className="preloader" />
  </div>
);

const NotFound = () => <div>404 Filenot found</div>;

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
  };

  render() {
    const { mainPageType, brands } = this.props;

    if (isEmpty(brands)) {
      return null;
    }

    return (
      <div className="crm-common-wrap" id="js-container-wrap">
        <div className="container">
          <Switch>
            <Suspense fallback={<Preloader />}>
              {/* <Route exact path='/' render={() => <Redirect to={'models'} />} /> */}
              <Route exact path="/" render={() => this.getMainPageComponent(mainPageType)} />
              <Route exact path="/catalog/:brandId" render={() => <ModelsContainer />} />
              <Route exact path="/catalog/:brandId/model/:modelId" render={() => <NewVehiclesContainer />} />
              <Route exact path="/catalog/:brandId/model/:modelId/vehicle/:vehicleId" render={() => <NewVehicleContainer />} />
              <Route exact path="/trade-in/" render={() => <TradeInVehiclesContainer />} />
              <Route exact path="/trade-in/:brandId/model/:modelId/vehicle/:vehicleId" render={() => <TradeInVehicleContainer />} />
              <Route exact path="/404" render={() => <NotFound />} />
            </Suspense>
            <Route path="*" render={() => <Redirect to="/404" />} />
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

const AppContainer = compose(
  connect(mapStateToProps, actionCreators),
  withRouter,
)(App);

const OnlineShowroomApp = ({ mainPageType }) => {
  // import(`./scss/${theme}/theme.scss`);
  // mport('./scss/autocrm10_lexus/theme.scss');
  console.log('App');
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer key="app" mainPageType={mainPageType} />
      </Provider>
    </BrowserRouter>
  );
};

export default OnlineShowroomApp;
