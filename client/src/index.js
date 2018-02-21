import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';
import configureStore from './store/store';
import { fetchUser } from './util/users_api_util';


document.addEventListener('DOMContentLoaded', () => {
  let store;
  // if (window.currentUser) {
  //   const preloadedState = { session: { currentUser: window.currentUser } };
  //   store = configureStore(preloadedState);
  //   delete window.currentUser;
  // } else {
    store = configureStore();
  // }
  window.store = store;
  window.fetchUser = fetchUser;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});