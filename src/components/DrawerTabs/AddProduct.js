import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import CompanyList from '../../helpers/CompanyList';

export class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: [],
    };
  }
  componentDidMount = () => {
    database()
      .ref(`/Distributors/${auth().currentUser.uid}/Companies`)
      .once('value')
      .then(snapshot => {
        this.setState({productData: snapshot.val()});
        console.log('companies ', this.state.productData);
      });
  };

  onPressItem = item => {
    this.props.navigation.navigate('AddMainProduct', {item});
  };
  render() {
    const {productData} = this.state;
    return (
      <View>
        <Text> company list</Text>
        <FlatList
          data={Object.keys(productData)}
          renderItem={({item}) => (
            <CompanyList
              onPress={() => {
                this.onPressItem(item);
              }}
              title={productData[item].companyName}
            />
          )}
        />
      </View>
    );
  }
}

export default AddProduct;
