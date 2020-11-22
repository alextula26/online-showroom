import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ModelsContainer from './components/Models/ModelsContainer';
import ListNewCarsContainer from './components/ListNewCars/ListNewCarsContainer';

const getMainPageType = (type) => {
  const MainPageType = {
    listModelsForBrand: <ModelsContainer />,
    listNewCars: <ListNewCarsContainer />,
  };

  return MainPageType[type];
};

const App = () => {
  const type = 'listModelsForBrand';

  return (
    <div className="container">
      <Switch>
        {/* <Route exact path='/' render={() => <Redirect to={'models'} />} /> */}
        <Route exact path='/' render={() => getMainPageType(type)} />
        <Route path='/models/:modelId?' render={() => <ModelsContainer />} />
        <Route path='*' render={() => <div>404 Filenot found</div>} />
      </Switch>
    </div>
  );
};

export default App;
