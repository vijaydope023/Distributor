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
      value: null,
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
          value: Object.keys(prevState.companyList)[0],
        }));
      });
  };

  componentDidUpdate = (_prevProps, prevState) => {
    if (this.state.value && prevState.value !== this.state.value) {
      console.log('in update');
      database()
        .ref(
          `/Distributors/${auth().currentUser.uid}/Products/${
            this.state.value
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
      companyId: this.state.value,
    });
  };

  selectCompany = val => {
    console.log('key ', val);
    this.setState({value: val});
  };

  render() {
    const {value, companyList, productList} = this.state;
    return (
      <View>
        <Text> Product category from {this.props.route.params.title}</Text>

        {companyList ? (
          <Picker
            selectedValue={value}
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
        <Button
          onPress={() => {
            this.props.navigation.navigate('Bill', {value});
          }}
          title="Bill"
        />
      </View>
    );
  }
}

export default ProductCategory;
