import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import HistoryDetailList from '../helpers/HistoryDetailList';

class HistoryDetail extends Component {
  onPressItem = ({title}) => {
    this.props.navigation.navigate('Bill', {title});
  };

  render() {
    const DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Shop',
        total: '500',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Shop',
        total: '100',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Shop',
        total: '200',
      },
    ];
    return (
      <View>
        <Text>
          {' '}
          History detail from {this.props.route.params.date} and total is{' '}
          {this.props.route.params.total}
        </Text>

        <FlatList
          data={DATA}
          renderItem={({item, index}) => (
            <HistoryDetailList
              onPress={() => this.onPressItem(item)}
              shopName={item.title}
              total={item.total}
            />
          )}
        />
      </View>
    );
  }
}

export default HistoryDetail;
