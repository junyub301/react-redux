import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './componets/App';
import store from './routes/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);