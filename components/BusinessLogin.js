import {
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import * as React from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage,
} from 'react-native';

class BLoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  handleUS = (text) => {
    this.setState({username: text});
  };
  handlePW = (text) => {
    this.setState({password: text});
  };

  onLogin = (e) => {
    e.preventDefault();
    const payload = {
      email: this.state.username,
      password: this.state.password,
    };
    axios
      .post(
        'https://localmainstreetbackend.herokuapp.com/app/LoginAPI/login',
        payload,
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          AsyncStorage.setItem('token', response.data);
        }
        const tokenval = AsyncStorage.getItem('token');
        console.log(tokenval);

        if (!tokenval) {
          alert('Incorrect email or password.');
        }
        this.props.navigation.navigate('Buttons');
      })
      .catch(function (err) {
        if (err === 'Error: Request failed with status code 404') {
          alert('Incorrect login credentials. Please try again.');
        } else {
          alert(err);
        }
      });
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.viewForSearch}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.header}>Business Login</Text>
        <TextInput
          style={styles.input2}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="#000000"
          autoCapitalize="none"
          onChangeText={this.handleUS}
        />

        <TextInput
          style={styles.input2}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#000000"
          autoCapitalize="none"
          secureTextEntry
          onChangeText={this.handlePW}
        />

        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            navigate('Buttons');
          }}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonsUnderLogin}
          onPress={() => {
            navigate('Login');
          }}>
          <Text style={styles.buttonTextForSignUp}>Login as a Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonsUnderLogin}
          onPress={() => {
            navigate('Sign Up');
          }}>
          <Text style={styles.buttonTextForSignUp}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonsUnderLogin}
          onPress={() => {
            navigate('Reset Password');
          }}>
          <Text style={styles.buttonTextForSignUp}>Forgot Your Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonsUnderLogin}
          onPress={() => {
            navigate('Help');
          }}>
          <Text style={styles.buttonTextForSignUp}>Help</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    textAlign: 'center',
  },
  input2: {
    margin: 15,
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    color: '#000000',
    width: 360,
    borderRadius: 15,
  },

  viewForSearch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  buttons: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    width: 360,
    opacity: 1,
    backgroundColor: '#000000',
    borderRadius: 15,
    marginLeft: 500,
    marginRight: 500,
  },

  buttonText: {
    color: '#ffffff',
  },

  buttonTextForSignUp: {
    color: '#000000',
  },
  buttonsUnderLogin: {
    margin: 7,
  },
});

export default BLoginScreen;
