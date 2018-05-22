import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import * as firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAtO_i5GDw2ETwRwBPSBejTgDzjsijOXVw",
    authDomain: "test-740aa.firebaseapp.com",
    databaseURL: "https://test-740aa.firebaseio.com",
    projectId: "test-740aa",
    storageBucket: "test-740aa.appspot.com",
    messagingSenderId: "508675246930"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
