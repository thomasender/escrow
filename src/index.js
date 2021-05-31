import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

ReactDOM.render(

  <Provider store={configureStore()}>
       <App />
  </Provider>,
 

  document.getElementById('root')
);
