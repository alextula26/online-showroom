import React from 'react';
import ReactDOM from 'react-dom';
import OnlineShowroomApp from './App';
import reportWebVitals from './reportWebVitals';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
