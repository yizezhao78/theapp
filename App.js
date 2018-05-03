import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ReaderScreen from './screens/ReaderScreen';


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
    navigationOptions: {
      headerStyle: {
          backgroundColor: 'white',
      },
      headerTitleStyle: {
          color: '#000',
      },
      headerBackTitleStyle: {
          color: '#ff4004',
      },
      headerTintColor: '#ff4004',
    }
  }
);
