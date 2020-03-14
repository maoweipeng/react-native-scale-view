# react-native-scale-view
React Native 不同设备分辨率适配和设计稿尺寸单位 px 适配

## Getting started
Install the library using either Yarn:

```
yarn add react-native-scale-view
```

or npm:

```
npm install --save react-native-scale-view
```
#### Using React Native >= 0.60

## Usage Example

```javascript
import ScaleView from 'react-native-scale-view';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScaleView designWidth={375}>
          {/* page */}
        </ScaleView>
      </SafeAreaView>
    </>
  );
};
```

| Props       | Description | Type   | Default |
| ----------- | ----------- | ------ | ------- |
| designWidth | 设计稿宽    | number | 750     |