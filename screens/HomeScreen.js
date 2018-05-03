import React from 'react';
import { View, ScrollView, Text,TouchableHighlight,Dimensions, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardShadowWrapper: {
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
  card: {
    borderRadius: 8,
    overflow: 'hidden'
  },

});

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return { title: 'CSSA'};
  };
  render() {
    return (
      <ScrollView style={{backgroundColor: '#fff'}} contentContainerStyle={{ flex: 1, alignItems: 'center', paddingTop: 16, backgroundColor: '#fff'}}>
        <View style={styles.cardShadowWrapper}>
          <TouchableHighlight
            style={styles.card}
            onPress={() => this.props.navigation.navigate('Reader')}>
            <Image
              style={{width: 340, height: 94, resizeMode: 'stretch'}}
              source={require('../images/xssc_card.png')}
              />
          </TouchableHighlight>

        </View>
      </ScrollView>
    );
  }
}

export default HomeScreen;
