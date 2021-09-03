/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import auth from '@react-native-firebase/auth';
import Shops from './src/components/MainTabs/Shops';
import Companies from './src/components/MainTabs/Companies';
import History from './src/components/MainTabs/History';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppTheme from './src/utils/styles/styles';
import ProductCategory from './src/components/ProductCategory';
import ProductSubCategory from './src/components/ProductSubCategory';
import Bill from './src/components/Bill';
import HistoryDetail from './src/components/HistoryDetail';
import LoginScreen from './src/components/LoginScreen';
import LogoutScreen from './src/components/DrawerTabs/LogoutScreen';
import AddShops from './src/components/DrawerTabs/AddShops';
import AddCompany from './src/components/DrawerTabs/AddCompany';
import AddProduct from './src/components/DrawerTabs/AddProduct';
import AddMainProduct from './src/components/DrawerTabs/AddMainProduct';
import AddSubProduct from './src/components/DrawerTabs/AddSubProduct';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppTabBar = () => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    }}>
    <Image
      source={AppTheme.logoImage}
      style={{
        height: 30,
        width: 150,
        alignSelf: 'center',
      }}
      resizeMode="contain"
    />
  </View>
);

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <Text
              style={{
                color: isFocused ? 'white' : 'lightgray',
                fontSize: 16,
                textAlign: 'center',
              }}>
              {label}
            </Text>
            {isFocused ? (
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: '80%',
                  height: 5,
                  backgroundColor: 'white',
                  borderRadius: 50,
                  marginVertical: 5,
                  alignSelf: 'center',
                }}
              />
            ) : (
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: 70,
                  height: 5,
                  borderRadius: 10,
                  marginVertical: 5,
                }}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function HomeScreen() {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName="Shops">
      <Tab.Screen
        name="Shops"
        component={Shops}
        options={{tabBarLabel: 'Shops'}}
      />
      <Tab.Screen
        name="Companies"
        component={Companies}
        options={{tabBarLabel: 'Companies'}}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{tabBarLabel: 'History'}}
      />
    </Tab.Navigator>
  );
}

function AllScreens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: props => <AppTabBar {...props} />,
        headerRight: () => null,
        headerLeft: () => null,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductCategory" component={ProductCategory} />
      <Stack.Screen name="ProductSubCategory" component={ProductSubCategory} />
      <Stack.Screen name="Bill" component={Bill} />
      <Stack.Screen name="HistoryDetail" component={HistoryDetail} />
    </Stack.Navigator>
  );
}

function AddProductScreens() {
  return (
    <Stack.Navigator initialRouteName="SelectCompany">
      <Stack.Screen name="SelectCompany" component={AddProduct} />
      <Stack.Screen name="AddMainProduct" component={AddMainProduct} />
      <Stack.Screen name="AddSubProduct" component={AddSubProduct} />
    </Stack.Navigator>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null,
    };
  }

  componentDidMount = () => {
    const result = auth().onAuthStateChanged(user => {
      user
        ? this.setState({user, loading: false})
        : this.setState({user: null, loading: false});
    });
    console.log('result ', result.user);
  };

  render() {
    return (
      <NavigationContainer>
        {!this.state.user ? (
          <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          </Stack.Navigator>
        ) : (
          <Drawer.Navigator>
            <Drawer.Screen name="AllScreens" component={AllScreens} />
            <Drawer.Screen name="AddShops" component={AddShops} />
            <Drawer.Screen name="AddCompany" component={AddCompany} />
            <Drawer.Screen name="AddProduct" component={AddProductScreens} />
            <Drawer.Screen name="LogoutScreen" component={LogoutScreen} />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    );
  }
}

export default App;
