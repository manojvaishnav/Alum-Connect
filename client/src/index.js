import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'

import { Provider } from 'react-redux'
import Store from './redux/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>

      <ChakraProvider>
        <App />

      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
