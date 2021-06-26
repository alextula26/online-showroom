import React, { Suspense, lazy, useEffect } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './redux';
import * as actions from './actions';
import { isEmpty } from './utils';
import Preloader from './components/commons/Preloader';
import NotFound from './components/commons/NotFound';

const ModelsContainer = lazy(() => import('./components/Models/ModelsContainer'));
const NewVehiclesContainer = lazy(() => import('./components/Vehicles/NewVehiclesContainer'));
const TradeInVehiclesContainer = lazy(() => import('./components/Vehicles/TradeInVehiclesContainer'));
const AllNewVehiclesContainer = lazy(() => import('./components/Vehicles/AllNewVehiclesContainer'));
const NewVehicleContainer = lazy(() => import('./components/Vehicle/NewVehicleContainer'));
const TradeInVehicleContainer = lazy(() => import('./components/Vehicle/TradeInVehicleContainer'));

const App = ({ mainPageType }) => {
  const brands = useSelector((state) => state.brands.brands);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.requestBrands());
  }, [dispatch]);

  const getMainPageComponent = (type) => {
    const mainPageTypeMapping = {
      listModelsByBrand: <ModelsContainer />,
      listAllNewVehicles: <AllNewVehiclesContainer />,
      listTradeInVehicles: <TradeInVehiclesContainer />,
    };
    return mainPageTypeMapping[type];
  };

  if (isEmpty(brands)) {
    return null;
  }

  return (
    <div className="crm-common-wrap" id="js-container-wrap">
      <div className="container">
        <Switch>
          <Suspense fallback={<Preloader />}>
            <Route exact path="/" render={() => getMainPageComponent(mainPageType)} />
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
};

const OnlineShowroomApp = ({ mainPageType }) => {
  // import(`./scss/${theme}/theme.scss`);
  // mport('./scss/autocrm10_lexus/theme.scss');
  console.log('App');

  return (
    <BrowserRouter>
      <Provider store={store}>
        <App key="app" mainPageType={mainPageType} />
      </Provider>
    </BrowserRouter>
  );
};

export default OnlineShowroomApp;
