import React from 'react';
import {
  withRouter, BrowserRouter, Switch, Route,
} from 'react-router-dom';
import { compose } from 'redux';
import { Provider, connect } from 'react-redux';
import store from './redusers';
import { fetchBrands } from './redusers/brandsReduser';
import ModelsContainer from './components/Models/ModelsContainer';
import CarsContainer from './components/Cars/CarsContainer';
import ListAllNewCarsContainer from './components/ListAllNewCars/ListAllNewCarsContainer';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchBrands();
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

    return (
      <div className="container">
        <Switch>
          {/* <Route exact path='/' render={() => <Redirect to={'models'} />} /> */}
          <Route exact path="/" render={() => this.getMainPageComponent(mainPageType)} />
          <Route exact path="/catalog/:brandId?" render={() => <ModelsContainer />} />
          <Route exact path="/catalog/:brandId/model/:modelId?" render={() => <CarsContainer />} />
          <Route path="*" render={() => <div>404 Filenot found</div>} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mainPageType: 'listModelsByBrand',
  brands: state.brands,
});

const AppContainer = compose(connect(mapStateToProps, { fetchBrands }), withRouter)(App);

const OnlineShowroomApp = () => (
  <BrowserRouter>
    <Provider store={store}>
      <AppContainer key="app" />
    </Provider>
  </BrowserRouter>
);

export default OnlineShowroomApp;
