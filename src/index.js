import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/app';
import ErrorBoundary from './components/error-boundry';
import AviasalesService from './services/aviasales-service';
import { AviasalesServiceProvider } from './components/aviasales-service-context';
import store from './store';
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const aviasalesService = new AviasalesService;



root.render(
  <Provider store={store}>
    <ErrorBoundary>
      <AviasalesServiceProvider value={aviasalesService}>
        <App />
      </AviasalesServiceProvider>
    </ErrorBoundary>
  </Provider>
);
