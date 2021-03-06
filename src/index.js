import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from "react-router-dom";
// Importing toastify module
import { toast } from 'react-toastify';

// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';

import { StoreProvider } from './store'

// toast-configuration method,
// it is compulsory method.
toast.configure()

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
