import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider,  CSSReset, extendTheme  } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Merriweather, Georgia, Baskerville, serif',
    body: 'Lato, Helvetica, Arial, sans-serif',
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <CSSReset />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
