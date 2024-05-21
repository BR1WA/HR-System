import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'
import "./index.css";
import { store } from './app/store'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie';

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Router>
    <CookiesProvider>
      <Provider store={store}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Provider>
    </CookiesProvider>
    </Router>
  </React.StrictMode>,
)