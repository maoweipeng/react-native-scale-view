import React, {useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';

import ScaleView from 'react-native-scale-view';
import RNOrientation from 'react-native-orientation';

const App = () => {
  const handlePress = useCallback(() => {
    RNOrientation.getOrientation((err, orientation) => {
      if (err) {
        return;
      }

      if (orientation !== 'PORTRAIT') {
        RNOrientation.lockToPortrait();
        return;
      }

      if (Platform.OS === 'ios') {
        RNOrientation.lockToLandscapeRight();
      } else {
        RNOrientation.lockToLandscapeLeft();
      }
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.constainer}>
        <ScaleView designWidth={750}>
          <ScrollView>
            <View style={styles.rect}>
              <Text style={styles.text} onPress={handlePress}>
                点击旋转屏幕
              </Text>
            </View>
            <View style={styles.circle}>
              <View style={styles.circleSmall} />
            </View>
            <View style={styles.other} />
          </ScrollView>
        </ScaleView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  rect: {
    width: 750,
    height: 200,
    backgroundColor: '#0099ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    lineHeight: 45,
    fontWeight: 'bold',
    color: 'white',
  },
  circle: {
    height: 750,
    width: 750,
    borderRadius: 375,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009900',
  },
  circleSmall: {
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  other: {
    height: 300,
    backgroundColor: '#fff000',
  },
});

export default App;
