import {PureComponent} from 'react';
import stripe from 'tipsi-stripe';
import Button from '../components/components/Button';
import {
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import * as React from 'react';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';
import {cos} from 'react-native-reanimated';
stripe.setOptions({
  publishableKey: 'pk_test_KkfXWjgjLwtNgUTOjtn25pj4005QCLSJ6I',
});

class AmountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      data: [],
      amount: '',
    };
  }
  handleSearch = (text) => {
    this.setState({amount: text});
  };

  static title = 'Card Form';

  state = {
    loading: false,
    token: null,
  };

  handleCardPayPress = async () => {
    try {
      this.setState({loading: true, token: null});
      const tokens = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: 'Vaibhav Herugu',
            line1: '2 Darryl Drive',
            line2: '',
            city: 'Morganville',
            state: 'NJ',
            country: 'USA',
            postalCode: '07751',
            email: 'vherugu@gmail.com',
          },
        },
      });

      this.setState({loading: false, token: tokens.tokenId});
    } catch (error) {
      this.setState({loading: false});
    }
  };

  makePayment = () => {
    // console.log('hello world');
    this.setState({loading: true});
    axios({
      method: 'POST',
      url:
        'http://localhost:5000/localmainstreet-b0144/us-central1/completePaymentWithStripe',
      data: {
        amount: this.state.amount * 100 * 1.02,
        currency: 'usd',
        token: this.state.token,
      },
    })
      .then((response) => {
        console.log(response);
        alert('Payment processed!');
        this.setState({loading: false});
        setTimeout(() => {
          this.props.navigation.navigate('Buttons');
        }, 1500);
      })
      .catch((error) => {
        alert('Invalid.');
        console.log(error);
      });
  };

  render() {
    const {loading, token} = this.state;
    console.log('##data', this.state.data);
    console.log(token);
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.viewForSearch}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.viewforButton}>
          <TextInput
            style={styles.input2}
            underlineColorAndroid="transparent"
            placeholder="Amount"
            placeholderTextColor="#000000"
            autoCapitalize="none"
            onChangeText={this.handleSearch}
          />
          <Button
            style={styles.buttons1}
            text="Buy Now"
            loading={loading}
            onPress={this.handleCardPayPress}
          />
          <View style={styles.token}>
            {this.state.token && (
              <Button
                text="Make Payment"
                loading={loading}
                onPress={this.makePayment}
              />
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonsUnderLogin}
          onPress={() => {
            navigate('Help');
          }}>
          <Text>Help</Text>
        </TouchableOpacity>
        <Text style={styles.buttonTextForSignUp}>
          Note: You will be charged 2% extra during this transaction for fees
          for LocalMainStreet. We do not store your credit card information.
        </Text>
        {/* <WebView
        source={{ uri: 'https://reactnative.dev' }}
        style={{ marginTop: 20 }}
      />   */}
        {/* <View style={styles.FlatList}>
          <FlatList
            data={this.state.data}
            renderItem={(user) => <Item user={user} />}
            keyExtractor={(user) => user.id}
          />
        </View> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
  viewforButton: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  viewforFlatList: {
    alignItems: 'center',
  },
  businessDescandEmailStyle: {
    textAlign: 'center',
    fontSize: 13,
    margin: 10,
    marginTop: -5,
    fontFamily: 'Avenir',
  },
  phoneNumberStyle: {
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 50,
    margin: 10,
    marginTop: -5,
    fontFamily: 'Avenir',
  },
  input2: {
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    color: '#000000',
    width: 270,
    borderRadius: 15,
  },

  viewForSearch: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  buttons: {
    marginTop: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    width: 70,
    opacity: 1,
    backgroundColor: '#000000',
    borderRadius: 15,
  },

  buttons1: {
    marginTop: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    width: 270,
    opacity: 1,
    backgroundColor: '#919191',
    borderRadius: 15,
  },

  buttonText: {
    color: '#ffffff',
  },

  buttonText1: {
    color: '#000000',
  },
  buttonTextForSignUp: {
    color: '#000000',
    textAlign: 'center',
  },
  buttonsUnderLogin: {
    margin: 7,
    marginTop: -21,
  },
  businessNameStyle: {
    textAlign: 'center',
    fontSize: 35,
    marginRight: 20,
    fontFamily: 'Avenir',
  },
  FlatLists: {
    backgroundColor: '#919191',
  },
});

export default AmountScreen;
