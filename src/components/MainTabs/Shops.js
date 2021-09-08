import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import ShopList from '../../helpers/ShopList';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class Shops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopList: null,
    };
  }
  componentDidMount = () => {
    database()
      .ref(`/Distributors/${auth().currentUser.uid}/Shops`)
      .once('value', snapshot => {
        this.setState({shopList: snapshot.val()});
      });
  };
  onPressItem = (name, phoneNo) => {
    this.props.navigation.navigate('ProductCategory', {
      shopDetails: {shopName: name, shopPhoneNo: phoneNo},
      from: 'Shops',
    });
  };

  render() {
    const {shopList} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: 'gray'}}>
        <Text> Shops </Text>

        {shopList ? (
          <FlatList
            data={Object.keys(shopList)}
            renderItem={({item}) => (
              <ShopList
                onPress={() => {
                  this.onPressItem(
                    shopList[item].shopName,
                    shopList[item].shopPhoneNumber,
                  );
                }}
                title={shopList[item].shopName}
              />
            )}
          />
        ) : (
          <Text>No shops added</Text>
        )}
      </View>
    );
  }
}

export default Shops;
