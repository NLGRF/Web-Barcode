import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import bindModel from './bindModel.js';
import * as firebase from 'firebase';

import Tabs from './Tabs'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value:'',
      bottle:0,
      Lbottle:0,
      can:0,
      d_bottle:0,
      d_Lbottle:0,
      d_can:0,
      Abottle:0,
      ALbottle:0,
      Acan:0,
      Ad_bottle:0,
      Ad_Lbottle:0,
      Ad_can:0,
      point:0,
      // Apoint:0,
      status:false,

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

    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);

    this.handleCanChange = this.handleCanChange.bind(this);
    this.handleBottleChange = this.handleBottleChange.bind(this);
    this.handleLBottleChange = this.handleLBottleChange.bind(this);
    
    this.handleD_CanChange = this.handleD_CanChange.bind(this);
    this.handleD_BottleChange = this.handleD_BottleChange.bind(this);
    this.handleD_LBottleChange = this.handleD_LBottleChange.bind(this);

    this.addGuest = this.addGuest.bind(this);
    this.summary = this.summary.bind(this);
    this.renderGuests = this.renderGuests.bind(this);

    this.submitFirebase = this.submitFirebase.bind(this);
    this.postData = this.postData.bind(this);
  }

   handleChange(e) {
      this.setState({ value: e.target.value });
   }

   keyPress(e){
      if(e.keyCode == 13){
         console.log('value', e.target.value);
         //alert('Find Enter');
      }
   }

   handleCanChange(e) {
    this.setState({can: e.target.value});
  }

  handleBottleChange(e) {
    this.setState({bottle: e.target.value});
  }

  handleLBottleChange(e) {
    this.setState({Lbottle: e.target.value});
  }

  handleD_CanChange(e) {
    this.setState({d_can: e.target.value});
  }

  handleD_BottleChange(e) {
    this.setState({d_bottle: e.target.value});
  }

  handleD_LBottleChange(e) {
    this.setState({d_Lbottle: e.target.value});
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
/*
  componentDidMount() {
        
    var rootRef = firebase.database().ref().child('users/' + this.state.value);
   // var scanner = firebase.database().ref().child('barcode').orderByChild('key');
    rootRef.on('value', snap => {

           // console.log(snap.val());
           console.log(snap.val().point);
           this.setState ({
            point: snap.val().point,
            });
           // console.log(this.state.data);  
    });
    
 }

 refreshPage(){
  window.location.reload();
 }
*/
 submitFirebase(e){
  e.preventDefault();
  var uRef = firebase.database().ref().child('users/' + this.state.value);
  //var obj = {point: this.state.point};
  uRef.on('value', snap => {

    // console.log(snap.val());
    console.log(snap.val().point);
    this.setState ({
     point: snap.val().point + (this.state.bottle * 1) + (this.state.Lbottle * 1.5) + (this.state.can * 2) + 
            (this.state.d_bottle * 2) + (this.state.d_Lbottle * 2.5) + (this.state.d_can * 3),
     });
    //var obj = {point: this.state.point};
    // console.log(this.state.data);  
    //uRef.update(obj);
});

var aRef = firebase.database().ref().child('Admin');
//var obj = {point: this.state.point};
aRef.on('value', snap => {

  // console.log(snap.val());
  console.log(snap.val());
  this.setState ({
   Abottle: (snap.val().Abottle * 1),
   ALbottle: (snap.val().ALbottle * 1),
   Acan: (snap.val().Acan * 1),
   Ad_bottle: (snap.val().Ad_bottle * 1),
   Ad_Lbottle: (snap.val().Ad_Lbottle * 1),
   Ad_can: (snap.val().Ad_can * 1),
  // Apoint: (this.state.Apoint * 1)
   });
  //var obj = {point: this.state.point};
  // console.log(this.state.data);  
  //uRef.update(obj);
});
   /* var obj = {point: this.state.point}; */
   // uRef.update(obj);
   if (this.state.value === '') {
    // The write failed...
    // window.location.reload(); 
    alert('Error');
    window.location.reload(); 
  } else {
    // Data saved successfully!
    alert('OK');
  } 
//  alert('OK');
 }

 postData(e){
  e.preventDefault();
  var uRef = firebase.database().ref().child('users/' + this.state.value);

  var obj = {point: this.state.point};
  uRef.update(obj);

  var aRef = firebase.database().ref().child('Admin');

  var obja = {Abottle: Number((this.state.Abottle)) + Number((this.state.bottle)),
              ALbottle: Number((this.state.ALbottle)) + Number((this.state.Lbottle)),
              Acan: Number((this.state.Acan)) + Number((this.state.can)),
              Ad_bottle: Number((this.state.Ad_bottle)) + Number((this.state.d_bottle)),
              Ad_Lbottle: Number((this.state.Ad_Lbottle)) + Number((this.state.d_Lbottle)),
              Ad_can: Number((this.state.Ad_can)) + Number((this.state.d_can)),
             // Apoint: Number((this.state.Apoint)) + Number(this.state.point)
             };
  aRef.update(obja);
  alert('OK');
  window.location.reload(); 
 }

  render() {
    const { model, arrayItem } = bindModel(this);
   // console.log('Scan : ' + this.state.data.barCode);  console.log('DB : ' + this.state.barDB);  
  // console.log('Point : ' + this.state.point);

      if((this.state.barDB == this.state.data.barCode) && (this.state.data.barCode != '')){
        this.state.status='Found in Database!'
        this.state.refresh='OK'
        alert('OK');
      }else{
        this.state.status='Not Found in Database!'
        this.state.refresh=''
      }

    return (
        <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Admin Recan !!!</h1>
        </header><br/>
        <label>Barcode : </label>
        <input value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange} fullWidth={true} autoFocus="autofocus"/>
        <br/><br/><hr/>
        <label>Bottle : </label>
        <input value={this.state.bottle} onChange={this.handleBottleChange} type="number" min="0" max="50"/>
        <br/><br/>
        <label>Big Bottle : </label>
        <input value={this.state.Lbottle} onChange={this.handleLBottleChange} type="number" min="0" max="50"/>
        <br/><br/>
        <label>Can : </label>
        <input value={this.state.can} onChange={this.handleCanChange} type="number" min="0" max="50"/>
        <br/><br/><hr/>
        <label>Divice Bottle : </label>
        <input value={this.state.d_bottle} onChange={this.handleD_BottleChange} type="number" min="0" max="50"/>
        <br/><br/>
        <label>Divice Big Bottle : </label>
        <input value={this.state.d_Lbottle} onChange={this.handleD_LBottleChange} type="number" min="0" max="50"/>
        <br/><br/>
        <label>Divice Can : </label>
        <input value={this.state.d_can} onChange={this.handleD_CanChange} type="number" min="0" max="50"/>
        <br/><br/>
        <button value={this.state.status} onClick={this.submitFirebase} disabled={this.state.point}>Confirm</button>
        <br/><br/><hr/>
        <h1 value={this.state.point}>Point : {(this.state.bottle * 1) + (this.state.Lbottle * 1.5) + (this.state.can * 2) + 
                                              (this.state.d_bottle * 2) + (this.state.d_Lbottle * 2.5) + (this.state.d_can * 3)}</h1>
        <br/><hr/>
        <button onClick={this.postData} disabled={!this.state.point}>Submit</button>
        </div>
    );
  }
}

export default App;
