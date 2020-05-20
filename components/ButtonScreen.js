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

class ButtonScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView style={styles.background}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => {
            navigate('Dashboard');
          }}>
          <Text style={styles.buttonText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            navigate('Buy Gift Cards');
          }}>
          <Text style={styles.buttonText}>Buy a Gift Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            navigate('Scan Gift Cards');
          }}>
          <Text style={styles.buttonText}>Scan A Gift Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate('About');
          }}>
          <Text style={styles.buttonTextAbove}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate('Login');
          }}>
          <Text style={styles.buttonTextUnder}>Logout</Text>
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
    height: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    width: 360,
    opacity: 1,
    backgroundColor: '#000000',
    borderRadius: 15,
    alignSelf: 'center',
  },
  homeButton: {
    height: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    width: 360,
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

export default ButtonScreen;
