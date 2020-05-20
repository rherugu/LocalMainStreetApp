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

class SignUpScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView style={styles.background}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => {
            navigate('Register as a Customer');
          }}>
          <Text style={styles.buttonText}>Register as a Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            navigate('Register as a Business');
          }}>
          <Text style={styles.buttonText}>Register as a Business</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonsUnderLogin}
          onPress={() => {
            navigate('Help');
          }}>
          <Text style={styles.buttonTextForSignUp}>Help</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  buttonTextForSignUp: {
    color: '#000000',
    fontSize: 20,
  },
  buttonsUnderLogin: {
    margin: 7,
    alignItems: 'center',
  },
  background: {
    backgroundColor: '#ffffff',
  },

  buttons: {
    height: 300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    width: 400,
    opacity: 1,
    backgroundColor: '#000000',
    borderRadius: 15,
    alignSelf: 'center',
  },
  homeButton: {
    height: 300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    width: 400,
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
export default SignUpScreen;
