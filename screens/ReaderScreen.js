import React from 'react';
import { View, Text, WebView, Alert } from 'react-native';
import  Remarkable from 'remarkable';
import { Drawer, List, NavBar, Icon, Button } from 'antd-mobile';
var xxscData = require('../xxsc_data_js/data.js');

class ReaderScreen extends React.Component {
  static navigationOptions = {
    title: 'CSSA 新生手册',
  };
  state = {
    open: false,
    source: 'jian_jie'
  }
  onOpenChange = (...args) => {
    this.setState({ open: !this.state.open });
  }

  onSouceChangeRequest = (source) => {

  }
  render() {
    console.log(xxscData)
    var data = xxscData[this.state.source]
    var md = new Remarkable();
    //把markdown转换成html
    var data = md.render(data);
    //防止zoom in

    const sidebar = (
      <List>
        {
          ['前言', '简介'].map((i, index) => {
            if (index === 0) {
              return (
                <List.Item
                  key={index}
                  thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                  multipleLine
                  >{i}</List.Item>
              );
            } else {
              return (
                <List.Item
                  key={index}
                  thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png">
                  {i}
                </List.Item>
              );
            }
          })
        }
      </List>
    );
    data = '<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">' + data
    return (
      <View style={{flex:1}}>
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
          <WebView
            source={{html: data}}
            style={{flex:1}}
            />
        </Drawer>

      </View>
    );
  }
}

export default ReaderScreen;
