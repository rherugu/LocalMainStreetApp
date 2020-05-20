import * as React from 'react';
import {TouchableOpacity, TextInput, Image, ImageBackground} from 'react-native'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
  } from 'react-native';

class ForgotPassScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
     fname: '',
     lname: '',
     email: '',
     phone: '',
     username: '',
     password: '',
     cpass: '',
   }
  }

 handlefname = (text) => {
   this.setState({ fname: text })
}
handlelname = (text) => {
   this.setState({ lname: text })
}
handleEmail = (text) => {
   this.setState({ email: text })
}
handlePhone = (text) => {
  this.setState({ phone: text })
}
handleUS = (text) => {
  this.setState({ username: text })
}
handlePW = (text) => {
  this.setState({ password: text })
}
handleCPW = (text) => {
  this.setState({ cpass: text })
}

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.viewForSearch}>
          <StatusBar barStyle="dark-content" />
          <Text style={styles.text}>Enter your email address below so we can send you a confirmation email.</Text>
          <TextInput style={styles.input2}
             underlineColorAndroid = "transparent"
             placeholder = 'Email'
             placeholderTextColor = "black"
             autoCapitalize = "none"
             onChangeText = {this.handlelname}
          />

          <TouchableOpacity style={styles.buttons} onPress={()=>{
              navigate('Confirmation PIN')
          }}><Text style={styles.buttonText}>Send</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonsUnderLogin} onPress={()=>{
              navigate('Help')
          }}><Text style={styles.buttonTextForSignUp}>Help</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonsUnderLogin} onPress={()=>{
              navigate('Sign Up')
          }}><Text style={styles.buttonTextForSignUp}>Don't have an account? Sign Up</Text></TouchableOpacity>
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
   text:{
     textAlign: 'center'
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
      marginBottom:5,
      width: 360,
      opacity: 1,
      backgroundColor: "#000000",
      borderRadius: 15,
  },

  buttonText: {
      color: 'white'
  },

  buttonTextForSignUp: {
    color: '#000000'
  },
  buttonsUnderLogin: {
    margin: 7
  }
    })
export default ForgotPassScreen;