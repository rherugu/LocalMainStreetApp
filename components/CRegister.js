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

class CRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flname: '',
      email: '',
      phone: '',
      password: '',
    };
  }

  handleflname = (text) => {
    this.setState({flname: text});
  };
  handleEmail = (text) => {
    this.setState({email: text});
  };
  handlePW = (text) => {
    this.setState({password: text});
  };
  handlePhone = (text) => {
    this.setState({phone: text});
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.viewForSearch}>
        <StatusBar barStyle="dark-content" />
        <TextInput
          style={styles.input2}
          underlineColorAndroid="transparent"
          placeholder="Full Name"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handleflname}
        />

        <TextInput
          style={styles.input2}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />

        <TextInput
          style={styles.input2}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="black"
          autoCapitalize="none"
          secureTextEntry
          onChangeText={this.handlePW}
        />

        <TextInput
          style={styles.input2}
          underlineColorAndroid="transparent"
          placeholder="Phone Number"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handlePhone}
        />

        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            navigate('Buttons');
          }}>
          <Text style={styles.buttonText}>Sign Up</Text>
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
  },

  buttonText: {
    color: 'white',
  },

  buttonTextForSignUp: {
    color: '#000000',
  },
  buttonsUnderLogin: {
    margin: 7,
    marginBottom: 200,
  },
});

export default CRegister;
