import React, {Component} from 'react';
import {Text, View, Button, FlatList} from 'react-native';
import CompanyList from '../../helpers/CompanyList';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyList: null,
    };
  }

  componentDidMount = () => {
    database()
      .ref(`/Distributors/${auth().currentUser.uid}/Companies`)
      .once('value', snapshot => {
        this.setState({companyList: snapshot.val()});
      });
  };
  onPressItem = item => {
    this.props.navigation.navigate('ProductCategory', {
      item,
      from: 'Companies',
    });
  };
  render() {
    const {companyList} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: 'blue'}}>
        <Text> Companies </Text>

        {companyList ? (
          <FlatList
            data={Object.keys(companyList)}
            renderItem={({item, index}) => (
              <CompanyList
                onPress={() => this.onPressItem(item)}
                title={companyList[item].companyName}
              />
            )}
          />
        ) : (
          <Text>No company added</Text>
        )}
      </View>
    );
  }
}

export default Companies;
