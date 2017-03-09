import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import QRScanner from './QRScanner';

// Make sure you swap this out with your Firebase app's config
const config = {
  apiKey: "AIzaSyAwMhCHX0yScEXvFpSFgSDU06Rr93o_Y3k",
  authDomain: "where-are-you-a5111.firebaseapp.com",
  databaseURL: "https://where-are-you-a5111.firebaseio.com",
  storageBucket: "where-are-you-a5111.appspot.com",
  messagingSenderId: "39848861470"
};

class App extends React.Component {
  constructor() {
    super();
    this.state = { username: '' };
    const fb = firebase.initializeApp(config);
    this.db = fb.database();
  }

  add() {
    const rand = Math.random();
    this.db.ref(`users/${this.state.username}`).set({
      value: `name${rand}`,
      username: this.state.username,
    })
  }

  componentDidMount() {
    this.db.ref().on('value', snapshot => {
      const store = snapshot.val();
      this.setState({ store })
    });
  }

  render() {
    return (
      <div>
        <h1>Où es-tu ?</h1>
        <p>Bonjour {this.state.username}</p>
        <input
          type="text"
          value={this.state.username}
          onChange={e => this.setState({ username: e.target.value })}
        />
        <p>{JSON.stringify(this.state.store)}</p>
        <p onClick={() => this.add()}>Add</p>
        <QRScanner />
      </div>
    );
  }
}

export default App;
