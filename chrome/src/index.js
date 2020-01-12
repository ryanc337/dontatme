import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/* global chrome */  
const getChromePromise = (key) => new Promise((resolve, reject) => {
  chrome.storage.local.get(key, (result) => {
    resolve(result[key]);
  });
});

const start = async () => {
  const persistedAddress = await getChromePromise('address');

  ReactDOM.render(<App address={persistedAddress} />, document.getElementById('root'));
}

start();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
