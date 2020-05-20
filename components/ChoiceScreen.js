import * as React from 'react';
import {
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

class ChoiceScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView style={styles.background}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => {
            navigate('Stripe Checkout');
          }}>
          <Text style={styles.buttonText}>Pay With Stripe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            navigate('PayPal Checkout');
          }}>
          <Text style={styles.buttonText}>Pay with PayPal</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ffffff',
  },

  buttons: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    width: 300,
    opacity: 1,
    backgroundColor: '#000000',
    borderRadius: 15,
    alignSelf: 'center',
  },
  homeButton: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    width: 300,
    opacity: 1,
    backgroundColor: '#000000',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  buttonTextUnder: {
    color: '#000000',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 57,
  },
  buttonTextAbove: {
    color: '#000000',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
});

export default ChoiceScreen;
