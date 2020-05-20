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
  publishableKey: 'pk_test_HWcOeGStIfoP98VZkHRIJUmO00E1eZyuQG',
});

class ShopScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      data: [],
      amount: '',
    };
  }
  handleSearch = (text) => {
    this.setState({search: text});
  };

  componentDidMount() {
    axios
      .get('http://localhost:3000')
      .then((response) => {
        this.setState({
          data: response.data,
        });
      })
      .catch(function (err) {
        alert(err);
      });
  }

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

  render() {
    const {loading, token} = this.state;
    console.log('##data', this.state.data);
    const Item = ({user}) => {
      console.log('##item', user);
      return (
        <View>
          <View style={styles.viewforFlatList}>
            <View style={styles.viewforButton}>
              <Text style={styles.businessNameStyle}>{user.item.bname}</Text>
              <View style={styles.container}>
                <Button
                  style={styles.buttons1}
                  text="Buy Now"
                  loading={loading}
                  onPress={() => {
                    navigate('Payment Gateways', {
                      bname: user.item.bname,
                      bdesc: user.item.bdesc,
                    });
                  }}
                />
                <View style={styles.token}>
                  {token && <>{this.makePayment}</>}
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.businessDescandEmailStyle}>
            {user.item.bdesc}
          </Text>
          <Text style={styles.businessDescandEmailStyle}>
            Email: {user.item.email}
          </Text>
          <Text style={styles.phoneNumberStyle}>
            Phone Number: {user.item.phonenum}
          </Text>
        </View>
      );
    };

    const {navigate} = this.props.navigation;
    return (
      <View style={styles.viewForSearch}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.viewforButton}>
          <TextInput
            style={styles.input2}
            underlineColorAndroid="transparent"
            placeholder="Business Category/Name"
            placeholderTextColor="#000000"
            autoCapitalize="none"
            onChangeText={this.handleSearch}
          />
          <TouchableOpacity style={styles.buttons}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.buttonsUnderLogin}
          onPress={() => {
            navigate('Help');
          }}>
          <Text style={styles.buttonTextForSignUp}>Help</Text>
        </TouchableOpacity>
        {/* <WebView
        source={{ uri: 'https://reactnative.dev' }}
        style={{ marginTop: 20 }}
      />   */}
        <View style={styles.FlatList}>
          <FlatList
            data={this.state.data}
            renderItem={(user) => <Item user={user} />}
            keyExtractor={(user) => user.id}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewforButton: {
    flexDirection: 'row',
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
    marginTop: 30,
    marginRight: 15,
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
    width: 70,
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
  },
  buttonsUnderLogin: {
    margin: 7,
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

export default ShopScreen;
