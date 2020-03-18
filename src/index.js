import React from 'react';
import ReactDOM from 'react-dom';
import { MovieProvider } from './services/context';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

import './assets/sass/styles.scss';

ReactDOM.render(
  <MovieProvider>
    <Router>
      <App />
    </Router>
  </MovieProvider>,
  document.getElementById('root')
);
