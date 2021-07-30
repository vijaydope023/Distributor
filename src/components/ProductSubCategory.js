import React, {Component} from 'react';
import {Text, View, Button, FlatList} from 'react-native';
import ProductSubCategoryList from '../helpers/ProductSubCategoryList';

class ProductSubCategory extends Component {
  render() {
    const DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First subProduct',
        itemNo: 'itemNo1',
        variant: '6 nos',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second subProduct',
        itemNo: 'itemNo2',
        variant: '10 nos',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third subProduct',
        itemNo: 'itemNo3',
        variant: '100 gm',
      },
    ];
    return (
      <View>
        <Text> subProduct sub category {this.props.route.params.title}</Text>

        <Button
          onPress={() => {
            this.props.navigation.goBack();
          }}
          title="add items"
        />

        <FlatList
          data={DATA}
          renderItem={({item, index}) => (
            <ProductSubCategoryList
              subProductName={item.title}
              itemNo={item.itemNo}
              variant={item.variant}
            />
          )}
        />
      </View>
    );
  }
}

export default ProductSubCategory;
