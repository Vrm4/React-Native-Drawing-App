import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, PanResponder, Dimensions ,Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const DrawingApp = () => {
  const panResponder = useRef(
    
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderStart : (evt) =>{
          const { nativeEvent } = evt;
          const { locationX, locationY } = nativeEvent;
          setStartData(`M ${locationX} ${locationY}`)
      },
      onPanResponderMove: (event) => {
        const { nativeEvent } = event;
        const { locationX, locationY } = nativeEvent;
        setPathData(pathData => pathData + ` L ${locationX} ${locationY} `);
      },
      onPanResponderRelease: () => {
        setPathData('');
      },
  } )).current;

  const [pathData, setPathData] = React.useState('');
  const [startData, setStartData] = React.useState('');

  useEffect(() =>{
    if (pathData != '') {
      console.log('new Data: '  + pathData)
    }
  }, [pathData])
  return (
    <>
      <View  {...panResponder.panHandlers} style={styles.container}>
        <Svg width={width} height={height}>
          <Path d={`${startData} ${pathData}`} stroke="black" strokeWidth={3} fill="none" />
        </Svg>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default DrawingApp;

