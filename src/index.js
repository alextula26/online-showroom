import React from 'react';
import ReactDOM from 'react-dom';
import OnlineShowroomApp from './App';
// import './scss/compiled.scss';

import './scss/compiled.scss';
import './scss/theme.scss';

// Types of main page: listModelsByBrand, listAllNewVehicles, listTradeInVehicles

ReactDOM.render(
  <OnlineShowroomApp
    mainPageType="listModelsByBrand"
    theme="autocrm10"
  />,
  document.getElementById('root'),
);
