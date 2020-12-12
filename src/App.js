import React from 'react';
import {
  withRouter, BrowserRouter, Switch, Route,
} from 'react-router-dom';
import { compose } from 'redux';
import { Provider, connect } from 'react-redux';
import store from './redusers';
import * as actions from './actions';
import ModelsContainer from './components/Models/ModelsContainer';
import VehiclesContainer from './components/Vehicles/VehiclesContainer';
import ListAllNewCarsContainer from './components/ListAllNewCars/ListAllNewCarsContainer';
import NewVehicleContainer from './components/Vehicle/NewVehicleContainer';

class App extends React.Component {
  componentDidMount() {
    const { fetchBrands } = this.props;
    fetchBrands();
  }

  getMainPageComponent = (type) => {
    const mainPageType = {
      listModelsByBrand: <ModelsContainer />,
      listAllNewCars: <ListAllNewCarsContainer />,
    };
    return mainPageType[type];
  }

  render() {
    const { mainPageType, brands } = this.props;

    if (brands.length === 0) {
      return null;
    }
    console.log(this.props);
    return (
      <div className="crm-common-wrap" id="js-container-wrap">
        <div className="container">
          <Switch>
            {/* <Route exact path='/' render={() => <Redirect to={'models'} />} /> */}
            <Route exact path="/" render={() => this.getMainPageComponent(mainPageType)} />
            <Route exact path="/catalog/:brandId?" render={() => <ModelsContainer />} />
            <Route exact path="/catalog/:brandId/model/:modelId?" render={() => <VehiclesContainer />} />
            <Route exact path="/catalog/:brandId/model/:modelId/vehicle/:vehicleId?" render={() => <NewVehicleContainer />} />
            <Route path="*" render={() => <div>404 Filenot found</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mainPageType: 'listModelsByBrand',
  brands: state.brands,
});

const actionCreators = {
  fetchBrands: actions.fetchBrands,
};

const AppContainer = compose(connect(mapStateToProps, actionCreators), withRouter)(App);

const OnlineShowroomApp = () => (
  <BrowserRouter>
    <Provider store={store}>
      <AppContainer key="app" />
    </Provider>
  </BrowserRouter>
);

export default OnlineShowroomApp;
