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
  Modal,
} from 'react-native';
import WebView from 'react-native-webview';

class PayPal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      status: '',
    };
  }

  handleResponse = (data) => {
    if (data.title === 'success') {
      this.setState({showModal: false});
    } else if (data.title === 'cancel') {
      this.setState({showModal: false, status: 'Cancelled'});
    } else {
      return;
    }
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.bg}>
        <Modal
          visible={this.state.showModal}
          onRequestClose={() => this.setState({showModal: false})}>
          <WebView
            source={{uri: 'http://localhost:4000/'}}
            onNavigationStateChange={(data) => this.handleResponse(data)}
            injectedJavaScript={`document.f1.submit()`}
          />
        </Modal>
        <TouchableOpacity onPress={() => this.setState({showModal: true})}>
          <Text>Pay with PayPal</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#ffffff',
  },
});

export default PayPal;
