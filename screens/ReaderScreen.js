import React from 'react';
import { View, Text, WebView, Alert } from 'react-native';
import  Remarkable from 'remarkable';
import { Drawer, List, NavBar, Icon, Button } from 'antd-mobile';
var xxscData = require('../xxsc_data_js/data.js');
var menuData = require('../xxsc_data_js/menu.js');

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
    var md = new Remarkable();
    md.renderer.rules.image = (function() {
  var original = md.renderer.rules.image;
  return function(tokens, idx) {
    var href = Remarkable.utils.escapeHtml(tokens[idx].src);
    var alt = Remarkable.utils.escapeHtml(tokens[idx].alt);
    //var imgOutput = original.apply(this, arguments);
    var customizeImgOutput = `<img src="file://ios_assets/xxsc_data/.gitbook/assets/m2w690hq92lt_h_large_611w_5f3d0005a5022f75.png"alt="${alt}"/>`;
    console.log(customizeImgOutput)
    return customizeImgOutput;
  };
})();
    md.block.ruler.disable([ 'code' ]);
    //把markdown转换成html
    var data = `<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0"> `+ md.render(data);
    //console.log(data);

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
            allowUniversalAccessFromFileURLs={true}
            />
        </Drawer>

      </View>
    );
  }
}

export default ReaderScreen;
