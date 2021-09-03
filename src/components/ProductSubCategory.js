import React, {Component} from 'react';
import {Text, View, Button, FlatList, ActivityIndicator} from 'react-native';
import ProductSubCategoryList from '../helpers/ProductSubCategoryList';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
class ProductSubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      companyId: this.props.route.params.companyId,
      productId: this.props.route.params.productId,
      subProductList: null,
      enteredCountList: {},
    };
  }

  componentDidMount = async () => {
    await database()
      .ref(
        `/Distributors/${auth().currentUser.uid}/SubProducts/${
          this.state.companyId
        }/${this.state.productId}`,
      )
      .once('value', snapshopt => {
        this.setState({subProductList: snapshopt.val()});
      });
    let values;
    try {
      values = await AsyncStorage.getItem(this.state.productId);
      console.log('values : ', values);
      this.setState({
        enteredCountList: values !== null ? JSON.parse(values) : {},
        loading: false,
      });
    } catch (e) {
      // read error
    }
  };

  addItemsPress = async () => {
    try {
      await AsyncStorage.setItem(
        this.state.productId,
        JSON.stringify(this.state.enteredCountList),
      );
      this.props.navigation.goBack();
    } catch (e) {
      //save error
      console.log('error ', e);
    }
  };

  setInputCount = (item, text, productName, itemNo) => {
    this.state.enteredCountList[item] = {itemCount: text, productName, itemNo};
  };

  render() {
    const {subProductList, enteredCountList} = this.state;
    return (
      <View style={{flex: 1}}>
        {this.state.loading ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View>
            <Text>
              {' '}
              subProduct sub category {this.props.route.params.title}
            </Text>

            {subProductList ? (
              <FlatList
                data={Object.keys(subProductList)}
                renderItem={({item}) => (
                  <ProductSubCategoryList
                    subProductName={subProductList[item].subProductName}
                    counterRate={subProductList[item].counterRate}
                    itemNo={subProductList[item].itemNo}
                    itemCount={subProductList[item].itemCount}
                    setInputCount={text =>
                      this.setInputCount(
                        item,
                        text,
                        subProductList[item].subProductName,
                        subProductList[item].itemNo,
                      )
                    }
                    enteredItemCount={
                      enteredCountList[item]
                        ? enteredCountList[item].itemCount
                        : ''
                    }
                  />
                )}
              />
            ) : (
              <Text>loading sub-product list...</Text>
            )}

            <Button onPress={() => this.addItemsPress()} title="add items" />
          </View>
        )}
      </View>
    );
  }
}

export default ProductSubCategory;
