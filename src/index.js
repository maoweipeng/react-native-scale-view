import React from 'react';
import {View, PixelRatio} from 'react-native';

const DESIGN_WIDTH = 750;
const DESIGN_HEIGHT = 1334;
const dpTopx = dp => PixelRatio.getPixelSizeForLayoutSize(dp);

class Index extends React.PureComponent {
  state = {
    /** 屏幕宽 px */
    screenWidth: 0,
    /** 屏幕高 px */
    screenHeight: 0,
    /** 设计稿宽 */
    designWidth: DESIGN_WIDTH,
    /** 设计稿高 */
    designHeight: DESIGN_HEIGHT,
    /** 缩放比例 */
    scale: 1,
  };

  constructor(props) {
    super(props);
  }

  handleLayout = e => {
    const {designWidth} = this.state;

    const w = dpTopx(e.nativeEvent.layout.width);
    const h = dpTopx(e.nativeEvent.layout.height);
    const designScale = designWidth / w;
    const pxRatio = PixelRatio.get(); // 像素密度
    const scale = 1 / pxRatio / designScale;
    this.setState({
      screenWidth: designWidth,
      screenHeight: h * designScale,
      scale,
    });
  };

  render() {
    const {screenWidth, screenHeight, scale} = this.state;

    return (
      <View style={{flex: 1}} onLayout={this.handleLayout}>
        <View
          style={{
            width: screenWidth,
            height: screenHeight,
            transform: [
              {translateX: -screenWidth * 0.5},
              {translateY: -screenHeight * 0.5},
              {scale},
              {translateX: screenWidth * 0.5},
              {translateY: screenHeight * 0.5},
            ],
          }}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

export default Index;
