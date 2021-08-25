import React, {Component} from 'react';
import {Text, View, Button, FlatList} from 'react-native';
import ProductSubCategoryList from '../helpers/ProductSubCategoryList';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
class ProductSubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyId: this.props.route.params.companyId,
      productId: this.props.route.params.productId,
      subProductList: null,
    };
  }

  componentDidMount = () => {
    database()
      .ref(
        `/Distributors/${auth().currentUser.uid}/SubProducts/${
          this.state.companyId
        }/${this.state.productId}`,
      )
      .once('value', snapshopt => {
        this.setState({subProductList: snapshopt.val()});
      });
  };

  render() {
    const {subProductList} = this.state;
    return (
      <View>
        <Text> subProduct sub category {this.props.route.params.title}</Text>

        <Button
          onPress={() => {
            this.props.navigation.goBack();
          }}
          title="add items"
        />

        {subProductList ? (
          <FlatList
            data={Object.keys(subProductList)}
            renderItem={({item}) => (
              <ProductSubCategoryList
                subProductName={subProductList[item].subProductName}
                counterRate={subProductList[item].counterRate}
                itemNo={subProductList[item].itemNo}
                itemCount={subProductList[item].itemCount}
              />
            )}
          />
        ) : (
          <Text>loading sub-product list...</Text>
        )}
      </View>
    );
  }
}

export default ProductSubCategory;
