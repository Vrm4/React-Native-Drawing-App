import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, Dimensions ,Text, Animated, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash , faCircle , faPencil , faClose , faT , faBold , faArrowsRotate} from '@fortawesome/free-solid-svg-icons';

const { width, height } = Dimensions.get('window');

const DrawingApp = () => {
  const colorRef = useRef();
  const pencilRef = useRef()
  const [color , setColor] = useState('black');
  const [sStrokeWidth , setStrokeWidth] = useState(3)
  const viewAnimated = new Animated.Value(0)
  const colorChangeRef = useRef(color);
  const strokeWithRef  = useRef(sStrokeWidth)
  const [pathData, setPathData] = React.useState([]);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderStart : (evt) =>{
          const { nativeEvent } = evt;
          const { locationX, locationY } = nativeEvent;
          setPathData(pathData => [...pathData , { path : ` M ${locationX} ${locationY} ` , color_ : colorChangeRef.current , strokeW_ : strokeWithRef.current}])
      },
      onPanResponderMove: (event) => {
        const { nativeEvent } = event;
        const { locationX, locationY } = nativeEvent;
        if (locationX > 0 && locationX < width && locationY > 0 && locationY < height) {
          setPathData((pathData) => {
            const newArr = [...pathData];
            newArr[newArr.length - 1].path += ` L${locationX},${locationY} `;
            return newArr
          });
        }
      },
      onPanResponderRelease : (evt) => { 
        const { locationX, locationY } = evt.nativeEvent;
        setPathData((pathData) => {
          const newArr = [...pathData];
          newArr[newArr.length - 1].path += ` L${locationX},${locationY} M${locationX},${locationY} `;
          return newArr
        });

      }
  } )).current;



  const startAnimation = () => { 
    Animated.timing(viewAnimated , {toValue : 1 , useNativeDriver : false})
    .start()
  }  
  const closeAnimation = () => { 
    Animated.timing(viewAnimated , {toValue : 0 , useNativeDriver : false})
    .start()
  }
  const changeColor = (colorName) => { 
    setColor(colorName)
    colorChangeRef.current = colorName;
  }
  const openColorView =(value) => { 
    colorRef.current.setNativeProps({display : value})
  }
  const openPencilView =(value) => { 
    pencilRef.current.setNativeProps({display : value})
  }
  useEffect(() => { 
    console.log(pathData)
  } , [pathData])
  return (
    <>
      <View  {...panResponder.panHandlers} style={styles.container}>
      {pathData && (
          <Svg height={height} width={width}>
            {pathData.map((item, index) => (
              <Path
                key={index}
                d={item.path}
                stroke={item.color_}
                strokeWidth={item.strokeW_}
                fill="none"
              />
            ))}
          </Svg>
)}

      </View>
      <View style={styles.drawSetWrapper}>
          <Animated.View style={[styles.drawSetView , 
          {
            width : viewAnimated.interpolate({
              inputRange : [0,1] , 
              outputRange : [0 , 300]
          }),
          transform : [{scale : viewAnimated}]
          }]}>

                  <View ref={colorRef} style={[styles.set , {display : 1}]} >
                    <TouchableOpacity onPress={() => { changeColor('black') }}><FontAwesomeIcon icon={faCircle} color={'black'} size={23} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => { changeColor('blue')}}><FontAwesomeIcon icon={faCircle} color={'blue'} size={23} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => { changeColor('yellow')}}><FontAwesomeIcon icon={faCircle} color={'yellow'} size={23} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => { changeColor('purple')}}><FontAwesomeIcon icon={faCircle} color={'purple'} size={23} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => { changeColor('red')}}><FontAwesomeIcon icon={faCircle} color={'red'} size={23} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => { openColorView(1);closeAnimation()}}><FontAwesomeIcon icon={faClose} size={25} /></TouchableOpacity>
                  </View>
                  <View ref={pencilRef} style={[styles.set , {display : 1}]}>
                    <TouchableOpacity onPress={() => { setStrokeWidth(1) ; strokeWithRef.current = 3}}><FontAwesomeIcon icon={faArrowsRotate} size={23} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => { setStrokeWidth(1) ; strokeWithRef.current = 1}}><FontAwesomeIcon icon={faT} size={23} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => { setStrokeWidth(10) ; strokeWithRef.current = 8}}><FontAwesomeIcon icon={faBold} size={23} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => { openPencilView(1) ;closeAnimation()}}><FontAwesomeIcon icon={faClose} size={25} /></TouchableOpacity>
                  </View>
          </Animated.View>
          <View style={styles.drawSet}>
              <TouchableOpacity onPress={() => { openColorView(0) ; startAnimation()}}><FontAwesomeIcon icon={faCircle} size={20} /></TouchableOpacity>
              <TouchableOpacity onPress={() => { openPencilView(0); startAnimation()}}><FontAwesomeIcon icon={faPencil} size={20} /></TouchableOpacity>
              <TouchableOpacity onPress={() => setPathData([])}><FontAwesomeIcon icon={faTrash} size={20} /></TouchableOpacity>
          </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  drawSetWrapper : { 
    width : '100%',
    flexDirection : 'row' , 
    justifyContent : 'center' ,
    bottom : '7%' , 
    position : 'absolute'
  },
  drawSet : { 
    backgroundColor : '#EFF2F7',  
    height : 60 ,
    width : 300 , 
    borderRadius : 30  , 
    alignItems : 'center' , 
    flexDirection : 'row' , 
    justifyContent : 'space-around' , 
    position : 'relative',
    overflow : 'hidden'
  } , 
  drawSetView : { 
    position : 'absolute' , 
    height : 60, 
    backgroundColor : '#C4E1F6' , 
    zIndex : 99 , 
    borderRadius : 30  , 
  },
  set : { 
    flexDirection : 'row', 
    justifyContent : 'space-around' ,
    height : 60, 
    alignItems : 'center'
  }
});

export default DrawingApp;

