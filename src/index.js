import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import * as firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBiPrj41cFLUmWIyY_7LSeP3rkGta6etEg",
    authDomain: "recan-43751.firebaseapp.com",
    databaseURL: "https://recan-43751.firebaseio.com",
    projectId: "recan-43751",
    storageBucket: "recan-43751.appspot.com",
    messagingSenderId: "867172891752"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
