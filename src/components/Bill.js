import React, {Component} from 'react';
import {Text, View, ActivityIndicator, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      products: {},
    };
    this.total = 0;
  }

  componentDidMount = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      keys = await AsyncStorage.multiGet(keys);
      if (keys !== null) {
        Object.values(Object.fromEntries(keys)).map(product => {
          Object.values(JSON.parse(product)).map(
            productDetail => (this.total += parseInt(productDetail.itemCount)),
          );
        });
      }
      console.log('product detail : ', this.total);
      this.setState({
        products: keys !== null ? Object.fromEntries(keys) : {},
        loading: false,
      });
    } catch (e) {
      console.log('error : ', e);
    }
  };

  onConfirmPress = async () => {
    if (this.props.route.params.from === 'Shops') {
      const date = new Date().toDateString();
      this.setState({loading: true});
      await database()
        .ref(`/Distributors/${auth().currentUser.uid}/Dates/${date}`)
        .push()
        .set({
          shopDetails: JSON.stringify(this.props.route.params.shopDetails),
          companyName: this.props.route.params.companyDetails.companyName,
          products: JSON.stringify(this.state.products),
          total: this.total,
        })
        .then(() => console.log('data uploaded in dates successfully!'));
      const newRef = database().ref(
        `/Distributors/${auth().currentUser.uid}/SubProducts/${
          this.props.route.params.companyDetails.companyId
        }`,
      );
      await Promise.all(
        Object.keys(this.state.products).map(productId => {
          Object.keys(JSON.parse(this.state.products[productId])).map(
            subProductId => {
              newRef.child(`${productId}/${subProductId}`).update({
                itemCount: JSON.parse(this.state.products[productId])[
                  subProductId
                ].itemCount,
              });
            },
          );
        }),
      );
      this.setState({loading: false});
    }
  };

  render() {
    const {loading, products} = this.state;
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
            <Text>Company Name: {}</Text>
            {Object.values(products).map(product => (
              <View>
                {Object.values(JSON.parse(product)).map(productDetail => (
                  <Text>{JSON.stringify(productDetail)}</Text>
                ))}
                <Text>---------</Text>
              </View>
            ))}
            <Button onPress={this.onConfirmPress} title="Confirm" />
          </View>
        )}
      </View>
    );
  }
}

export default Bill;
