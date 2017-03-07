import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';

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
    this.state = {};
    const fb = firebase.initializeApp(config);
    this.db = fb.database();
  }

  add() {
    const rand = Math.random();
    this.db.ref('users/2').set({
      username: `name${rand}`,
      email: 'email2',
    })
  }

  componentDidMount() {
    this.db.ref('users/2').on('value', snapshot => {
      const store = snapshot.val();
      this.setState({ store })
    });
  }

  render() {
    return (
      <div>
        <h1>My Prototype</h1>
        <p>{JSON.stringify(this.state.store)}</p>
        <p onClick={() => this.add()}>Add</p>
      </div>
    );
  }
}

export default App;
