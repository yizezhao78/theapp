import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ReaderScreen from './screens/ReaderScreen';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Reader"
          onPress={() => this.props.navigation.navigate('Reader')}
          />
      </View>
    );
  }
}

export default StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Reader: {
      screen: ReaderScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);
