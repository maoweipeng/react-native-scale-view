import React, { useState, useCallback } from 'react'
import {
  View,
  PixelRatio,
  LayoutChangeEvent,
  StyleSheet,
  ViewProps,
} from 'react-native'

const dpTopx = (dp: number) => PixelRatio.getPixelSizeForLayoutSize(dp)

interface IndexProps extends ViewProps {
  /** 设计稿宽度，默认 750 */
  designWidth?: number
}

const Index = (props: IndexProps) => {
  const [layout, setLayout] = useState({
    screenHeight: 0,
    scale: 1,
  })

  const { designWidth = 750, style, onLayout, ...restProps } = props

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      onLayout && onLayout(event)
      const { width, height } = event.nativeEvent.layout
      const designScale = designWidth / dpTopx(width)
      const pxRatio = PixelRatio.get()
      const newScale = 1 / pxRatio / designScale

      setLayout({
        screenHeight: dpTopx(height) * designScale,
        scale: newScale,
      })
    },
    [designWidth, onLayout],
  )

  return (
    <View
      {...restProps}
      style={[styles.container, style]}
      onLayout={handleLayout}>
      <View
        style={{
          width: designWidth,
          height: layout.screenHeight,
          transform: [
            { translateX: -designWidth * 0.5 },
            { translateY: -layout.screenHeight * 0.5 },
            { scale: layout.scale },
            { translateX: designWidth * 0.5 },
            { translateY: layout.screenHeight * 0.5 },
          ],
        }}>
        {props.children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
})

export default Index
