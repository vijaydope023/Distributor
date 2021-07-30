import React, {Component} from 'react';
import {Text, View, Button, FlatList} from 'react-native';
import HistoryList from '../../helpers/HistoryList';

class History extends Component {
  onPressItem = ({date, total}) => {
    this.props.navigation.navigate('HistoryDetail', {date, total});
  };
  render() {
    const DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: 'date1',
        total: '500',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        date: 'date2',
        total: '600',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        date: 'date3',
        total: '100',
      },
    ];
    return (
      <View style={{flex: 1, backgroundColor: 'yellow'}}>
        <Text> History </Text>
        <FlatList
          data={DATA}
          renderItem={({item, index}) => (
            <HistoryList
              onPress={() => this.onPressItem(item)}
              date={item.date}
              total={item.total}
            />
          )}
        />
      </View>
    );
  }
}

export default History;
