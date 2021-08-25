import React, {Component} from 'react';
import {
  Text,
  View,
  Modal,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const ProductListItem = ({title}) => {
  return (
    <View style={{height: 50, backgroundColor: 'yellow'}}>
      <Text>{title}</Text>
    </View>
  );
};

class AddSubProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addProductModalVisible: false,
      subProductName: '',
      itemNo: '',
      counterRate: '',
      productList: null,
    };
    this.productId = this.props.route.params.productId;
    this.companyId = this.props.route.params.companyId;
  }
  componentDidMount = () => {
    this.onValueChange = database()
      .ref(
        // eslint-disable-next-line prettier/prettier
        `/Distributors/${auth().currentUser.uid}/SubProducts/${
          this.companyId
        }/${this.productId}`,
      )
      .on('value', snapshot => {
        this.setState({productList: snapshot.val()});
        console.log('product list ', this.state.productList);
      });
  };
  componentWillUnmount = () => {
    database()
      // eslint-disable-next-line prettier/prettier
      .ref(
        `/Distributors/${auth().currentUser.uid}/SubProducts/${
          this.companyId
        }/${this.productId}`,
      )
      .off('value', this.onValueChange);
  };
  setModalVisible = visible => {
    this.setState({addProductModalVisible: visible});
  };
  render() {
    const {
      addProductModalVisible,
      subProductName,
      productList,
      itemNo,
      counterRate,
    } = this.state;
    return (
      <View>
        <Text> in sub product </Text>
        <Modal
          animationType="fade"
          transparent={true}
          visible={addProductModalVisible}
          onRequestClose={() => this.setModalVisible(!addProductModalVisible)}>
          <View style={styles.modalContainer}>
            <View style={styles.contextContainer}>
              <TextInput
                placeholder="item no"
                onChangeText={text => this.setState({itemNo: text})}
              />
              <TextInput
                placeholder="product name"
                onChangeText={text => this.setState({subProductName: text})}
              />
              <TextInput
                placeholder="counter rate"
                onChangeText={text => this.setState({counterRate: text})}
              />
              <Button
                title="Add sub product"
                onPress={() => {
                  database()
                    .ref(
                      // eslint-disable-next-line prettier/prettier
                      `/Distributors/${auth().currentUser.uid}/SubProducts/${
                        this.companyId
                      }/${this.productId}`,
                    )
                    .push()
                    .set({itemNo, subProductName, counterRate, itemCount: 0})
                    .then(() =>
                      console.log(
                        'in add sub product data uploaded successfully!',
                      ),
                    );
                  this.setModalVisible(false);
                }}
              />
            </View>
          </View>
        </Modal>
        {productList ? (
          <FlatList
            data={Object.keys(productList)}
            renderItem={({item}) => (
              <ProductListItem title={productList[item].subProductName} />
            )}
          />
        ) : (
          <Text>No sub products added</Text>
        )}
        <Button
          title="add Sub-Product"
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

export default AddSubProduct;
