import React, {Component} from 'react';
import {Text, View, Button, FlatList} from 'react-native';
import ShopList from '../../helpers/ShopList';

class Shops extends Component {
  onPressItem = ({title}) => {
    this.props.navigation.navigate('ProductCategory', {title});
  };

  render() {
    const DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Shop',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Shop',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Shop',
      },
    ];

    return (
      <View style={{flex: 1, backgroundColor: 'gray'}}>
        <Text> Shops </Text>

        <FlatList
          data={DATA}
          renderItem={({item, index}) => (
            <ShopList
              onPress={() => {
                this.onPressItem(item);
              }}
              title={item.title}
            />
          )}
        />
      </View>
    );
  }
}

export default Shops;
