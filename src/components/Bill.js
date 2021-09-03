import React, {Component} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyId: this.props.route.params.value,
      loading: true,
      companyDetails: {},
      products: {},
    };
  }

  componentDidMount = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      keys = await AsyncStorage.multiGet(keys);
      await database()
        .ref(
          `/Distributors/${auth().currentUser.uid}/Companies/${
            this.state.companyId
          }`,
        )
        .once('value', snapshot => {
          this.setState({companyDetails: snapshot.val()});
        });
      this.setState({
        products: keys !== null ? Object.fromEntries(keys) : {},
        loading: false,
      });
    } catch (e) {
      console.log('error : ', e);
    }
  };

  render() {
    const {loading, companyDetails, products} = this.state;
    return (
      <View style={{flex: 1}}>
        {loading ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View>
            <Text>Bill</Text>
            <Text>Company Name: {companyDetails['companyName']}</Text>
            {Object.values(products).map(product => (
              <View>
                {Object.values(JSON.parse(product)).map(productDetail => (
                  <Text>{JSON.stringify(productDetail)}</Text>
                ))}
                <Text>---------</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }
}

export default Bill;
