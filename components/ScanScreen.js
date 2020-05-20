'use strict';
import React, {Component} from 'react';
import axios from 'axios';
import {
  View,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  Button,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera as Camera} from 'react-native-camera';

var id;
var databasecheck;

class ScanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameq: {},
      balance: {},
      amount: '',
      text: ``,
    };
  }
  onSuccess = async (e) => {
    try {
      const data = JSON.parse(e.data);
      const nameq = data.nameq;
      const balance = data.balance;
      id = data._id;

      await axios
        .get('https://localmainstreetbackend.herokuapp.com/app/qrcode/')
        .then((res) => {
          databasecheck = res.data[res.data.length - 1];
        })
        .catch((err) => {
          alert(err);
        });

      if (Number(databasecheck.balance) === 0) {
        alert('User balance is 0 dollars. Invalid.');
      } else if (Number(databasecheck.balance) <= 0) {
        alert('User owes money.');
      } else {
        this.setState({
          nameq: nameq,
          balance: balance,
          text: `Sucess! ${nameq}'s gift card balance is ${balance} dollars!`,
        });
      }
    } catch (err) {
      alert('Invalid QR Code.');
    }
  };

  handleAmount = (number) => {
    this.setState({amount: number});
  };
  amountpaid = async () => {
    const payloadupdated = {
      nameq: this.state.nameq,
      balance: this.state.balance - this.state.amount,
    };

    await axios
      .get('https://localmainstreetbackend.herokuapp.com/app/qrcode/')
      .then((res) => {
        databasecheck = res.data[res.data.length - 1];
      })
      .catch((err) => {
        alert(err);
      });

    if (Number(databasecheck.balance) <= 0) {
      alert('Insufficient funds.');
    } else {
      axios
        .patch(
          `https://localmainstreetbackend.herokuapp.com/app/qrcode/` + id,
          payloadupdated,
        )
        .then((res) => {
          console.log(res);
          alert('Success');
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  render() {
    const {navigate} = this.props.navigation;
    // const nameq = this.state.nameq.map((name))
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={Camera.Constants.FlashMode.auto}
        topContent={
          <View>
            <TextInput
              style={styles.input2}
              underlineColorAndroid="transparent"
              placeholder="Amount Paid"
              placeholderTextColor="#000000"
              autoCapitalize="none"
              onChangeText={this.handleAmount}
            />
            <Button title="Submit" onPress={this.amountpaid}></Button>
          </View>
        }
        bottomContent={<Text style={styles.texts}>{this.state.text}</Text>}
      />
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 15,
  },
  input2: {
    marginTop: 15,
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    color: '#000000',
    width: 340,
    borderRadius: 15,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#000000',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  background: {
    backgroundColor: '#ffffff',
    // marginBottom: 100
  },
  texts: {
    fontSize: 30,
    textAlign: 'center',
  },
});
export default ScanScreen;
