import { createElement } from 'react'
import React from 'react';
import { View, Text, WebView, Alert, Image, ScrollView, Dimensions } from 'react-native';
import { Drawer, List, NavBar, Icon, Button } from 'antd-mobile';
var xxscData = require('../xxsc_data_js/data.js');
var menuData = require('../xxsc_data_js/menu.js');
import Remarkable from 'remarkable';
import images from '../xxsc_data_js/image.js';
import HTML from 'react-native-render-html';
class ReaderScreen extends React.Component {
  static navigationOptions = {
    title: 'CSSA 新生手册',
  };
  state = {
    open: false,
    source: menuData["menuData"][Object.keys(menuData["menuData"])[0]]
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
    var originalMarkdownData = xxscData[this.state.source]
    //把markdown转换成html
    var md = new Remarkable();
    var htmlContent = md.render(originalMarkdownData);
    //再把html转成React Native Components

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
            <HTML html={htmlContent} imagesMaxWidth={Dimensions.get('window').width}
              renderers= {{
                img: function(htmlAttribs, children, convertedCSSStyles, passProps = {}) {
                  if (!htmlAttribs.src) {
                    return false;
                  }
                  const { src, alt, width, height } = htmlAttribs;
                  const splitList = src.split("/")
                  const imageName = splitList[splitList.length - 1]
                  return (
                    <Image
                      source={images[imageName]}
                      alt={alt}
                      style={{width: Dimensions.get('window').width - 32, height: 200, resizeMode: 'contain'}}
                      {...passProps}
                      />
                  );
                }
              }} />
            </ScrollView>
          </Drawer>

        </View>
      );
    }
  }

  export default ReaderScreen;
