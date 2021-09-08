import React, {Component} from 'react';
import {Text, View, Button, FlatList} from 'react-native';
import ProductCategoryList from '../helpers/ProductCategoryList';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {Picker} from '@react-native-picker/picker';
class ProductCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyList: null,
      companyId: null,
      productList: null,
    };
  }

  componentDidMount = () => {
    database()
      .ref(`/Distributors/${auth().currentUser.uid}/Companies`)
      .once('value', snapshopt => {
        this.setState({companyList: snapshopt.val()});
        this.setState(prevState => ({
          ...prevState,
          companyId: Object.keys(prevState.companyList)[0],
        }));
      });
  };

  componentDidUpdate = (_prevProps, prevState) => {
    if (this.state.companyId && prevState.companyId !== this.state.companyId) {
      console.log('in update');
      database()
        .ref(
          `/Distributors/${auth().currentUser.uid}/Products/${
            this.state.companyId
          }`,
        )
        .once('value', snapshopt => {
          this.setState({productList: snapshopt.val()});
        });
    }
  };

  onPressItem = item => {
    this.props.navigation.navigate('ProductSubCategory', {
      productId: item,
      companyId: this.state.companyId,
    });
  };

  selectCompany = val => {
    this.setState({companyId: val});
  };

  onBillPress = () => {
    if (this.props.route.params.from === 'Shops') {
      this.props.navigation.navigate('Bill', {
        shopDetails: this.props.route.params.shopDetails,
        companyDetails: {
          companyName: this.state.companyList[this.state.companyId].companyName,
          companyId: this.state.companyId,
        },
        from: this.props.route.params.from,
      });
    }
  };

  render() {
    const {companyId, companyList, productList} = this.state;
    return (
      <View>
        <Text> Product category from {this.props.route.params.from}</Text>

        {companyList ? (
          <Picker
            selectedValue={companyId}
            onValueChange={val => this.selectCompany(val)}>
            {Object.keys(companyList).map(key => {
              return (
                <Picker.Item value={key} label={companyList[key].companyName} />
              );
            })}
          </Picker>
        ) : null}

        {productList ? (
          <FlatList
            data={Object.keys(productList)}
            renderItem={({item}) => (
              <ProductCategoryList
                onPress={() => this.onPressItem(item)}
                productName={productList[item].productName}
              />
            )}
          />
        ) : (
          <Text>loading product list...</Text>
        )}
        <Button onPress={this.onBillPress} title="Bill" />
      </View>
    );
  }
}

export default ProductCategory;
