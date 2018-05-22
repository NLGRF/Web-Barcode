import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import bindModel from './bindModel.js';
import * as firebase from 'firebase';



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isGoing: true,
      guests: [],
      result:'',
      barDB:"",
      status:'',
      refresh:'',
      data: {
        barCode: '',
      }
    };

    this.addGuest = this.addGuest.bind(this);
    this.summary = this.summary.bind(this);
    this.renderGuests = this.renderGuests.bind(this);
  }

  addGuest(event) {
    event.preventDefault();

    this.setState({
      guests: this.state.guests.concat({
        barCode: '',
      })
    });
  }

  summary() {
    const { isGoing, data } = this.state;
    const { barCode } = data;

    const guestData = this.state.guests.map(guest =>
        `${guest.barCode}`);

    if (guestData.length > 1) {
      const lastGuestData = guestData.length - 1;
      guestData[lastGuestData] = `and ${guestData[lastGuestData]}`;
    }

    const guestSummary = (guestData.length > 0 ? 'with ' : '') +
        (guestData.length > 2 ? guestData.join(', ') : guestData.join(' '));

    if (!isGoing) {
      return `${barCode} is not attending`;
    } else {
      return `${barCode} is attending ${guestSummary}`;
    }  

  }

  renderGuests(arrayItem) {
    const guests = [];

    for (let i = 0, iLen = this.state.guests.length; i < iLen; ++i) {
      guests.push(
          <p key={i}>
            <label>Guest {i + 1} (Full Data):&nbsp;</label>
            <input type="text" {...arrayItem('guests', i, 'barCode')}
                   readOnly={!this.state.isGoing} />
          </p>
      );
    }

    return guests;
  }

  componentDidMount() {
        
    var rootRef = firebase.database().ref().child('barcode');
   // var scanner = firebase.database().ref().child('barcode').orderByChild('key');
    rootRef.on('value', snap => {

        //    console.log(snap.val());

           this.setState ({
             barDB: snap.val().key,
            });
           // console.log(this.state.data);  
    });
    
 }

 refreshPage(){
  window.location.reload();
 }

  render() {
    const { model, arrayItem } = bindModel(this);
    console.log('Scan : ' + this.state.data.barCode);  console.log('DB : ' + this.state.barDB);  


      if((this.state.barDB == this.state.data.barCode) && (this.state.data.barCode != '')){
        this.state.status='Found in Database!'
        this.state.refresh='OK'
      }else{
        this.state.status='Not Found in Database!'
        this.state.refresh=''
      }

    return (
        <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
        </header><br/>
          <form className="App-intro">
            <label>Your full Data:&nbsp;</label>
            <input type="text" {...model('data.barCode')} 
              autoFocus="autofocus"
            />

          </form><br/>

          <label>Barcode : {this.state.data.barCode}</label><br/><br/>
          <label>{this.state.status}</label><br/><br/>
          <button onClick={this.refreshPage}>Find Again</button>
          <h1>{this.state.refresh}</h1>
        </div>
    );
  }
}

export default App;
