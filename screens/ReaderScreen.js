import { createElement } from 'react'
import React from 'react';
import { View, Text, WebView, Alert, Image, ScrollView } from 'react-native';
import { Drawer, List, NavBar, Icon, Button } from 'antd-mobile';
var xxscData = require('../xxsc_data_js/data.js');
var menuData = require('../xxsc_data_js/menu.js');
import Markdown from 'react-native-simple-markdown'
import images from './image.js';

const markdownStyles = {
  heading1: {
    fontSize: 24,
    color: 'purple',
  },
  link: {
    color: 'pink',
  },
  mailTo: {
    color: 'orange',
  },
  text: {
    padding: 10,
    color: '#000',
    lineHeight: 30,
    fontSize: 13
  }
}
class ReaderScreen extends React.Component {
  static navigationOptions = {
    title: 'CSSA 新生手册',
  };
  state = {
    open: false,
    source: 'wind_Desktop_Developer_cssa_xxsc_README'
  }
  onOpenChange = (...args) => {
    this.setState({ open: !this.state.open });
  }

  onSouceChangeRequest = (source) => {
    this.setState({
      source: menuData["menuData"][source],
      open: false
    })
  }
  render() {
    var data = xxscData[this.state.source]
    const markDownRules = {
      image: {
        react: (node, output, state) => (
          <Image source={{uri: "https://media.giphy.com/media/dkGhBWE3SyzXW/giphy.gif"}} />
        )
      }
    }

    const sidebar = (
      <List>
        {
          Object.keys(menuData["menuData"]).map((i, index) => {
            if (index === 0) {
              return (
                <List.Item
                  key={index}
                  thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                  multipleLine
                  onClick={()=>{this.onSouceChangeRequest(i)}}
                  >{i}
                </List.Item>
              );
            } else {
              return (
                <List.Item
                  key={index}
                  onClick={()=>{this.onSouceChangeRequest(i)}}
                  thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png">
                  {i}
                </List.Item>
              );
            }
          })
        }
      </List>
    );
    return (
      <View style={{flex:1}} >
        <Drawer
          className="my-drawer"
          style={{ minHeight: 100, flex: 1 }}
          enableDragHandle
          contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
          sidebar={sidebar}
          position={'right'}
          open={this.state.open}
          >
          <Button onPressIn={()=> {this.onOpenChange()}}>目录</Button>
          <ScrollView style={{backgroundColor: "#fff", paddingHorizontal: 16}}>
            <Markdown
              styles={markdownStyles}
              rules={{
                image: {
                  react: (node, output, state) => (
                    <Image
                      key={state.key}
                      source={images[node.target]}
                    />
                  ),
                },
              }}
            >
            {data}
            </Markdown>
          </ScrollView>
        </Drawer>

      </View>
    );
  }
}

export default ReaderScreen;
