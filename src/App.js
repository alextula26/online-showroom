import React from 'react';
import {
  withRouter, BrowserRouter, Switch, Route,
} from 'react-router-dom';
import { compose } from 'redux';
import { Provider, connect } from 'react-redux';
import store from './redusers';
import ModelsContainer from './components/Models/ModelsContainer';
import { fetchBrands } from './redusers/brandsReduser';
import ListNewCarsContainer from './components/ListNewCars/ListNewCarsContainer';

class App extends React.Component {
  getMainPageComponent = (type) => {
    const MainPageType = {
      listModelsForBrand: <ModelsContainer />,
      listNewCars: <ListNewCarsContainer />,
    };

    return MainPageType[type];
  }

  componentDidMount() {
    this.props.fetchBrands();
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
          <Route exact path='/' render={() => this.getMainPageComponent(mainPageType)} />
          <Route path='/models/:brandId?' render={() => <ModelsContainer />} />
          <Route path='*' render={() => <div>404 Filenot found</div>} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mainPageType: 'listModelsForBrand',
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
