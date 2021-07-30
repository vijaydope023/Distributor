import React, {Component} from 'react';
import {Text, View, Button, FlatList} from 'react-native';
import ProductCategoryList from '../helpers/ProductCategoryList';

class ProductCategory extends Component {
  onPressItem = ({title}) => {
    this.props.navigation.navigate('ProductSubCategory', {title});
  };

  render() {
    const DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Product',
        img: 'img1',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Product',
        img: 'img2',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Product',
        img: 'img3',
      },
    ];
    return (
      <View>
        <Text> Product category from {this.props.route.params.title}</Text>
        <Button
          onPress={() => {
            this.props.navigation.navigate('Bill');
          }}
          title="Bill"
        />

        <FlatList
          data={DATA}
          renderItem={({item, index}) => (
            <ProductCategoryList
              onPress={() => this.onPressItem(item)}
              productName={item.title}
              img={item.img}
            />
          )}
        />
      </View>
    );
  }
}

export default ProductCategory;
