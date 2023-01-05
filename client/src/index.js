import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* React.StrictMode renders the App component twice intentionally. It is an intentional feature
    of the React.StrictMode and it only happens in development mode and it helps to find accidental
    side effects in the render phase. */}
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </Provider> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
