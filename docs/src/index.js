import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

var allroutes = null;
try {
  allroutes = JSON.parse(localStorage.getItem('allroutes'));
} catch (e) {

}
if (!allroutes) {
  allroutes = {};
}

var currentroute = localStorage.getItem('currentroute');
if (!currentroute) {
  currentroute = 1;
  localStorage.setItem('currentroute', currentroute);
}
if (!allroutes['route ' + currentroute]) {
  allroutes['route ' + currentroute] = JSON.stringify({});
}

const store = configureStore(JSON.parse(allroutes['route ' + currentroute]));

let prevstate = JSON.stringify(store.getState());
store.subscribe(() => {
  let newstate = JSON.stringify(store.getState());

  if (newstate !== prevstate) {
    allroutes['route ' + currentroute] = newstate;
    localStorage.setItem('allroutes', JSON.stringify(allroutes));
  }
})

ReactDOM.render(
  <Provider store={store}>
    <App currentroute={currentroute} allroutes={allroutes} />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
