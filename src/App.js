import React from 'react';
import * as firebase from 'firebase';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import QRScanner from './QRScanner';

// Make sure you swap this out with your Firebase app's config
const config = {
  apiKey: 'AIzaSyAwMhCHX0yScEXvFpSFgSDU06Rr93o_Y3k',
  authDomain: 'where-are-you-a5111.firebaseapp.com',
  databaseURL: 'https://where-are-you-a5111.firebaseio.com',
  storageBucket: 'where-are-you-a5111.appspot.com',
  messagingSenderId: '39848861470',
};

const style = {
  margin: 12,
};

class App extends React.Component {
  constructor() {
    super();
    this.state = { username: '' };

    const fb = firebase.initializeApp(config);
    this.db = fb.database();

    this.openCheckInModal = this.openCheckInModal.bind(this);
    this.closeCheckInModal = this.closeCheckInModal.bind(this);
    this.checkIn = this.checkIn.bind(this);
  }

  componentDidMount() {
    this.db.ref().on('value', (snapshot) => {
      const store = snapshot.val();
      this.setState({ store });
    });
  }

  add() {
    const rand = Math.random();
    this.db.ref(`users/${this.state.username}`).set({
      value: `name${rand}`,
      username: this.state.username,
    });
  }

  openCheckInModal() {
    this.setState({ openCheckInModal: true });
  }

  closeCheckInModal() {
    this.setState({ openCheckInModal: false, mode: undefined });
  }

  checkIn(room) {
    this.db.ref(`users/${this.state.username}`).set({
      room,
      username: this.state.username,
      date: (new Date()).toString(),
    });
    this.closeCheckInModal();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.closeCheckInModal}
      />,
    ];
    return (
      <div>
        <AppBar title="The OZ - Where R U ?" />

        <p>Bonjour {this.state.username}</p>
        <TextField
          value={this.state.username}
          onChange={e => this.setState({ username: e.target.value })}
          floatingLabelText="Quel est ton petit nom ?"
          floatingLabelFixed
        />
        <div>
          <RaisedButton label="Indiquer où je suis" primary style={style} onClick={this.openCheckInModal} />
          <RaisedButton label="Rechercher quelqu'un" secondary style={style} />
        </div>

        <Dialog
          title="Indiquer où je suis"
          actions={actions}
          modal={false}
          open={this.state.openCheckInModal}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          {!this.state.mode &&
            <div>
              <RaisedButton label="Scanner un QR code" secondary style={style} onClick={() => this.setState({ mode: 'qrcode' })} />
              <RaisedButton label="Manuellement" primary style={style} onClick={() => this.setState({ mode: 'manual' })} />
            </div>
          }
          {this.state.mode === 'manual' &&
            <div>
              <SelectField
                floatingLabelText="Aile"
                value={this.state.room}
                onChange={(event, index, value) => this.setState({ room: value })}
                autoWidth
                maxHeight={200}
              >
                <MenuItem value="Rouge - B1" primaryText="Rouge - B1" />
                <MenuItem value="Rouge - B2" primaryText="Rouge - B2" />
                <MenuItem value="Rouge - B3" primaryText="Rouge - B3" />
                <MenuItem value="Bibliothèque" primaryText="Bibliothèque" />
                <MenuItem value="Mantik" primaryText="Mantik" />
                <MenuItem value="Café" primaryText="Café/cuisine" />
                <MenuItem value="B4" primaryText="B4" />
                <MenuItem value="Cafet" primaryText="Cafet" />
                <MenuItem value="Créa" primaryText="Salle créa" />
                <MenuItem value="B5" primaryText="Vert - B5" />
                <MenuItem value="SAV" primaryText="SAV" />
                <MenuItem value="other" primaryText="Ailleurs/télétravail" />
                <MenuItem value="VIP" primaryText="Salle VIP" />
                <MenuItem value="wood" primaryText="Salles réunion Wood" />
                <MenuItem value="white" primaryText="Salle réunion white" />
              </SelectField>
              <RaisedButton label="Valider" primary style={style} onClick={() => this.checkIn(this.state.room)} />
            </div>
          }
          {this.state.mode === 'qrcode' && <QRScanner onScan={this.checkIn} />}
        </Dialog>
      </div>
    );
  }
}

export default App;
