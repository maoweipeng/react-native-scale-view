import React from 'react';
import {View, PixelRatio} from 'react-native';
import PropTypes from 'prop-types';

const dpTopx = dp => PixelRatio.getPixelSizeForLayoutSize(dp);

class Index extends React.PureComponent {
  static propTypes = {
    /** 设计稿宽 */
    designWidth: PropTypes.number,
  };

  static defaultProps = {
    designWidth: 750,
  };

  constructor(props) {
    super(props);

    this.state = {
      /** 屏幕宽 px */
      screenWidth: 0,
      /** 屏幕高 px */
      screenHeight: 0,
      /** 设计稿宽 */
      designWidth: props.designWidth,
      /** 缩放比例 */
      scale: 1,
    };
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
