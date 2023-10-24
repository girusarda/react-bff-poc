import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import App from './App';
import client from './client';
import clientMock from './test/client-mock';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ApolloProvider client={clientMock}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
