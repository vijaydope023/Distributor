import React, {Component} from 'react';
import {
  Text,
  View,
  Modal,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const ProductListItem = ({onPress, title}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={{height: 50, backgroundColor: 'yellow'}}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

class AddMainProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addProductModalVisible: false,
      productName: '',
      productList: null,
    };
    this.companyId = this.props.route.params.item;
  }
  componentDidMount = () => {
    this.onValueChange = database()
      .ref(`/Distributors/${auth().currentUser.uid}/Products/${this.companyId}`)
      .on('value', snapshot => {
        this.setState({productList: snapshot.val()});
        console.log('product list ', this.state.productList);
      });
  };
  componentWillUnmount = () => {
    database()
      .ref(`/Distributors/${auth().currentUser.uid}/Products/${this.companyId}`)
      .off('value', this.onValueChange);
  };
  setModalVisible = visible => {
    this.setState({addProductModalVisible: visible});
  };
  onPressItem = item => {
    console.log('item pressed');
    this.props.navigation.navigate('AddSubProduct', {
      productId: item,
      companyId: this.companyId,
    });
  };
  render() {
    const {addProductModalVisible, productName, productList} = this.state;
    return (
      <View>
        <Text> in main product </Text>
        <Modal
          animationType="fade"
          transparent={true}
          visible={addProductModalVisible}
          onRequestClose={() => this.setModalVisible(!addProductModalVisible)}>
          <View style={styles.modalContainer}>
            <View style={styles.contextContainer}>
              <TextInput
                placeholder="product name"
                onChangeText={text => this.setState({productName: text})}
              />
              <Button
                title="Add product"
                onPress={() => {
                  console.log('text input ', this.state.productName);
                  database()
                    .ref(
                      `/Distributors/${auth().currentUser.uid}/Products/${
                        this.companyId
                      }`,
                    )
                    .push()
                    .set({productName})
                    .then(() =>
                      console.log(
                        'in add main product data uploaded successfully!',
                      ),
                    );
                  this.setModalVisible(false);
                }}
              />
            </View>
          </View>
        </Modal>
        {console.log('product list length 4', productList)}
        {productList ? (
          <FlatList
            data={Object.keys(productList)}
            renderItem={({item}) => (
              <ProductListItem
                onPress={() => this.onPressItem(item)}
                title={productList[item].productName}
              />
            )}
          />
        ) : (
          <Text>No products added</Text>
        )}
        <Button
          title="add Product"
          onPress={() => this.setModalVisible(true)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contextContainer: {
    width: '80%',
    backgroundColor: 'white',
  },
});

export default AddMainProduct;
